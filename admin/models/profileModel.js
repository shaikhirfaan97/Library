const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userInfoSchema = new Schema({
 
    admission:{
        type: String,
        default:""
    },
    gender:{
        type: String,
        required: true

    },
    bloodGroup:{
        type: String,
        required: true

    },
    emergencyContact:{
        type: Number,
        required: true

    },
    address:{
        type: String,
        required: true

    },
    user_id:{
        type: String,
        required: true
    }
})

const UserInfo = mongoose.model('User Info', userInfoSchema);
module.exports = UserInfo;