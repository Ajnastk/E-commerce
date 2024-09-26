let express = require("express")
let router = express.Router()
let {adminPage}=require("../controller/admin/adminCtrl")

router.get("/admin",adminPage)

module.exports= router