const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true
        },
        categories: {
            type: Array
        },
        size: {
            type: Array
        },
        color: {
            type: Array
        },
        price: {
            type: Number,
            required: true
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        totalRate:{
            type:Number
        },
        rate: [
            {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            star: {
                type: Number,
            }
        }],
        favoriteUser: [
            {

                type: mongoose.Types.ObjectId,
                ref: 'User',

            }
        ],
        comments: [
            {
                userId: {
                type: mongoose.Types.ObjectId,
                ref: 'User'
            },
                content: {
                type: String,
                // required: true
            },
        }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
