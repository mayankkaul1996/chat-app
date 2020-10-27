const socketio = require('socket.io');
const io = socketio(server);
const socketIOServices = require('./socket.io.service');

const rooms = {};

io.on('connection', (socket) => {

    console.log('We have a new connection');

    socket.on('join', ({ name, room }, callback) => {

        const userDetails = socketIOServices.addSocketConnection({ id: socket.id, name, room });

        //if (error) return callback(error);

        //send message to the user who has joined
        socket.emit('message', { user: { name: 'admin', room: -1, id: -1 }, text: `${userDetails.name}, welcome to the room ${userDetails.room}` });

        //send message to the other users who are in the room except the new user who has just joined
        socket.broadcast.to(userDetails.room).emit('message', { user: { name: 'admin', room: -1, id: -1 }, text: `${userDetails.name}, has joined the room` });

        socket.join(userDetails.room);

        io.to(userDetails.room).emit('roomData', { room: userDetails.room, users: socketIOServices.getSocketsInRoom(userDetails.room) });

        callback();

    });

    socket.on('sendMessage', (message, callback) => {

        const connectionDetails = socketIOServices.getSocketConnectionDetails(socket.id);

        io.to(connectionDetails.room).emit('message', { user: connectionDetails, text: message });

        callback();

    });

    socket.on('disconnect', () => {

        console.log('User had left');
        rooms.splice(rooms.indexOf(socket.id), 1);
        console.log('disconnect', rooms);
        //const connection = socketIOServices.removeSocketConnection(socket.id);

        // if (connection) {

        //     io.to(connection.room).emit('message', { user: { name: 'admin', room: -1, id: -1 }, text: `${connection.name}, has left the room` });

        //     io.to(connection.room).emit('roomData', { room: connection.room, users: socketIOServices.getSocketsInRoom(connection.room) });
        // }

    });

    //for video chat
    //ToDo :- modularize it
    socket.on("join room", roomID => {
        console.log('join room', JSON.stringify(rooms));
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

    socket.on("offer", payload => {
        console.log('offer', JSON.stringify(rooms));

        io.to(payload.target).emit("offer", payload);
    });

    socket.on("answer", payload => {
        console.log('answer', JSON.stringify(rooms));

        io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", incoming => {
        console.log('ice-candidate', JSON.stringify(rooms));

        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });

});