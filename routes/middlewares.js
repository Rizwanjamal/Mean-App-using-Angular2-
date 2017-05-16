

//Authentication middleware
module.exports= function(req, res, next) {
  if(!req.headers['auth-token'] || req.headers['auth-token'] === "undefined"){
        return next({"status": 401, "errorMessage": "You dont have the rights to access that route !"});
  }
  next();
}
