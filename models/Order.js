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
                color: { 
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
            default: "Chờ xác nhận",
            // Đã xác nhận
            // Đã từ chối
        },
        ship: {
            type : String,
            default: "Đơn hàng đang được xử lý",
            // Đơn hàng đã được đóng gói
            // Đã giao cho đơn vị vận chuyển
            // Đơn hàng đang được vận chuyển
            // Đang giao đơn hàng tới bạn
            // Giao hàng thành công
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
