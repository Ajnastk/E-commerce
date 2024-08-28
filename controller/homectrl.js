const homepage=(req,res)=>{
    res.render ("index");
}
const shop=(req,res)=>{
    res.render ("shop");
}

const about=(req,res)=>{
    res.render("about");
}

const shopDetails=(req,res)=>{
    res.render("shop-details");
}

const cart=(req,res)=>{
    res.render("shopping-cart");
}

const checkout=(req,res)=>{
    res.render("checkout");
}
const blogDetails=(req,res)=>{
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
module.exports={homepage,shop,about,shopDetails,cart,checkout,blogDetails,blog,contact,signin}


