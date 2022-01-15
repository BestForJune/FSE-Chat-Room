const http = require('http');
const express = require('express');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.static("public"));
// default URL for website
app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'/public/index.html'));
  });

io.on('connection', socket=>{
    // to incoming user socket.emit();
    // to all users in the room io.emit();
    // everyone except the incoming user socket.broadcast.emit();
    
    // listen for user input chat message
    socket.on('chatMessage', (msg)=>{
        io.emit('message',msg);
    });
});

const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);