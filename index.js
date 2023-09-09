const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./config/dbConnect');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');



dbConnect();
const app = express();

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);




app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });
  