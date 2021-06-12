import express from 'express';
import lit from '../../services/lit.service';

var router = express.Router();

export default async (app) => {
    app.use('/', router);

    router.post('/lit/thesaurus', lit.thesaurus);
    router.post('/lit/dictionary', lit.dictionary);
}