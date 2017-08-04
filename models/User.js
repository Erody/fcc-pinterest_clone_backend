import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: 'Please supply an email address.'
	},
	passwordDigest: {
		type: String,
	},
	images: [
		{ type: mongoose.Schema.ObjectId, ref: 'Image'}
	],
	oauthID: {
		type: String
	}
});

const autoPopulate = function (next) {
	this.populate('images');
	next();
};

userSchema
	.pre('findOne', autoPopulate)
	.pre('find', autoPopulate);


export const User = mongoose.model('User', userSchema);