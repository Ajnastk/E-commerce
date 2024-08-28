let express = require("express")
let router = express.Router()
let {createUser,login}=require("../controller/userctrl")

router.post("/signin",login)
router.post("/signup",createUser)



module.exports=router ;

