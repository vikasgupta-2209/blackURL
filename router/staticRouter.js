const express= require("express");
const router= express.Router();
const restrictUser = require("../middleware/authMiddleware");
router.get("/",(req,res)=>{
    res.render("home");
})


//                                 pages for authentication purpose

// for signup----- create an account
router.get("/signup",(req,res)=>{
    res.render("signup");
})

// for login
router.get("/login",(req,res)=>{
    res.render("login");
})


//                                 these pages are for user interaction 

// for shortURL service page
router.get("/shortURLstatic",restrictUser,(req,res)=>{
    res.render("shortURL",{
        shortUrl:null,
    });
})
//for barcode service page
router.get("/barCodestatic",restrictUser,(req,res)=>{
    res.render("barcode",{
        barcodeImage:null,
    });
})
//for qrcode service page
router.get("/qrCodestatic",restrictUser,(req,res)=>{
    res.render("qrCode",{
        qrImage:null,
    });
})
//for user Analytic
router.get("/anaticsStatic",(req,res)=>{
    res.render("userAnalytic",{
        urls:[],
    })
})


//just for decoration
router.get("/contactUs",(req,res)=>{
    res.render("contact");
})
router.get("/termsCondition",(req,res)=>{
    res.render("terms");
})
router.get("/aboutUs",(req,res)=>{
    res.render("about");
})
router.get("/privacyPolicy",(req,res)=>{
    res.render("privacy");
})
module.exports= router;
