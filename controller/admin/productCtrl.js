const asyncHandler = require("express-async-handler");
const Category = require('../../model/categoryModel')
const Product = require( '../../model/productModel')

const getProduct = asyncHandler(async(req,res)=>{
    try {
        const categories = await Category.find(); // Fetch categories for the dropdown
        const products = await Product.find().populate('category'); // Fetch products with category populated
        res.render('admin/product', { categories, products }); // Pass both categories and products
    } catch (error) {
        console.error('Error rendering product page:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle adding a new product (POST)
const addProduct = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        const image = req.file ? req.file.filename : null;   // Handle image upload

        // Create new product
        const newProduct = new Product({
            name,
            price,
            category,
            stock,
            image
        });

        // Save product to database
        await newProduct.save();
        res.redirect('/admin/product');  // Redirect back to the product page
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).send('Error adding product');
    }
};

const deleteProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(productId);
    res.redirect('/admin/product');
});

// Get product by ID and render edit form
const editProductPage = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate('category');
    const categories = await Category.find(); // Fetch available categories for the dropdown

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.render('admin/editProduct', { product, categories });
});
// Update product by ID
const updateProduct = asyncHandler(async (req, res) => {
    const productId = req.params.id;
    const { name, price, category, stock } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const updatedData = { name, price, category, stock };
    if (image) updatedData.image = image;

    await Product.findByIdAndUpdate(productId, updatedData, { new: true });
    res.redirect('/admin/product');
});



module.exports = {
    getProduct,
    addProduct,
    deleteProduct,
    editProductPage,
    updateProduct
}