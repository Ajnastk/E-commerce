const asyncHandler = require("express-async-handler");
let Category = require('../../model/categoryModel')


//-----categorypage get-------

const categoryPage = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        res.render("admin/category", {
            categories,
            section: 'categories'});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});



//categorypage post


const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).json({ message: 'Category created successfully', category: newCategory });
    } catch (error) {
        res.status(400).json({ message: 'Error creating category', error });
    }
});

module.exports = {categoryPage,createCategory}
