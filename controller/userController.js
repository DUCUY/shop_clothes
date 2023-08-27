const User = require("../models/User");
const CryptoJS = require("crypto-js");

// update user
const updateUsers = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString();
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json({updatedUser});
    } catch (err) {
        res.status(500).json("Không cập nhật được!");
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Người dùng đã bị xóa.")
    }catch(err){
        res.status(500).json(err);
    }
};

// Get a user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc; 
        res.status(200).json(others)
    }catch(err){
        res.status(500).json(err);
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
        ? await User.find().sort({ _id: -1 }).limit(5) // hiển thị 5 users mới nhất
        : await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
};

// Get user stats
const statsUser = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match:{ createdAt: { $gte: lastYear }}},
            {
                $project:{
                    month: { $month: "$createdAt"},
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch(err){
        res.status(500).json(err);
    }
};

module.exports = { updateUsers, deleteUser, getUser, getAllUsers, statsUser };