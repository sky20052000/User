const jwt = require("jsonwebtoken");
const config = require("../config/config.json");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const refreshTokens = [];
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const validateUpdatePasswordInput = require("../validation/update-password");
const validatechangePasswordInput = require("../validation/change-password");
const userController = {
 register: async(req,res)=>{
     //  route for register /users/register
     try{
         console.log(req.body);
      const {errors , isValid} = validateRegisterInput(req.body);
      if(!isValid){
        return res.status(400).json(errors);
      }
      const {fullname ,email, password } = req.body;
      const  user = await User.findOne({email});
      if(user){
          return res.status(400).josn({msg:"User already exists"});
      }
      const passwordhash = await bcrypt.hash(password, 10);
      const newUser = await User({
          fullname:fullname,
          email:email,
          password:passwordhash
      })
      await newUser.save();
      return res.json({
        status: "201",
        msg: "successfully Registered",
      });
     }catch(err){
        return res.status(500).json({ msg: err.message });
     }
 },
 /// login route /users/login
 login: async(req,res)=>{
     try{
       console.log(req.body);
       const {errors, isValid } = validateLoginInput(req.body);
       if(!isValid){
           return res.status(400).josn(errors);
       }
       const {email , password} = req.body;
       const user = await User.findOne({email})
       if(!user){
           return res.status(400).json({errors:{email:"Invalid Email"}});
       }
       if (user.status == 0) {
        return res.status(0).json({ errors: { email: "user is not active" } });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: { password: "Password deos not matched" } });
      }
      const accesstoken = createAccessToken({id:user._id});
      console.log(accesstoken, "1111111111111111111");
      const refreshtoken = createRefreshToken({id:user._id});
      refreshTokens.push(refreshtoken);
      console.log(refreshtoken,"2222222222222222222");
      return res.json({
        status: "201",
        msg: "Login successfully",
      });
     }
     catch(err){
        return res.status(500).json({ msg: err.message });
     }
 },

 // refreshtoken 
 refreshToken:async(req,res)=>{
     try{
        console.log(rf_token, "rfffffffffffff");
      const rf_token = refreshTokens[0];
     if(!rf_token){
         return res.status(400).json({msg:"Login first"});
     }

     // verify token
     jwt.verify(
        rf_token,
        config.REFRESH_TOKEN,
        console.log(REFRESH_TOKEN),
        async (err, result) => {
          if (err) {
            return res.status(400).json({ msg: "login first" });
          }
          if (!result) {
            return res.status(400).json({ msg: "user does not exist" });
          }
          const user = await User.findById(result.id);
          const access_token = createAccessToken({ id: user.id });
          res.json({
            access_token,
            role: user.role,
            user: {
              ...user._doc,
              password: " ",
            },
          });
        }
      );
     }catch(err){
         return res.status(500).json(errors);
     }
 },


 get_cookie: (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
  },


 //logout
 
 logout: async (req, res) => {
    try {
      res.clearCookie(refreshTokens, {path:"/users/refresh_token"});
      return res.json({ status: 200, msg: "logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
//// update password
update_password:async(req,res)=>{
       try{
        console.log(req.body);
        const { errors, isValid } = validateUpdatePasswordInput(req.body);
        if (!isValid) {
          return res.status(400).json({ errors: "validation errors" });
        }
  
        const passwordhash = bcrypt.hash(req.body.new_password, 10);
        await User.findOneAndUpdate(
          {
            _id: req.body.user_id,
          },
          {
            passwordhash,
          }
        );
  
        return res.status(201).json({ msg: "Passwrod successfully updated" });
       }catch(err){
        return res.status(500).json({ err: { oldpassword: err.message } });
       }
},

// change password
change_password:async(req,res)=>{
    try {
        console.log(req.body);
        //chech validation
        const { errors, isValid } = validatechangePasswordInput(req.body);
  
        if (!isValid) {
          return res.status(400).json(errors);
        }
  
        const user = await User.findOne({ email: req.body.email });
        const isMatch = bcrypt.compare(req.body.oldpassword, user.password);
        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: { oldpassword: "Incorrect Password" } });
        }
        const passwordhash = await bcrypt.hash(req.body.password, 10);
        await User.findOneAndUpdate(
          {
            email: req.body.email,
          },
          {
            password: passwordhash,
          }
        );
        return res.status(200).json({ msg: "Password successfully changed" });
      } catch (err) {
        return res.json({ error: 0, errors: { oldPassword: err.message } });
      }
},
}
// function to create access token
const createAccessToken = (user)=>{
    return jwt.sign(user,config.ACCESS_TOKEN, {expiresIn:"1d"});
}
// function to create refresh token
const createRefreshToken = (user)=>{
    return jwt.sign(user,config.REFRESH_TOKEN, {expiresIn:"5d"});
}
module.exports = userController;