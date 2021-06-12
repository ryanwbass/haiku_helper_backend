import dotenv from 'dotenv';

const envFound = dotenv.config();
if(!envFound){
    throw new Error("   Couldn't find .env file   ");
}

export default {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE_URI,
    api: {
        prefix: '/api',
    },
    maxFileSize: 16 * 1024 * 1024,
    logs: {
        level: process.env.LOG_LEVEL || 'silly'
    }
}