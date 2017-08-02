import dotenv from 'dotenv'
dotenv.config({ path: './variables.env'});

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
	console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// Import all of our models
import './models/Image';

const app = express();

app.use(bodyParser.json());

// Routes
import pictures from './routes/pictures';
app.use('/api/pictures', pictures);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`)
});