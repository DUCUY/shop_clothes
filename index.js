const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const dbConnect = require('./config/dbConnect');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');
const paymentRoute = require('./routes/paymentRoute');

const multer = require('multer');// fix hinh anh hoi toi
const upload = multer();// fix hinh anh hoi toi

dbConnect();
const app = express();
app.use(cors());
app.use(express.json());
app.use(upload.any()); // fix hinh anh hoi toi

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);



app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });
  