import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const HaikuSchema = mongoose.Schema({
    userId: String,
    title: String,
    body: Object
}, {
    timestamps: true
});

export default mongoose.model('Haiku', HaikuSchema, 'haiku')