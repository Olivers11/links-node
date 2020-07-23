const passport = require('passport');
const pool = require('../database');
const helpers = require('../lib/helpers');
const LocalStrategy = require('passport-local').Strategy;


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passportReqCallback: true
}, async (req, fullname,username, password, done) =>{
    console.log(req.body);
    //const { fullname } = req.body;
    const new_user = {
        fullname,
        username,
        password
    };
    console.log("Hola");
    console.log(new_user);
    //new_user.password = await helpers.encrypt_password(password);
    //const result =  await pool.query('select * from links');
    //console.log(result);
}));




