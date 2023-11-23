const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../database/models/user');
const ObjectId = require('mongoose').Types.ObjectId;

const { secretKey } = require('../environment/vars');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
}, async function (email, senha, done) { 
    try {
        const user = await User.findOne({ email });

        if (!user) { 
            return done(null, false, { message: "Usuário e/ou senha inválidos" });
        }

        const match = await user.compare(senha, user.senha);

        if (!match) {
            return done(null, false, { message: "Usuário e/ou senha inválidos" });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => { 
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => { 
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const opts = { 
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
};

passport.use(new JwtStrategy(opts, async (payload, done) => { 
    try {
        const user = await User.findOne({ _id: payload._id });

        if (!user) { 
            return done(null, false);
        }

        return done(null, { id: user._id });
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = app => { 
    app.use(passport.initialize());
};