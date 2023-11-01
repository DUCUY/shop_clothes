const { response } = require("express");
const Product = require("../models/Product");
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// update user
const updateUsers = async (req, res) => {

    try {
        const updatedUser = await User.findById(req.params.id);
        if(!updatedUser){
            return res.status(404).json({ message:"User not found", status: "failed" });
        }

        updatedUser.username = req.body.username;
        updatedUser.email = req.body.email;
        updatedUser.phone = req.body.phone;
        updatedUser.address = req.body.address;
        const data = await  updatedUser.save();
        return res.status(200).json({ msg:"Cập nhật thành công.",status: "successs" , data });
    } catch (err) {
        res.status(500).json("Không cập nhật được!");
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Người dùng đã bị xóa.")
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get a user
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (err) {
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
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get user stats
const statsUser = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
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
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update favorites 
const updateFavorites = async (req, res) => {
    const userId = req.params.id;
    const productId = req.body.productId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ message: 'User not found' });
        }
        const product = await Product.findById(productId);

        if (!product) {
            res.status(400).json({ message: 'Product not found' });
        }


        const favorite = user.favoriteProduct.find((prodtId) => {
            return productId.toString() === prodtId.toString()
        })

        if (favorite !== undefined) {
            const user = await User.updateMany({ _id: userId }, {
                $pull: { favoriteProduct: productId }
            });
            const product = await Product.updateMany({ _id: productId }, {
                $pull: { favoriteUser: userId }
            });
            if (!product || !user) {
                res.status(400).json({ message: 'Error somethings' })
            }
            res.status(200).json({ message: 'Cập nhật sản phẩm yêu thích thành công.', type: 'delete' });
        } else {
            const user = await User.findByIdAndUpdate(userId, {
                $push: { favoriteProduct: productId }
            }, { new: true });
            const product = await Product.findByIdAndUpdate(productId, {
                $push: { favoriteUser: userId }
            }, { new: true });
            if (!product || !user) {
                res.status(400).json({ message: 'Error somethings' })
            }
            res.status(200).json({ message: 'Cập nhật sản phẩm yêu thích thành công.', type: 'add' });
        }

    } catch (err) {
        res.status(500).json({ "msg": "Đã xảy ra lỗi khi cập nhật sản phẩm yêu thích!", 'err': err });
    }
};

// // ADD favorites 
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
        const favorites = await User.findById(userId).populate("favoriteProduct");
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json("Đã xảy ra lỗi khi lấy danh sách sản phẩm yêu thích!");
    }
};


// Add Comment 
const comment = async (req, res) => {
    try {
        const { userId, productId, content } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ message: 'User not found' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            res.status(400).json({ message: 'Product not found' });
        }

        const newComment = await Product.findByIdAndUpdate(productId, {
            $push: { comments: { userId, username: user.username, content } }

        }, { new: true });
        user.comments.push(newComment._id);
        await user.save();
        return res.status(200).json("Bình luận thành công");

    } catch (err) {
        return res.status(500).json("Đã xảy ra lỗi khi bình luận");
    }
};

// Delete Comment
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const productId = req.body.productId;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const comments = product.comments.filter((item) => item._id.toString() !== commentId)
        product.comments = comments;
        await product.save();
        return res.status(200).json({ message: 'Bình luận đã được xóa thành công' });

    } catch (err) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa bình luận' });
    }
};


// Update Comment
const updateComment = async (req, res) => {
    try {
        const { commentId, content } = req.body;
        const updatedComment = await Product.findOneAndUpdate(
            { "comments._id": commentId },
            { $set: { "comments.$.content": content } },
            { new: true }
        );
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        return res.status(200).json({ message: 'Bình luận được cập nhật thành công', updatedComment });
    } catch (err) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật bình luận' });
    }
};

// Get all Comment
const getAllComments = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const comments = product.comments;
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy bình luận' });
    }
};


module.exports = {
    updateUsers, deleteUser, getUser, getAllUsers,
    statsUser, createFavorites, getFavorites, deleteFavorites,
    updateFavorites, comment, deleteComment, updateComment, getAllComments
};