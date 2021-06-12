import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    active: {
        type: Boolean,
        default: false
    },
    library: [String],
    credits: {
        type: Number,
        default: 0
    },
    addressValid: {
        type: Boolean,
        default: false
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    street1: {
        type: String,
        default: ''
    },
    street2: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

UserSchema.methods.verifyPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000),
    }, "Need_To_Set_As_Env_Var");
}

export default mongoose.model('User', UserSchema, 'user')