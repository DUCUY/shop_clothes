const Order = require("../models/Order");
const User = require("../models/User");

//create order 
const createOrder = async (req, res) => {

    try {
        const { userId, products, payments, amount, username, phone, address } = req.body;

        const checkUser = await User.findById(userId);
        if (!checkUser) {
            return res.status(400).json({ message: "User not found" })
        }

        const order = new Order({ 
            userId,
            products ,
            username: username ? username : checkUser.username,
            phone: phone ? phone : checkUser.phone,
            address: address ? address : checkUser.address,
            payments,
            amount,
        })
        const newOrder = await order.save();

        return res.status(200).json({msg:"Đặt hàng thành công.",newOrder, status:"success"});

    } catch (err) {
        res.status(500).json("Không thêm được sản phẩm!");
    }
};


// update order
const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        return res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(500).json("Không cập nhật được!");
    }
};

const approvedOrder = async (req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findById(orderId);

        if(!order) {
            res.status(400).json({ message: 'Order not found' });
        }
        // order.ship = "Đơn hàng đang được xử lý"
        order.status = "Đã xác nhận";
        await order.save();

        return res.status(200).json({msg: "Duyệt thành công.", status: 'OK'});        

    } catch (err) {
        return res.status(500).json("Lỗi không thể duyệt đơn hàng!");

    }
}; 

const refuseOrder = async (req, res) => {
    try {
        const {orderId} = req.params;
        const order = await Order.findById(orderId);

        if(!order) {
            res.status(400).json({ message: 'Order not found' });
        }

        order.status = "Đã từ chối";
        await order.save();

        return res.status(200).json({msg: "Từ chối thành công.", status: 'OK'});        

    } catch (err) {
        return res.status(500).json("Lỗi không thể duyệt đơn hàng!");

    }
}; 

// Shipping order
const shippingOrder  = async (req, res) => {
    try {
        const {orderId} = req.params;
        const { shipping } = req.body;
        const order = await Order.findById(orderId);

        if(!order) {
            res.status(400).json({ message: 'Order not found' });
        }

        order.ship = shipping;
        await order.save();

        return res.status(200).json({msg: "Đổi trạng thái vận chuyển thành công.", status: 'OK'});        

    } catch (err) {
        return res.status(500).json("Lỗi không thể đổi trạng thái vận chuyển!");
    }
}; 


//  Delete order
const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json({msg:"Giỏ hàng đã bị xóa.",  tb: "success" });
    } catch (err) {
        return res.status(500).json(err);
    }
};

//  Get user orders
const getOrder = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
};

//  Get all 

const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find().populate('products');
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
};


// Get monthly income
const getIncome = async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);
        return res.status(200).json(income);
    } catch (err) {
        return res.status(500).json(err);
    }

};

module.exports = { createOrder, updateOrder, deleteOrder, getOrder, getAllOrder, getIncome,
    refuseOrder, approvedOrder,
    shippingOrder
};