let express = require("express")
let router = express.Router()
let {adminPage}=require("../controller/admin/adminCtrl")
let {categoryPage,createCategory}=require("../controller/admin/categoryCtrl")


router.get("/admin",adminPage)
router.get("/category",categoryPage)
router.post("/categories",createCategory)

module.exports= router
