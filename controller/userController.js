const Product = require("../models/Product");
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

// Update favorites 
// const updateFavorites = async (req, res) => {
//     const userId = req.params.userId;
//     const productId = req.params.productId;
    
//     try {
//         const favorite = new User( { userId, productId } );

//         if (favorite) {
//             await User.findByIdAndDelete( { userId, productId } );
//             res.status(200).json("Cập nhật sản phẩm yêu thích thành công.");
//         } else {
//             await favorite.save();
//             res.status(200).json("Cập nhật sản phẩm yêu thích thành công.");
//         }

//     } catch(err) {
//         res.status(500).json("Đã xảy ra lỗi khi cập nhật sản phẩm yêu thích!");
//     }
// };

// ADD favorites 
const createFavorites = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        const favorite = new User({ userId, productId });
        await favorite.save();
        res.status(200).json("Cập nhật sản phẩm yêu thích thành công.");

    } catch (err) {
        res.status(500).json("Đã xảy ra lỗi khi cập nhật sản phẩm yêu thích!");
    }
};

// Delete favorite
const deleteFavorites = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        await User.findByIdAndDelete({ userId, productId });
        res.status(200).json("Cập nhật sản phẩm yêu thích thành công.");

    } catch (err) {
        res.status(500).json("Đã xảy ra lỗi khi cập nhật sản phẩm yêu thích!");
    }
};

//Get favorites
const getFavorites = async (req, res) => {
    const userId = req.params.userId;

    try {
        const favorites = await Product.find( {userId} );
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json("Đã xảy ra lỗi khi lấy danh sách sản phẩm yêu thích!");
    }
};



module.exports = { updateUsers, deleteUser, getUser, getAllUsers, statsUser, createFavorites, getFavorites, deleteFavorites };