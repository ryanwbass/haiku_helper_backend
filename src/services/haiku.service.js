import Haiku from '../models/haiku.model';
import Logger from '../loaders/logger';
import { add } from 'winston';

exports.create = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Haiku content cannot be empty"
        });
    }

    try {
        console.log(req.body);
        var haiku = await Haiku.create(req.body);
        console.log(haiku);
        res.status(200).send(haiku);
    } catch (e) {
        Logger.error(e);
    }
}

exports.find = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Haiku content cannot be empty"
        });
    }

    try{
        var haikus = await Haiku.find(req.body);
        res.json(haikus);
    } catch (e) {
        Logger.error(e);
    }
}

exports.update = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Haiku content cannot be empty"
        });
    }

    try {
        const { _id, ...dataWithoutId } = req.body;
        var haiku = await Haiku.findByIdAndUpdate(
            _id, 
            dataWithoutId,
            { new: true}
        );
        res.json(haiku);
    } catch (e) {
        Logger.error(e);
    }
}

exports.delete = async (req, res) => {
    
    if(!req.body) {
        return res.status(400).send({
            message: "Haiku content cannot be empty"
        });
    }

    try {
        await Haiku.findByIdAndRemove(req.params._id);
        return res.send({});
    } catch (e) {
        Logger.error(e);
    }
}