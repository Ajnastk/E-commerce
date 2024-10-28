const asyncHandler = require("express-async-handler");
// const Category = require('../../model/categoryModel')
const Product = require( '../../model/productModel')

const homepage=(req,res)=>{
    res.render("index");
}
const shop = async (req, res) => {
    try {
        const categories = await Category.find(); // Fetch categories
        const products = await Product.find().populate('category'); // Fetch products and populate category
        res.render('shop', { products, categories }); // Pass both products and categories to the view
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Server Error");
    }
};

const about=(req,res)=>{
    res.render("about");
}

const shopDetails=(req,res)=>{
    res.render("shop-details");
}

const cart=(req,res)=>{
    res.render("shopping-cart");
}

const checkout=(req,res)=>{
    res.render("checkout");
}
const blogDetails=(req,res)=>{
    res.render("blog-details");
}

const blog=(req,res)=>{
    res.render ("blog");
}

const contact=(req,res)=>{
    res.render("contact");
}


module.exports={homepage,shop,about,shopDetails,cart,checkout,blogDetails,blog,contact}


