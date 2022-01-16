// references:
// https://youtu.be/jD7FnbI76Hg
// https://youtu.be/-SpWOpdzUKw

const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const moment = require('moment');
const mongo = require('mongoose');
const {formatMessage, Msg} = require('./utils/messages');
// const User = require('./utils/users');

// connect to mongoDB
const mongoDB = "mongodb+srv://BestForJune:97l8fkq4GFhz'@cluster0.8wr4h.mongodb.net/messdata?retryWrites=true&w=majority";
mongo.connect(mongoDB).then(()=>{
    console.log('mongoDB connected');
}).catch(err => console.log(err));

// connect to front-end server
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.static("public"));
// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/public/main.html'));
  });

// connec to socket.io
io.on('connection', socket=>{
    // to incoming user socket.emit();
    // to all users in the room io.emit();
    // everyone except the incoming user socket.broadcast.emit();

    // show previous chat message when enter
    Msg.find().then((result)=>{
        socket.emit('new-user-message', result);
    });

    // show user input message
    socket.on('chatMessage', ({msg, uname})=>{
        const time = moment().format('YYYY-MM-DD HH:mm');
        // save the information to database
        const message = new Msg({msg, uname, time});
        message.save().then(()=>{
            io.emit('message', formatMessage(uname, msg,time));
        })
    });
});

const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);