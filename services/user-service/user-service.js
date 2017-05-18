var mongoose = require('mongoose');
var User = require('../../models/User.js');

class UserService{
    /* GET LOGIN */
    static login(req, res, next){
        User.findOne({username : req.body.username, password : req.body.password})
            .then(function (user) {
                if (user) {
                    // authentication successful
                    console.log(user);
                    res.json(user);
                } else {
                    // authentication failed
                return next({"status": 401, "errorMessage": "Incorrect Username or Password !"});
                }
            })
            .catch(function (err) {
                res.json(err);
            });
    }

}


module.exports = UserService;