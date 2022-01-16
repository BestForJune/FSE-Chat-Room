// references:
// https://youtu.be/jD7FnbI76Hg
// https://youtu.be/-SpWOpdzUKw

const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    msg:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})
const Msg = mongoose.model('msg', msgSchema);

function formatMessage(uname, msg, time){
    return{
        uname,
        msg, 
        time
    }
}

module.exports = {
    formatMessage,
    Msg
}