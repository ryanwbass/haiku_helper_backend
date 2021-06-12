import express from 'express';
import haiku from '../../services/haiku.service';

var router = express.Router();

export default async (app) => {
    app.use('/', router);

    router.post('/haiku/create', haiku.create);
    router.post('/haiku/find', haiku.find);
    router.put('/haiku/update', haiku.update);
    router.delete('/haiku/delete/:_id', haiku.delete);
}