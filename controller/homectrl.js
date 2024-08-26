const homepage=(req,res)=>{
    res.render ("index");
}
const shop=(req,res)=>{
    res.render ("shop");
}

const about=(req,res)=>{
    res.render("about");
}

const shopdetails=(req,res)=>{
    res.render("shop-details");
}

const cart=(req,res)=>{
    res.render("shopping-cart");
}

const checkout=(req,res)=>{
    res.render("checkout");
}
const blogdetails=(req,res)=>{
    res.render("blog-details");
}

const blog=(req,res)=>{
    res.render ("blog");
}

const contact=(req,res)=>{
    res.render("contact");
}

const signin =(req,res)=>{
    res.render("signin");
}
module.exports={homepage,shop,about,shopdetails,cart,checkout,blogdetails,blog,contact,signin}


