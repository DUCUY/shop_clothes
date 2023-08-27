const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./config/dbConnect');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');

dbConnect();
const app = express();

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });
  