const Product = require("../models/Product");
const User = require("../models/User");


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

// // Delete product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Sản phẩm đã bị xóa.")
    } catch (err) {
        res.status(500).json(err);
    }
};

// // Get product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};

// // Get all products
const getAllProduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Update Rate 
// ADD rate
const vote = async (req, res) => {
    try {
        const { productId, userId, rate } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            res.status(400).json({ message: 'User not found' });
        }
        const product = await Product.findById(productId);

        if (!product) {
            res.status(400).json({ message: 'Product not found' });
        }
        if (rate < 1 || rate > 5) {
            res.status(400).json("Số sao đánh giá không hợp lệ!");
        }

        const check = product.rate.find((userRate) => {
            if (userRate.userId.toString() === userId.toString()) {
                return userRate._id
            }
            
            return false
        })
        if (!check) {
            const newRate = await Product.findByIdAndUpdate(productId, {
                $push: { rate: { userId, star: rate } }
            }, { new: true });
            if (!newRate) {
                res.status(400).json({ message: 'Error' });
            }
        } else {
            const idVote = check;
            const newArrRate = product.rate.filter((item) => {
                return idVote._id.toString() !== item._id.toString()
            })
            newArrRate.push({
                userId,
                star: rate
            })


            const newRate = await Product.findByIdAndUpdate(productId, {
                rate: newArrRate
            }, { new: true });

            if (!newRate) {
                res.status(400).json({ message: 'Error' });
            }
        }

        res.status(200).json("Đánh giá sản phẩm thành công.");

    } catch (err) {
        res.status(500).json("Đã xảy ra lỗi khi đánh giá sản phẩm!");
    }
};


// Get Rate trung binh cua so luong rate
const getRate = async (req, res) => {

    try {
        const productId = req.params.productId;
        const product = await Product.find({ productId });

        if (product.rate.length === 0) {
            res.status(404).json("Sản phẩm chưa có đánh giá nào!");
        }

        // Tinh diem trung binh 
        const totalRate = product.rate.reduce((acc, cur) => acc + cur.rate, 0);
        const averageRate = totalRate / product.rate.length;

        res.status(200).json({ averageRate });

    } catch (err) {
        res.status(500).json("Đã xảy ra lỗi khi lấy đánh giá sản phẩm!");
    }
};


module.exports = { createProduct, updateProduct, updateProduct, deleteProduct, getProduct, getAllProduct, vote, getRate };