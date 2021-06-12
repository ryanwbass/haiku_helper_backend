import mongoose from 'mongoose';
const dbConf = require('../config/database.config');
const mongoUri = 'mongodb://127.0.0.1:27017/HeroHaiku';

const mongooseLoader = async () => {
    const connection = await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
    return connection;
};

export default mongooseLoader;