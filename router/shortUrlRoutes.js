const express= require("express");
const router= express.Router();
exports.router = router;
const {handleGenerateShortURL,handleUserAnalytics}=require("../controller/urlControl")
const restrictUser=require("../middleware/authMiddleware")
router.post("/",restrictUser,handleGenerateShortURL);
router.get("/analytic",restrictUser,handleUserAnalytics);

//router.get("/:id",handleRedirectURL);

//router.post("/analytic/:id",handleAnalytic);

module.exports=router;  