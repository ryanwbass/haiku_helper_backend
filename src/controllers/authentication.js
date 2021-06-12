var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {
  var user = new User();

  user.email = req.body.email;
  user.username = req.body.username;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.setPassword(req.body.password);

  User.findOne({
    $or: [{
      email: req.body.email
    }, {
      username: req.body.username
    }]
  }).then(retUser => {
    if(retUser){
      let errors = {'messages': []};
      if (retUser.username === req.body.username) {
          errors.messages.push("User Name already exists");
      } 
      if (retUser.email === req.body.email) {
          errors.messages.push("Email already in use");
      }
      return res.status(400).json(errors);
    } else{
      user.save(function(err) {
        if (err) {
          if (err.name === 'MongoError' && err.code === 11000) {
            // Duplicate username
            return res.status(422).send({ succes: false, message: 'User already exist!' });
          }
    
          // Some other error
          return res.status(422).send(err);
        }
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token" : token
        });
      });
    }
  }).catch(err => {
    console.log(err);
    return res.status(500).json({
      error: err
    });
  });
};

module.exports.login = async function(req, res) {
    var token;
    var user = await User.findOne({ email : req.body.email });
    if(!user){
        return res.status(400).send({
            message: "No user found"
        });
    }
    var userVerified = user.verifyPassword(req.body.password);
    if(!userVerified){
        return res.status(400).send({
            message: "Incorrect password"
        });
    }
    else{
        token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
      return res;
    }
/*
  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
  */
};