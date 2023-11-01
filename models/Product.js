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
        titlelazy: {
            type: String,
        },
        descriptionlazy: {
            type: String,

        },
        img: {
            type: String,
            required: true
        },
        categories: {
            type: Array
        },
        detail: [
            {
                size: { type: String },
                quantity: { type: Number },
                color: { type: String }

            }
        ],
        size:[
            {
                type: String,
            }
        ],
        color: [
            {
            type: String,
        }

        ],
        price: {
            type: Number,
            required: true
        },
        oldprice: {
            type: Number,
        },
        discount: {
            type: String,
        },
        inStock: {
            type: Number,
            default: 0,
        },
        sale: {
            type: String,
        },
        salepercent: {
            type: Number,
        },
        totalRate: {
            type: Number
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
                username: {
                    type: String,
                }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
