"use strict";
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const { getUserLogin } = require("../models/userModel");
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();

// local strategy for username password login
passport.use(
    new Strategy(async (username, password, done) => {

        try {
            const [user] = await getUserLogin(username);
            console.log("Local strategy", user); // result is binary row
            if (user === undefined) {
                return done(null, false, { message: "Incorrect email." });
            }
            if (user.password !== password) {
                return done(null, false, { message: "Incorrect password." });
            }
            return done(null, { ...user }, { message: "Logged In Successfully" }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    })
);

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET

passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
    },
    function async(jwtPayload, done) {
        // Get user data from DB using userModel or extract data from token
        console.log('user from token', jwtPayload);
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }
));

module.exports = passport;