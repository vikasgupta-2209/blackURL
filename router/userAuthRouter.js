
const express = require("express");
const router = express.Router();
const {
  handlelogin,
  handlelogout,
  handlesignup
} = require("../controller/userAuthControl");

// Route for signup 
router.post("/signup", handlesignup);

// Route for login 
router.post("/login", handlelogin);

// Logout route
router.get("/logout", handlelogout);

module.exports = router;