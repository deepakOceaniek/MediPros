const mongoose = require("mongoose");

const connectDatabase = () => {
  const DB = process.env.DATABASE.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD
  );
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DataBase Connected Successfully");
    });
  // .catch((error) => { // Server.js mai humne error ko handle kar liya hai isliye yha jarrat nhi hai
  //   console.log(error.message);
  // });
};
module.exports = connectDatabase;
