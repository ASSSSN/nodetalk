const mongoose = require('mongoose');

const { Schema } = mongoose;

const roomSchema = new Schema({
    title:  {
        type: String,
        required: true,
    },

    // 최대 수용 인원, 최소 인원 2명
    max:    {
        type: Number,
        required: true,
        default: 10,
        min: 2,
    },
    
    owner:  {
        type: String,
        required: true,
    },
    
    // 비밀번호를 설정하면 비밀방, 설정하지 않는다면 공개방
    password: String,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Room', roomSchema);