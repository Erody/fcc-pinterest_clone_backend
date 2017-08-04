import express from 'express';
import { loginSuccess, localLogin, localSignup, logout } from '../controllers/auth';
import passport from 'passport';
import { catchErrors } from '../handlers/errorHandlers';
import passportTwitter from 'passport-twitter';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
const TwitterStrategy = passportTwitter.Strategy;
import {twitterSetup, localSetup} from '../passport';
twitterSetup(passport, TwitterStrategy);
localSetup(passport, LocalStrategy);

const router = express.Router();

// GET
router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/login'}), loginSuccess);
router.get('/logout', logout);

// POST
router.post('/local/login', passport.authenticate('local'), loginSuccess);
router.post('/local/signup', catchErrors(localSignup));

export default router;