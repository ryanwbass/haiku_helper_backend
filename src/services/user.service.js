import User from '../models/user.model';
import Logger from '../loaders/logger';
import { add } from 'winston';

var getUserPublicInfo = async (_id) => {
    var user = await User.findById(_id);
    var publicInfo = {
        'email': user.email
    }
    return publicInfo;
}

exports.create = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
    }

    try {
        console.log(req.body);
        var user = await User.create(req.body);
        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        Logger.error(e);
        if (e.name === 'MongoError' && e.code === 11000) {
            // Duplicate username
            console.log('duplicate');
            return res.status(422).send({ succes: false, message: 'User already exist!' });
          }
    
          // Some other error
          return res.status(422).send(err);
    }
}

exports.find = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
    }

    try{
        var users = await User.find(req.body);
        res.json(users);
    } catch (e) {
        Logger.error(e);
    }
}

exports.update = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
    }

    try {
        const { _id, ...dataWithoutId } = req.body;
        var user = await User.findByIdAndUpdate(
            _id, 
            dataWithoutId,
            { new: true}
        );
        res.json(user);
    } catch (e) {
        Logger.error(e);
    }
}

exports.delete = async (req, res) => {
    
    if(!req.body) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
    }

    try {
        await User.findByIdAndRemove(req.params._id);
        return res.send({});
    } catch (e) {
        Logger.error(e);
    }
}

exports.getLibrary = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Request content cannot be empty"
        });
    }

    try{
        var library = await getUsersLibrary(req.body.user);
        res.json(library);
    } catch (e) {
        Logger.error(e);
    }
}

module.exports.getPublicProfile = async(req, res) => {
    if(!req.body) {
      return res.status(400).send({
          message: "User content cannot be empty"
      });
    }
  
    try{
        var user = await User.findOne({email: req.body.user});
        var profile = {
            'library': await getUsersLibrary(user._id),
            'user': await getUserPublicInfo(user._id),
            'public': true
        }
        res.json(profile);
    } catch (e) {
        Logger.error(e);
    }
  }

module.exports.test = async(req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
      }
    
      try{
            res.json({'syns': await Promise.all(req.body.words.map(async(word) => {
                return {'word': word, 
                        'syns' : await moby.search(word)
                }
            }))});
      } catch (e) {
          Logger.error(e);
      }
}