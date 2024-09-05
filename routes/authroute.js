let express = require("express")
let router = express.Router()
let {registerGet,register,signin,signinGet}=require("../controller/userctrl")




router.get("/signup",registerGet)
router.post("/signup",register)

router.get("/signin",signinGet)
router.post("/signin",signin)



module.exports=router ;

