import Logger from '../loaders/logger';
var moby = require('moby')
var en = require('dictionary-en');
const enwordnet = require("en-wordnet").default;
const wordnet = require('wordnet');
const Dictionary = require("en-dictionary").default;
var dictionary;
var natural = require('natural');

const start = async () => {
    dictionary = new Dictionary(enwordnet.get("3.0"));
    await dictionary.init();
};
start();

module.exports.thesaurus = async(req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
      }
    
      try{       
            res.json({'syns': await Promise.all(req.body.words.map(async(word) => {
                var val = await moby.search(word);
                return {'word': word, 
                        'syns' : val,
                        'count' : val.length
                }
            }))});
      } catch (e) {
          Logger.error(e);
      }
}

module.exports.dictionary = async(req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
      }
    
      try{
        res.json(Object.fromEntries(dictionary.searchFor([req.body.word])));
      } catch (e) {
          Logger.error(e);
      }
}