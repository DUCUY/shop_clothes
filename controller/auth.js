const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
const createUser = async (req, res) => {
        // return res.status(200).json({"hahaha": "ok"});
    try {
        // console.log(req.body);
    const check = await User.findOne({ email : req.body.email});
    if (check) {
      
        return res.status(400).json({ state: "failure" });
    } 
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });
        // const savedUser = await newUser.save();
        // res.status(201).json(savedUser);
        const savedUser = await newUser.save();
        return res.status(200).json({savedUser});
       
    } catch (err) {
        return res.status(500);
    }
};

// Login
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(401).json("Thông tin không hợp lệ!")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);

        const passwordHashed = hashedPassword.toString(CryptoJS.enc.Utf8);

        passwordHashed !== req.body.password && res.status(401).json("Mật khẩu không chính xác!");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {expiresIn: "3d"}
        );

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
};

// Logout 


module.exports = { createUser, login };