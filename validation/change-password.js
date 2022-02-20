const validator = require("validator");
const isEmpty = require("is-empty");

module.exports =   function validatechangePasswordInput(data) {
    let  errors = {};

    data.email = !isEmpty(data.email) ? data.email:"";
    data.oldpassword = !isEmpty(data.oldpassword) ? data.oldpassword:"";
    data.password = !isEmpty(data.password) ? data.password:"";
    data.cpassword  = !isEmpty(data.cpassword) ? data.cpassword:"";

    if(validator.isEmpty(data.email)) {
        errors.email = "enter your email ";
    }

    if(validator.isEmpty(data.oldpassword)) {
        errors.oldpassword = "enter your current password ";
    }

    if(validator.isEmpty(data.password)) {
        errors.password = "enter your  new password ";
    }

    if(validator.isEmpty(data.cpassword)) {
        errors.cpassword = "enter your re-enter your new password ";
    }

    if(validator.isEmpty(data.cpassword != data.cpassword)) {
        errors.cpassword = "matching new password with confirm password ";
    }
    return {
        errors,
        isValid: isEmpty(errors)
      };
};