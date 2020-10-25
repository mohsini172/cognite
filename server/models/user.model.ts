import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {
        type: String,
        required: true
    },
	username: {
        type: String,
        required: true,
        unique: true
    }
});

export const UserModel = mongoose.model('user', userSchema);