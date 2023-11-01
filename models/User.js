const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        favoriteProduct: [

            {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
            }

        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
