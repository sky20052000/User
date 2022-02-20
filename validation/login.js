const validator = require("validator");
const isEmpty = require("is-empty");

module.exports =  function validateLoginInput(data){
    let errors = [];
    data.email = !isEmpty(data.email) ? data.email:"";
    data.password = !isEmpty(data.password) ? data.password:"";

    //check for email 
    if(validator.isEmpty(data.email)){
        errors = "Please enter your email";
    }

    // check for password
   if(validator.isEmpty(data.password)){
       errors = "Please enter your password";
   }

   return {
    errors,
    isValid: isEmpty(errors)
  };
}