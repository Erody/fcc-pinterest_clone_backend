import mockData from '../MOCK_DATA.json';
import mongoose from 'mongoose';
const User = mongoose.model('User');
const Image = mongoose.model('Image');

export async function getImages (req, res) {
	const filter = req.body;
	const images = await Image.find(filter);
	res.json(images);
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