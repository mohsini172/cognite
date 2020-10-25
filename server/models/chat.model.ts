import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var chatSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    texts: [{
        from: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        date: Date,
        value: String
    }]
});

export const ChatModel = mongoose.model('chat', chatSchema);