const express = require("express");
const router = express.Router();
const userController =require("../Controller/userController");
//register route
router.post("/register", userController.register);
//login route
router.post("/login", userController.login);
//refresh token
router.post('/refresh_token', function(req, res){
    userController.refreshToken
  });
//logout 
router.post("/logout",userController.logout);

// update password
router.post("/update-password", userController.update_password);
module.exports = router;