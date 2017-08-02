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
	}
});


export const Image = mongoose.model('Image', imageSchema);