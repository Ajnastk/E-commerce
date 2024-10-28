const express = require("express")
const router = express.Router() 
const {adminPage}=require("../controller/admin/adminCtrl")
const {categoryPage,createCategory,deleteCategory,getEditCategory,updateCategory}=require("../controller/admin/categoryCtrl")
const {getProduct,addProduct,deleteProduct,editProductPage,updateProduct} = require ("../controller/admin/productCtrl")
const upload = require('../middleware/multerConfiq');

//home page---------------
router.get("/",adminPage)

//category section---------------

router.get("/category",categoryPage)

router.post("/category/add",createCategory)

router.post('/category/delete/:id',deleteCategory)

// Route to display the Edit Category form
router.get('/category/edit/:id', getEditCategory);

// Route to handle updating the category (POST request)
router.post('/category/edit/:id',updateCategory);

// product section-------------------

router.get('/product',getProduct)
router.post('/product/add',upload.single('image'),addProduct)
router.post('/products/delete/:id', deleteProduct);
// Route to display product edit form
router.get('/products/edit/:id', editProductPage);
// Route to update product
router.post('/products/edit/:id', upload.single('image'), updateProduct);


module.exports= router;