const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        productId: {
            type : mongoose.Schema.Types.ObjectId,
            required: true,
            ref
        },
        userId: {
            type : mongoose.Schema.Types.ObjectId,
            required: true,
            ref
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);