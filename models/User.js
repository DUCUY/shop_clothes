const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type : String,
            required: true,
        },
        email: {
            type : String, 
            required: true,
            unique: true
        },
        password: {
            type : String, 
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        favoriteProduct : [
            {
                products:[
                    {
                        productId: { 
                            type : mongoose.Types.ObjectId,
                            ref: 'Product',
                        }
                    },
                ],
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
