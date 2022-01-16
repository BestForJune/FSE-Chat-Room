const chatMessage = document.getElementById('send-container');
const {uname, psw} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// get message from server
const socket = io();
socket.on('message', message=>{
    outputMessage(message);
});
// get messages from database and show them
socket.on('new-user-message', result=>{
    if (result.length){
        result.forEach(message=>{
            outputMessage(message);
        })
    }
});

// send chat message
chatMessage.addEventListener('submit', (e)=>{
    // avoid generting a new file
    e.preventDefault();
    // get user's input messag and emit it to server
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', ({msg, uname}));

    // clear input text box
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// output message to the chat room
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = '<p class = "name">'+message.uname+'<span> '+message.time+'</span></p><p class="text">'+message.msg+'</p>';
    const Message = document.querySelector('.chat-message');
    Message.appendChild(div);

    // scroll down
    Message.scrollTop = Message.scrollHeight;
}