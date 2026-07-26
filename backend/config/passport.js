const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0]?.value;

        if (!email) {
          return done(null, false, {
            message: "Google account email is required.",
          });
        }

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: profile.displayName || "Google User",
            email,
            googleId: profile.id,
            authProvider: "google",
          });
        } else {
          if (!user.googleId) {
            user.googleId = profile.id;
          }

          user.authProvider = user.authProvider || "google";

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;