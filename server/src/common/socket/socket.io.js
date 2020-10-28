const socketio = require('socket.io');
const io = socketio(server);
const socketEvents = require('./socket.io.events');




if (!!+process.env.ENABLE_TEXT_CHAT) {
    socketEvents.textChatInit(io);
}

if (!!+process.env.ENABLE_VIDEO_CHAT) {
    socketEvents.videoChatInit(io);
}