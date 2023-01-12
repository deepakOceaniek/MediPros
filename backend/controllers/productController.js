const Product = require("../models/productModel");
const Category =require("../models/categoryModel")
const Prescription = require("../models/prescriptionModel")
const  Banner = require("../models/bannerModel")
const sendToken = require("../utils/jwtToken");
const Cart = require("../models/cartModel") 

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Product
exports.getAllProduct = catchAsyncErrors(async (req, res, next) => {
  // return next(new ErrorHandler("This Is My Temp Error", 500));

  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  // console.log(req.query);

  const apiFeatures = new ApiFeatures(Product.find().populate("category" , "categoryName"), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;

  apiFeatures.pagination(resultPerPage);
  // console.log(products)
  // console.log(products.length)
  if(products.length >0){
  products = await apiFeatures.query.clone();
  }else{
    return next(new ErrorHandler("Product not found",400));
  }
  // console.log(products);
  // console.log(filteredProductsCount);

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product --Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

//Update product --Admin
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

// Images Start Here
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}

if (images !== undefined) {
  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
}

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});

// Delete Product --Admin
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //Deleting Images from Cloudinary
  for(let i=0 ;i< product.images.length;i++){
     await cloudinary.v2.uploader.destroy(product.images[i].public_id)
  }

  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted Successfully" });
});

// Create new Review or Update the Review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString())
        review.rating = rating;
      review.comment = comment;
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((review) => {
    avg += review.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get All Reviwes of a single product
exports.getAllProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Reviwes
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter((review) => {
    return review._id.toString() !== req.query.id.toString();
  });

  let avg = 0;
  reviews.forEach((review) => {
    avg += review.rating;
  });

  let ratings = 0
  
  if(reviews.length===0){
    ratings = 0
  }else{
    ratings = (product.ratings = avg / reviews.length);
  }
  const numOfReviews = reviews.length;
  const up = await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
  });
});


// All Category 
exports.getAllCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.find();

    // sendToken(category, 200, res);

  res.status(200).json({
    success: true,
    category,
  });
});

// All Category  -- admin
exports.getAllAdminCategory = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

    // sendToken(category, 200, res);

  res.status(200).json({
    success: true,
    categories,
  });
});

// Add Category ---admin 
exports.addCategory = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.categoryImage, {
    folder: "category",
    width: 150,
    crop: "scale",
  });
  const { categoryName} = req.body;
  console.log(categoryName);
  const category = await Category.create({
    categoryName,
    categoryImage: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  res.status(201).json({
    success: true,
  });
});

// Get category details
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(new ErrorHandler("Category not found", 404));
  }
  res.status(200).json({ success: true, category });
});

//Update Category 
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  const newCategoryData = {
    categoryName: req.body.categoryName,
   
  };
  // Cloudinary
  if (req.body.categoryImage !== "") {
    const category = await Category.findById(req.params.id);
    const imageId = category.categoryImage.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.categoryImage, {
      folder: "categoryImage",
      width: 150,
      crop: "scale",
    });

    newCategoryData.categoryImage = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const category = await Category.findByIdAndUpdate(req.params.id, newCategoryData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, category});
});

//Delete category --admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  // We will remove cloudinary later

  const category = await Category.findById(req.params.id);
  if (!category) {
    return next(
      new ErrorHandler(`Category Does Not Exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = category.categoryImage.public_id;
  await cloudinary.v2.uploader.destroy(imageId);

  await category.remove();
  res.status(200).json({ success: true, message: "Category deleted successfully" });
});


// All Prescription 
exports.getAllPrescription = catchAsyncErrors(async (req, res, next) => {
  const prescription = await Prescription.find();

  res.status(200).json({
    success: true,
    prescription,
  });
});

// Add Prescription ---user 
exports.addPrescription = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.prescriptionImage, {
  //   folder: "category",
  //   width: 150,
  //   crop: "scale",
  // });
  // const prescription = await Prescription.create({
  //   prescriptionImage: {
  //     public_id: myCloud.public_id,
  //     url: myCloud.secure_url,
  //   },
  // });
  // res.status(201).json({
  //   success: true,
  // });


  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "prescriptionImage",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const prescription = await Prescription.create(req.body);

  res.status(201).json({
    success: true,
    prescription,
  });
});

// update prescription Status -- Admin
exports.updatePrescription = catchAsyncErrors(async (req, res, next) => {
const {status , totalPrice,totalSaving,shippingFee,amountToBePaid}= req.body
  const prescription = await Prescription.findById(req.params.id);

  if (!prescription) {
    return next(new ErrorHandler("Prescription not found with this Id", 404));
  }

  if (prescription.status === "Your Medicine Get Ready Pay Now") {
    return next(new ErrorHandler("Medicine Already Ready", 400));
  }

  prescription.status = status;
  prescription.totalPrice =  totalPrice;
  prescription.totalSaving =  totalSaving;
  prescription.shippingFee =  shippingFee;
  prescription.amountToBePaid =  amountToBePaid;

  await prescription.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get Prescription details
exports.getPrescriptionDetails = catchAsyncErrors(async (req, res, next) => {
  const prescription = await Prescription.findById(req.params.id).populate("user","name contact");
  if (!prescription) {
    return next(new ErrorHandler("No Prescription found ", 404));
  }
  res.status(200).json({ success: true, prescription });
});

//Delete Prescription --admin
exports.deletePrescription = catchAsyncErrors(async (req, res, next) => {

  const prescription = await Prescription.findById(req.params.id);
  if (!prescription) {
    return next(
      new ErrorHandler(`Category Does Not Exist with Id: ${req.params.id}`, 400)
    );
  }

  //Deleting Images from Cloudinary
  for(let i=0 ;i< prescription.images.length;i++){
    await cloudinary.v2.uploader.destroy(prescription.images[i].public_id)
 }

  await prescription.remove();
  res.status(200).json({ success: true, message: "Prescription deleted successfully" });
});

// All banner 
exports.getAllBanner = catchAsyncErrors(async (req, res, next) => {
  const banners = await Banner.find();

  res.status(200).json({
    success: true,
    banners,
  });
});

// Add banner --admin
exports.addBanner = catchAsyncErrors(async (req, res, next) => {


  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "bannerImage",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;

  const banner = await Banner.create(req.body);

  res.status(201).json({
    success: true,
    banner,
  });

});


// Get single banner image
exports.getBannerDetails = catchAsyncErrors(async (req, res, next) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    return next(new ErrorHandler("No banner found ", 404));
  }
  res.status(200).json({ success: true, banner });
});

//Update Banner --Admin
exports.updateBanner = catchAsyncErrors(async (req, res, next) => {
  let banner = await Banner.findById( req.params.id);
  if (!banner) {
    return next(new ErrorHandler("Banner not found", 404));
  }

// Images Start Here
let images = [];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
} else {
  images = req.body.images;
}

if (images !== undefined) {
  // Deleting Images From Cloudinary
  for (let i = 0; i < banner.images.length; i++) {
    await cloudinary.v2.uploader.destroy(banner.images[i].public_id);
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "bannerImage",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
}

  banner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, banner });
});


//Delete banner --admin
exports.deleteBanner = catchAsyncErrors(async (req, res, next) => {

  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    return next(new ErrorHandler("Banner not found", 404));
  }

  //Deleting Images from Cloudinary
  for(let i=0 ;i< banner.images.length;i++){
     await cloudinary.v2.uploader.destroy(banner.images[i].public_id)
  }

  await banner.remove();
  res
    .status(200)
    .json({ success: true, message: "Banner deleted Successfully" });
});


// Add to cart 
exports.addToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;
  console.log(req.body)
  console.log(req.user.id)
  const user = req.user.id; 
  console.log(user)
  // const query = [
  //   {
  //     path: "products.productId",
  //     select: "images name price discount",
  //   },
 
  // ];

  try {
    let cart = await Cart.findOne({ user })
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p =>(p.productId) == productId);
      if (itemIndex > -1) {
       cart.products[itemIndex].quantity = quantity       
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity});
      }
      cart = await cart.save();
      // return res.status(201).send(cart);
    } else {
      //no cart for user, create new cart
       cart = await Cart.create({
        user,
        products: [{ productId, quantity}]
      }); 
    }
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

// Get card Details
exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
  
  const userId = req.user.id; 


  const query = [
    {
      path: "user",
      select: "defaultAddress",
    },
    {
      path: "products.productId",
      select: "images name price discount",
    },
 
  ];
   let cart = await Cart.findOne({user:userId }).populate(query);
   if(cart){
     
     // const prices = cart.products.map(product=>product.price * product.quantity)
     // const totalPrice = prices.reduce((acc,curr)=>acc + curr) 
     //  console.log(cart)   
     
     let totalPrice = 0
     let afterDiscountPrice = 0
     let totalSaving = 0
     let newProducts = []


     for(let product of cart.products ){
         product = {
        productId : product.productId._id,
        name  : product.productId.name,
        price  : product.productId.price,
        images  : product.productId.images,
        quantity: product.quantity,
        discount:product.productId.discount
      };
      newProducts.push(product)
       
      
      totalPrice += product.price * product.quantity
      afterDiscountPrice  +=  (product.price - ((product.discount /100)* product.price))*product.quantity
      totalSaving = totalPrice - afterDiscountPrice   
    }
    cart.products = newProducts

    cart.totalPrice = totalPrice 
    cart.totalSaving = totalSaving

    if(afterDiscountPrice < 500 && cart.products.length > 0){
     cart.shippingFee = 99 

    }else{
      cart.shippingFee = 0 
    }
    cart.amountToBePaid = afterDiscountPrice + cart.shippingFee 
    cart.save()
    console.log(cart)
     res.status(200).send(cart);
   }else{
     res.status(200).json({message:"Your Cart is Empty Add Some Product"});      
   }
});

//Delete item from cart 
exports.deleteFromCart = catchAsyncErrors(async (req, res, next) => {
  const  productId  = req.query.productId; 
  const userId = req.user.id; 
  try {

    let cart = await Cart.findOne({ user :userId });

    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p =>(p.productId) == productId);
      console.log(itemIndex)
      if (itemIndex > -1) {
          cart.products.splice(itemIndex,1)
      } 
      cart = await cart.save();
      return res.status(200).json({success:true,message:"Product remove"});
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});


