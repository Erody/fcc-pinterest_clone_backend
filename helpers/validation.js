import isEmpty from 'lodash/isEmpty';
import validator from 'validator';

export function validateSignup({email, password, passwordVerification}) {
	const errors = {};
	if(!validator.isEmail(email)) {
		errors.email = 'Invalid email address.'
	}
	if(validator.isEmpty(email)) {
		errors.email = "Email can't be empty."
	}
	if(validator.isEmpty(password)) {
		errors.password = "Password can't be empty."
	}
	if(validator.isEmpty(passwordVerification)) {
		errors.passwordVerification = "Password verification can't be empty."
	}
	if(!validator.equals(password, passwordVerification)) {
		errors.password = "Passwords must match.";
		errors.passwordVerification = "Passwords must match."
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
}