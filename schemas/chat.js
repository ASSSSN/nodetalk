const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const chatSchema = new Schema({

    // Room 스키마와 연결, Room 컬렉션의 ObjectId가 들어감
    room: {
        type: ObjectId,
        required: true,
        ref: 'Room',
    },
    
    user: {
        type: String,
        required: true,
    },

    // chat나 gif 둘중 하나만 저장한다.
    chat: String,
    gif: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Chat', chatSchema);