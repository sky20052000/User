
const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdatePasswordInput(data) {
    let errors = {};

    data.new_password = !isEmpty(data.new_password) ? data.new_password:"";
    data.confirm_password = !isEmpty(data.confirm_password) ? data.confirm_password:"";

    if(validator.isEmpty(data.new_password)){
        errors.new_password = "Enter your new passsword";
        
    }

    if(validator.isEmpty(data.confirm_password)){
        errors.confirm_password = "Enter your confirm  password again";
    }

    if(validator.isEmpty(data.new_password != data.confirm_password)) {
        errors.confirm_password  = "Password  not matched";
    }
    return {
        errors,
        isValid: isEmpty(errors)
      };
}