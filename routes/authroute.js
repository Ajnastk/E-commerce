let express = require("express")
let router = express.Router()
let {createUser,signin}=require("../controller/userctrl")

router.post("/signin",signin)
router.post("/signup",createUser)



module.exports=router ;

