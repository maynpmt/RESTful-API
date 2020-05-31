const config = require('../config/index')
const User = require('../models/user');
const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.JWT_SECRET;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
//decode automaticly เราได้ payload ออกมาเลย
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    //เอาไป query ข้อมูลต่อได้เลย
    try {
        const user = await User.findById(jwt_payload.id);
        
        if(!user){
            return done(new Error('ไม่พบผู้ใช้ในระบบ'), null);
        }

        return done(null, user);
        
    } catch (error) {
        done(error);
    }
}));

//ไม่เอาไปแปะที่นู่น ตรงroute เพราะโค้ดมันจะรก แปะนี่แล้วเอาไปเรียกใช้เอา
module.exports.isLogin = passport.authenticate('jwt', { session: false });