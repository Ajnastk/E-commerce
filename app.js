const express = require("express");
const app = express();
require('dotenv').config();
const path = require("path");
let dbconnect=require("./config/dbconnect")
dbconnect()

let authRouter=require("./routes/authroute")
let homeroute=require('./routes/homeroute')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.static("public"))

app.use(homeroute);
app.use("/",authRouter)

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});