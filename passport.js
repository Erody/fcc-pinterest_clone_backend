import dotenv from 'dotenv'
dotenv.config({ path: './variables.env'});
import mongoose from 'mongoose';
const User = mongoose.model('User');
import bcrypt from 'bcrypt';

export function twitterSetup(passport, TwitterStrategy){
	passport.use(new TwitterStrategy({
			consumerKey: process.env.TWITTER_CONSUMER_KEY,
			consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
			callbackURL: process.env.TWITTER_CALLBACK_URL
		},
		function(accessToken, refreshToken, profile, done) {
			User.findOne({ oauthID: profile.id }, (err, user) => {
				if(err) {
					console.log(err);  // handle errors!
				}
				if (!err && user !== null) {
					done(null, user);
				} else {
					const newUser = new User({
						oauthID: profile.id,
						name: profile.displayName,
						created: Date.now()
					});
					newUser.save((err) => {
						if(err) {
							console.log(err);  // handle errors!
						} else {
							console.log("saving user ...");
							done(null, newUser);
						}
					});
				}
			});
		}
	));
}

// todo change this
export function localSetup(passport, LocalStrategy) {
	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			const errors = {};
			User.findOne({ email }, function(err, user) {
				if (err) { return done(err); }
				if (!user) {
					errors.email = "Invalid credentials, please try again.";
					errors.password = "Invalid credentials, please try again.";
					return done(null, false, errors);
				}
				if (!bcrypt.compareSync(password, user.passwordDigest)) {
					errors.email = "Invalid credentials, please try again.";
					errors.password = "Invalid credentials, please try again.";
					return done(null, false, errors);
				}
				return done(null, user);
			});
		}
	));
}