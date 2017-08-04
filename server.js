import dotenv from 'dotenv'
dotenv.config({ path: './variables.env'});

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
	console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Import all of our models
import './models/Image';
import './models/User';

// Create the app
const app = express();

// Configure app
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true,
	cookie: {}
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
const User = mongoose.model('User');
passport.serializeUser((user, done) => {
	done(null, user._id);
});
passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		err ? done(err, null) : done(null, user);
	});
});

// Routes
import images from './routes/images';
import auth from './routes/auth';
app.use('/api/images', images);
app.use('/api/auth', auth);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`)
});