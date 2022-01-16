const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    uname:{
        type:String,
        required:true
    },
    psw:{
        type:String,
        required:true
    }
})
const User = mongoose.model('user', userSchema);

module.exports = User;