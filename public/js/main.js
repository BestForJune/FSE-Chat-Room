const chatMessage = document.getElementById('send-container');

//message from server
const socket = io();
socket.on('message', (msg)=>{
    console.log(msg);
    outputMessage(msg);
});

// send chat message
chatMessage.addEventListener('submit', (e)=>{
    // avoid generting a new file
    e.preventDefault();
    // get user's input messag and emit it to server
    const msg = e.target.elements.msg.value;
    socket.emit('chatMessage', msg);
});

// output message to the chat room
function outputMessage(msg){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = '<p class = "name">XXX</p><p class="text">'+msg+'</p>';
    document.querySelector('.chat-message').insertBefore(div, document.querySelector('.chat-message').childNodes[0] || null);
}