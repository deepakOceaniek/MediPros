const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressLayouts = require('express-ejs-layouts');
const path = require('path');


//Config
dotenv.config({ path: "backend/config/config.env" });

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const test =require("./routes/testRoute")
const pdfRoutes = require("./routes/pdfRoutes")



app.use(morgan("dev"));
app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(fileUpload());


app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

app.use("/api/v1" ,pdfRoutes);
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", test);

// app.get("/api/v1/getkey", (req, res) =>
//   res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
// );

// Middleware For error
app.use(errorMiddleware);
module.exports = app;
