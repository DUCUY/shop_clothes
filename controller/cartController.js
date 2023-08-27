const Cart = require("../models/Cart");

//create cart 
const createCart = async (req, res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        return res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json("Không thêm được sản phẩm!");
    }
};



// update cart
const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json("Không cập nhật được!");
    }
};

//  Delete cart
const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Sản phẩm đã bị xóa.")
    }catch(err){
        res.status(500).json(err);
    }
};

//  Get user carts
const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId})
        res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err);
    }
};

//  Get all 

const getAllCart = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch(err){
        re.status(500).json(err);
    }
};


module.exports = { createCart, updateCart, deleteCart, getCart, getAllCart };