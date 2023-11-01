const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type : String,
            required: true,
        },
        products:[
            {
                productId: { 
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                img:{
                    type : String,
                },
                productName: { 
                    type : String,
                },
                size: { 
                    type : String,
                },
                quantity: {
                    type : Number,
                    default: 1,
                },
            },
        ],
        username:{
            type : String,
        },
        phone:{
            type : String,
        },
        address:{
            type : String,
        },
        amount: {
            type : Number,
            required: true,
        },
        payments:{
            type: String,
        },
        status: {
            type : String,
            default: "pending",
        },
        ship: {
            type : String,
            default: "",
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
