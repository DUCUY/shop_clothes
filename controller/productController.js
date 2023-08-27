const Product = require("../models/Product");


//create product 
const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        return res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json("Không thêm được sản phẩm!");
    }
};



// update product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json("Không cập nhật được!");
    }
};

// // Delete user
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Sản phẩm đã bị xóa.")
    }catch(err){
        res.status(500).json(err);
    }
};

// // Get product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    }catch(err){
        res.status(500).json(err);
    }
};

// // Get all products
const getAllProduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
       let products;

       if(qNew) {
        products = await Product.find().sort({ createdAt: -1}).limit(5)
       } else if(qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            },
        });
       } else {
        products = await Product.find();
       }
        
        res.status(200).json(products);
    }catch(err){
        res.status(500).json(err);
    }
};


module.exports = { createProduct, updateProduct, updateProduct, deleteProduct, getProduct, getAllProduct };