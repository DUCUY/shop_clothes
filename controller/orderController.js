const Order = require("../models/Order");

//create order 
const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        return res.status(200).json(savedOrder);
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

//  Delete order
const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json("Giỏ hàng đã bị xóa.")
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
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (err) {
        return res.status(500).json(err);
    }
};

// Get monthly income
const getIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
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
        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }

};

module.exports = { createOrder, updateOrder, deleteOrder, getOrder, getAllOrder, getIncome };