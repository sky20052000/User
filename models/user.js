const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
   
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
   

    date:{
        type:Date,
        default:Date.now,
    }
    
});

// model
 const User = new mongoose.model("User", userSchema);

 module.exports = User;