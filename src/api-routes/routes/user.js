import express from 'express';
import { post } from '../../../app';
import user from '../../services/user.service';

var router = express.Router();

export default async (app) => {
    app.use('/', router);

    router.post('/user/create', user.create);
    router.post('/user/find', user.find);
    router.put('/user/update', user.update);
    router.delete('/user/delete/:_id', user.delete);
    router.post('/user/getLibrary', user.getLibrary);
    router.post('/user/profile', user.getPublicProfile);
    router.post('/user/test', user.test);
}