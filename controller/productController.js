const Product = require("../models/Product");
const User = require("../models/User");

const createProduct = async (req, res) => {
    try {
        const product = await Product.findOne({ title: req.body.title })
        if (!product) {
            let detail = {
                size: req.body.size,
                quantity: req.body.quantity,
                color: req.body.color
            }
            const data = {
                ...req.body,
                detail,
                size: [req.body.size],
                color: [req.body.color],
                titlelazy: normalizeWord(req.body.title),
                descriptionlazy: normalizeWord(req.body.description),
                inStock: req.body.quantity
            }

            const newProduct = new Product(data);
            const savedProduct = await newProduct.save();
            return res.status(200).json(savedProduct);
        } else {
            let i = 0;
            let check = product.detail.filter((item, index) => {
                if ((item.size === req.body.size) && (item.color === req.body.color)) {
                    i = index;
                    return item
                }
            })
            if (check.length > 0) {
                product.detail[i].quantity = Number(product.detail[i].quantity) + Number(req.body.quantity);
                product.inStock = Number(product.inStock) + Number(req.body.quantity);
                const savedProduct = await product.save();

                return res.status(200).json(savedProduct);

            } else {
                product.detail.push({
                    size: req.body.size,
                    quantity: req.body.quantity,
                    color: req.body.color
                })
                let checkcolor = product.color.includes(req.body.color);
                let checksize = product.size.includes(req.body.size);
                if (!checkcolor) {
                    product.color.push(req.body.color)
                }
                if (!checksize) {
                    if (req.body.size === 'XL') {
                        product.size.push(req.body.size)

                    } else {
                        if (product.size.includes('XL')) {
                            product.size.unshift(req.body.size)
                            product.size.sort().reverse();
                        } else {
                            product.size.push(req.body.size)
                            product.size.sort().reverse();
                        }
                    }

                }
                product.inStock = Number(product.inStock) + Number(req.body.quantity);

                const savedProduct = await product.save();
                return res.status(200).json(savedProduct);
            }

        }

    } catch (err) {
        res.status(500).json("Không thêm được sản phẩm!");
    }
};

// update product
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, img, price } = req.body;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json("Product not found");
        }

        product.title = title;
        product.description = description;
        product.img = img;
        // product.categories = categories;
        product.price = price;
        const data = await product.save();
        return res.status(200).json({msg:"Cập nhật thành công.", data, status: "success"});

    } catch (err) {
        res.status(500).json("Không cập nhật được!");
    }
};

// // update product
// const updateProduct = async (req, res) => {
//     try {
//         const id = req.params.id;
//         const { title, description, img, categories, size, quantity, color, price } = req.body;
//         const product = await Product.findById(id);
//         if (!product) {
//             return res.status(400).json("Product not found");
//         }
//         product.title = title;
//         product.description = description;
//         product.img = img;
//         product.categories = categories;
//         product.price = price;
//         let newDetail = product.detail.map((detail) => {
//             if (detail.size === size && detail.color === color) {
//                 detail.quantity = quantity;
//             }
//             return detail;
//         })
//         product.detail = newDetail;
//         await product.save();
//         return res.status(200).json({msg:"Cập nhật thành công.", status: "success"});

//     } catch (err) {
//         res.status(500).json("Không cập nhật được!");
//     }
// };

// Delete product
const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Sản phẩm đã bị xóa.")
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get product
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("rate");
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
            products = await Product.find().populate("comments");
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

            const totalRate = newRate.rate.reduce((acc, cur) => acc + cur.star, 0);
            const averageRate = totalRate / newRate.rate.length;
            product.totalRate = averageRate
            await product.save();

        } else {
            const idVote = check;
            const newArrRate = product.rate.filter((item) => {
                return idVote._id.toString() !== item._id.toString()
            })
            newArrRate.push({
                userId,
                star: rate
            })

            product.rate = newArrRate
       
            const totalRate = newArrRate.reduce((acc, cur) => acc + cur.star, 0);
            const averageRate = totalRate / newArrRate.length;
            product.totalRate = averageRate
      
            const newProduct = await product.save();

            if (!newProduct) {
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
        const product = await Product.findOne({ productId });

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

function normalizeWord(keyword) {
    if (!keyword) return ''
    return keyword
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}
const search = async (req, res) => {

    try {
        const { keyword } = req.body;
        const regex = new RegExp(keyword, 'i');

        const result = await Product.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { titlelazy: { $regex: regex } },
                { descriptionlazy: { $regex: regex } }
            ]
        })
        if (!result) {
            return res.status(400).json({ status: 'failure' })
        }
        return res.status(200).json({ status: 'success', result })

    } catch (err) {
        res.status(500).json("Lỗi hệ thống");
    }
};

const discount = async (req, res) => {
    try { 
        const { salepercent } = req.body;
        const { productId } = req.params;
        const product = await Product.findById(productId);

        if (!product) {
            res.status(400).json({ message: 'Product not found' });
        }
        product.oldprice = product.price
        product.price = product.price - (salepercent/100 * product.price);
        product.sale = salepercent + "%";

        const disc = await product.save();

        return res.status(200).json({msg: "Cập nhật giảm giá thành công.", status: 'OK', disc});        
        
    } catch (err) {
        return res.status(500).json("Lỗi không thể cập nhật giảm giá!");
        
    }
};




module.exports = { createProduct, updateProduct, updateProduct, deleteProduct, getProduct, getAllProduct, vote, getRate, search, discount };