const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users')

passport.use(new LocalStrategy({
	usernameField: 'email'
}, async(email, password, done)=>{
	const user = await User.findOne({email: email});
    if(!user){
        done(null, false, { message: "User not found" });
    } else {
        const match = user.matchPassword(password);
        if(match){
            return done(null, user);
        } else {
            return done(null, false, { message: "Incorrect Password" });
        }
    }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id)
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});