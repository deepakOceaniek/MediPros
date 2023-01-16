class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    // console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };
    // console.log(queryCopy); //{ keyword: 'samosa', category: 'laptop' }

    //Removing some field for Category
    const removeField = ["keyword", "page", "limit"];
    removeField.forEach((key) => delete queryCopy[key]);
    // console.log(queryCopy); // { category: 'laptop' }

    // switch (queryCopy.key){
    //   case categoryId :
    //     return{

    //     }
    //     case categoryName:
    //       return{

    //       }
    // }
    //Filter for price
    // console.log(queryCopy); //{ category: 'laptop', price: { gt: '1200', lt: '2000' }}
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(this.query); //{"category":"laptop","price":{"$gt":"1200","$lt":"2000"}}
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    //Skip
    //If we have 50 product and 5 page so we have 10 product each page --> In 2 page we have to skip 10 product and in 3 page we have to skip 20 product
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip); //this.query product find hai
    return this;
  }
}
module.exports = ApiFeatures;
