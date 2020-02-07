const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const userSchema = new Schema({
    agency: { type: String, required: true },
    name: { type: String },
    balance: { type: String },
});

module.exports =  mongoose.model('User', userSchema);

