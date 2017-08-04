import mongoose from 'mongoose';
const User = mongoose.model('User');
import { validateSignup } from '../helpers/validation';
import bcrypt from 'bcrypt';

export function loginSuccess(req, res) {
	res.json(req.user);
}

export function localLogin(req, res) {
	res.json(req.body);
}

export async function localSignup(req, res) {
	const {errors, isValid} = validateSignup(req.body);
	if(!isValid) {
		// Errors were found, don't let the user sign up.
		res.status(401).json(errors);
	} else {
		// No errors were found, check if user with that email address already exists.
		const {email, password} = req.body;
		const user = await User.findOne({email: email.toLowerCase()});
		if(user) {
			// The email is already in use, don't let the user sign up.
			errors.email = 'That email is already in use.';
			res.status(400).json(errors);
		} else {
			// All clear, continue with sign up.
			const newUser = new User({
				email: req.body.email.toLowerCase(),
				passwordDigest: bcrypt.hashSync(password, 10)
			});
			await newUser.save();
			req.login(newUser);
			res.json(newUser);
		}
	}

}

export function logout(req, res) {
	console.log(req.user);
	req.logout();
	console.log(req.user);
}