const passport = require('passport');
const USER = require('../../Models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env

console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, "GOOGLE AUTH");

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    try {
      const userInfo = await USER.findOne({ googleId: profile._json.sub })
      if (!userInfo) {
        console.log("undefined user");
        const userTemplate = new USER({
          fullname: profile._json.given_name,
          googleId: profile._json.sub,
          surname: profile._json.family_name,
          username: profile._json.name,
          email: profile._json.email,
          googleVerified: true,
          emailVerified: true,
        })
        userTemplate.save().then(() => {
          return done(null, profile)
        })
      } else {
        console.log("defined user");
        return done(null, profile)
      }
    } catch (error) {
      console.log(error, "token error");
    }

  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});