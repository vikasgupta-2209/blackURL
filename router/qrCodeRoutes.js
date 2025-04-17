const express= require("express");
const router= express.Router();
const {handleQRCodeGeneration}=require("../controller/qrCodeController");

router.post("/",handleQRCodeGeneration);
module.exports=router;