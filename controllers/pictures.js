import mockData from '../MOCK_DATA.json';
import mongoose from 'mongoose';
const User = mongoose.model('User');
const Image = mongoose.model('Image');

export function getImages (req, res) {
	res.json(mockData);
}

export async function addImage (req, res) {
	const {image} = req.body;
	const newImage = new Image({
		url: image.imageLink,
		header: image.header,
		description: image.description,
		owner: req.user._id,
	});
	newImage
		.save()
		.then(() => {
			User
				.findOneAndUpdate({_id: req.user._id}, {$push: {images: newImage._id }})
				.then(() => {res.json({newImage})})

		})
		.catch(err => res.status(500).json({errors: {global: 'Oops, something went wrong on our end.'}}));
}