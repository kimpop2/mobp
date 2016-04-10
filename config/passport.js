/* *********************************************************************
 * Copyright (c) 2016, COPYRIGHTⓒ2014 eBiz-Pro. ALL RIGHTS RESERVED.
 *
 * Project       : eBiz-Pro Node Project
 * Program Name  : 인증 passport모듈
 * File          : config.js
 * Description   :
 *
 * Author        :
 * Creation Date :
 * Updated  Date :
 * ********************************************************************/
var JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
var config = require('../config/config'); // get config file
var User = require('../models/user');

module.exports = function(passport, next) {
    var opts = {};
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        var jwtUser = new User({
            //empno: jwt_payload.id
            empno: jwt_payload.empno,
            role : jwt_payload.role
        });
        jwtUser.findOne(next, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user); // user exist
            } else {
                done(null, false); // user not exist
            }
        });
    }));
};
