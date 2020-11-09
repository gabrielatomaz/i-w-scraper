import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    agency: { type: String, required: true },
    name: { type: String },
    balance: { type: String },
});

export default mongoose.model('User', userSchema);

