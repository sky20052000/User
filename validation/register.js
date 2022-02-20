const validator = require("validator");
const isEmpty = require("is-empty");

module.exports =  function (data){

    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
    data.fullname = !isEmpty(data.fullname) ? data.fullname : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.cpassword = !isEmpty(data.cpassword) ? data.cpassword: "";

    
// check name 
if(validator.isEmpty(data.fullname)) {
    errors.name = "Name is required";
}

// check email 
if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // check password 

  if(validator.isEmpty(data.password)){
      errors.password = "Password is required";
  }

   // check confrim password  

   if(validator.isEmpty(data.password)){
    errors.cpassword = " Confirm Password is required";
}

if(!validator.isLength(data.password,{min:6 , max:30})) {
    errors.password = "Password atleast 6 character required";
}

if (!validator.equals(data.password, data.cpassword)) {
    errors.cpassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };

}
