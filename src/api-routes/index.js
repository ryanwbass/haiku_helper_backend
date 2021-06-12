var express = require('express');
var router = express.Router();

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'Need_To_Set_As_Env_Var',
  userProperty: 'payload',
  algorithms: ['sha1', 'RS256', 'HS256']
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');



import user from './routes/user';
import haiku from './routes/haiku';
import lit from './routes/lit';

export default () => {
    const app = router;

    app.get('/profile', auth, ctrlProfile.profileRead);

    app.post('/register', ctrlAuth.register);
    app.post('/login', ctrlAuth.login);


    user(app);
    haiku(app);
    lit(app);

    return app;
}