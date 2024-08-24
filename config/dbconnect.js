let mongoose=require("mongoose")
let mongourl=process.env.MONGO_URL
let dbconnect=()=>{
    try{
        mongoose.connect(mongourl).then(()=>{
            console.log("mongodb connected successfully");
            
        })
    }catch(err){
        console.log("data base error");
        
    }

};


module.exports=dbconnect