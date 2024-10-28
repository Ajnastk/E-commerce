const asyncHandler = require("express-async-handler");
let Category  = require('../../model/categoryModel');



//-----categorypage get-------

const categoryPage = asyncHandler(async (req, res) =>  {
    try {
        const categories = await Category.find();
        res.render("admin/category", {
            categories,
            section: 'categories'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error fetching categories', error });
    }
});




// Function to add a category

const createCategory = async (req, res) => {
    try {
        const { slNo, name, status } = req.body;
        const newCategory = new Category({ slNo, name, status });
        await newCategory.save();
        res.status(201).json({success:true,message:'category added successsfuly'})
         

    } catch (error) {
        res.status(400).json({success:false, message: 'Error creating category' });
    }
};

//delete a category

const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;  // Get the category ID from the URL

        const deletedCategory = await Category.findByIdAndDelete(categoryId);  // Find and delete the category

        if (!deletedCategory) {
            return res.status(404).json({ success:false, message: 'Category not found' });  // Handle case where category doesn't exist
        }

  // After successful deletion, redirect to the category list page
  res.redirect('/admin/category');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });  // Error response
    }

};


//get editcategory page

const getEditCategory = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "category not found" });
        }

        res.render('admin/editCategory', { category });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching category', error });
    }
});

// Update the category in the database
const updateCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { slNo, name, status } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { slNo, name, status },
            { new: true } // Return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
 
      // After successful in edit, redirect to the category list page
  res.redirect('/admin/category');
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error });
    }
};





module.exports = { categoryPage, createCategory, deleteCategory ,getEditCategory,updateCategory  }
