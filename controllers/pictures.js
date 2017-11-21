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

export async function voteOnImage (req, res) {
	const {id, vote} = req.body;

	const pic = await Image.findOne({_id: id});
	const stringArr = pic.votes.map(x => x.voter.toString());
	const index = pic.votes.findIndex(x => x.voter.toString() === req.user._id.toString());

	let hasVotedAlready = false;
	let voteType = '';
	let voteId;
	if(stringArr.includes(req.user._id.toString())) {
		hasVotedAlready = true;
		voteType = pic.votes[index].voteType;
		voteId = pic.votes[index]._id;
	}


	// todo - If user has upvoted and attempts to downvote don't change the votes and vice versa.

	if(hasVotedAlready && vote !== voteType && voteType.length > 0) {
		const image = await Image.findOneAndUpdate({_id: id, "votes._id": voteId}, {$inc: { [vote]: 1, [voteType]: -1}, $set: {'votes.$.voteType': vote}}, {new: true});
		res.json({image})
	} else if(hasVotedAlready) {
		const image = await Image.findOneAndUpdate({_id: id}, {$inc: { [vote]: -1}, $pull: {votes: {voteType: vote, voter: req.user._id}}}, {new: true});
		res.json({image});
	} else {
		const image = await Image.findOneAndUpdate({_id: id}, {$inc: { [vote]: 1}, $push: {votes: {voteType: vote, voter: req.user._id}}}, {new: true});
		res.json({image});
	}
}