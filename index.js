const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./config/dbConnect');

dbConnect();
const app = express();

app.use(express.json());
// app.get("/api/users", () => {
//     console.log("test");
// });



app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
  });
  