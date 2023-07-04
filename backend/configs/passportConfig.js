import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';


passport.serializeUser(function(user,done){
  done(null,user);
})
passport.deserializeUser(function(user,done){
  done(null,user);
})

passport.use(new GoogleStrategy({
  clientID: "1095644933130-i489olff2oous5nu7kqbpo0unqcq991b.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:5000/google/callback",
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  console.log(profile);
  return done(null, profile);
}));
