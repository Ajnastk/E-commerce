let express = require("express")
let router = express.Router()
let {createUser,login}=require("../controller/userctrl")

router.post("/signup",createUser)
router.post("/signin",login)


module.exports=router ;

