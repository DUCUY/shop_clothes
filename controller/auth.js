const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// Register
const createUser = async (req, res) => {
    try {
    const check = await User.findOne({ email : req.body.email});
    if (check) {
      
        return res.status(400).json( "Email đã tồn tại!" );
    } 
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
    });

        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
       
    } catch (error) {
        res.status(500).json(error);
    }
};

// Login
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if(!user)  return res.status(400).json("Thông tin không hợp lệ!");

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);

        const passwordHashed = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(passwordHashed !== req.body.password) return res.status(400).json("Mật khẩu không chính xác!");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {expiresIn: "3d"}
        );

        const { password, ...others } = user._doc;

        return res.status(200).json({...others, accessToken});
    } catch (err) {
       return res.status(500).json(err);
    }
};

// Logout 
const logout = async (req, res) => {
    try {
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        {expiresIn: ""}
        );

        res.status(200).json("Đăng xuất thành công.");
    } catch (err) {
        res.status(500).json(err);
    }
};
// Forget password

module.exports = { createUser, login, logout };