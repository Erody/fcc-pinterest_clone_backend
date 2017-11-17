import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
	url: {
		type: String,
		required: 'You must supply an image url.'
	},
	header: {
		type: String,
		required: 'You must supply a header.'
	},
	description: {
		type: String,
	},
	likes: {
		type: Number,
		default: 0,
	},
	dislikes: {
		type: Number,
		default: 0,
	},
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: 'Image has to have a User associated with it.'
	},
});


export const Image = mongoose.model('Image', imageSchema);