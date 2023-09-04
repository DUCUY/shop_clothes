const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type : String,
            required: true,
            unique: true
        },
        description: {
            type : String, 
            required: true,
        },
        img: {
            type : String, 
            required: true
        },
        categories: {
            type: Array
        },
        size: {
            type: Array
        },
        color: {
            type : Array
        },
        price: {
            type: Number,
            required: true
        },
        comments:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }],
        rate : [{
            userId: { 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            star: {
                type: Number,
            }
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
