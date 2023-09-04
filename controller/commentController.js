const Comment = require("../models/Comment");

// ADD comment
const createComment = async (req, res) => {
    const { productId, userId, content } = req.body;

    try {
        const newComment = new Comment({ productId, userId, content });
        await newComment.save();

        res.status(200).json("Bình luận sản phẩm thành công.");
    } catch (err) {
     res.status(500).json("Đã xảy ra lỗi khi bình luận sản phẩm!");   
    }
};

// Get comments product
const getComments = async (req, res) => {
    const productId = req.params.productId;

    try {
        const comments = await Comment.find( { productId });
        res.status(200).json(comments);
    } catch (err) {
     res.status(500).json("Đã xảy ra lỗi khi lấy bình luận của sản phẩm!");   
    }
};

// Delete comment
const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json("Bình luận không tồn tại!");
        }

        await Comment.findByIdAndDelete(commentId);
        res.status(200).json("Xóa bình luận thành công.");

    } catch (err) {
     res.status(500).json("Đã xảy ra lỗi khi xóa bình luận!");   
    }
};


module.exports = { createComment, getComments, deleteComment };