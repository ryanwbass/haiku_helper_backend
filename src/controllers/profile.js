var mongoose = require('mongoose');

import User from '../models/user.model';
import Logger from '../loaders/logger';

module.exports.profileRead = async (req, res) => {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    var user = await User.findById(req.payload._id);
    var profileData = {
      'user': user
    }
    res.status(200).json(profileData);
  }
};