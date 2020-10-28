const socketConstants = require('./socket.io.constants');
const socketIOServices = require('./socket.io.service');

const rooms = {};

class SocketEvents {

    static textChatInit(io) {
        try {

            io.of(socketConstants.socketNameSpaces.TEXT).on('connection', (socket) => {

                console.log(`We have a new ${socketConstants.socketNameSpaces.TEXT} connection`);

                socket.on('join', ({ name, room }, callback) => {

                    const userDetails = socketIOServices.addSocketConnection({ id: socket.id, name, room, type: 'TEXT' });

                    //if (error) return callback(error);

                    //send message to the user who has joined
                    socket.emit('message', { user: { name: 'admin', room: -1, id: -1 }, text: `${userDetails.name}, welcome to the room ${userDetails.room}` });

                    //send message to the other users who are in the room except the new user who has just joined
                    socket.broadcast.to(userDetails.room).emit('message', { user: { name: 'admin', room: -1, id: -1 }, text: `${userDetails.name}, has joined the room` });

                    socket.join(userDetails.room);

                    io.of(socketConstants.socketNameSpaces.TEXT).to(userDetails.room).emit('roomData', { room: userDetails.room, users: socketIOServices.getSocketsInRoom(userDetails.room, 'TEXT') });

                    callback();

                });

                socket.on('disconnect', () => {

                    const connection = socketIOServices.removeSocketConnection(socket.id, 'TEXT');

                    if (connection) {

                        io.of(socketConstants.socketNameSpaces.TEXT).to(connection.room).emit('message', { user: { name: 'admin', room: -1, id: -1 }, text: `${connection.name}, has left the room` });

                        io.of(socketConstants.socketNameSpaces.TEXT).to(connection.room).emit('roomData', { room: connection.room, users: socketIOServices.getSocketsInRoom(connection.room, 'TEXT') });
                    }

                });

                socket.on('sendMessage', (message, callback) => {

                    const connectionDetails = socketIOServices.getSocketConnectionDetails(socket.id, 'TEXT');

                    io.of(socketConstants.socketNameSpaces.TEXT).to(connectionDetails.room).emit('message', { user: connectionDetails, text: message });

                    callback();

                });

            });

        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    static videoChatInit(io) {
        try {

            //for video chat
            io.of(socketConstants.socketNameSpaces.VIDEO).on('connection', (socket) => {

                console.log(`We have a new ${socketConstants.socketNameSpaces.VIDEO} connection`);

                socket.on('disconnect', () => {

                    const connection = socketIOServices.removeSocketConnection(socket.id, 'VIDEO');

                    if (connection) {

                        io.of(socketConstants.socketNameSpaces.VIDEO).to(connection.room).emit('message', { user: { name: 'admin', room: -1, id: -1 }, text: `${connection.name}, has left the room` });

                        io.of(socketConstants.socketNameSpaces.VIDEO).to(connection.room).emit('roomData', { room: connection.room, users: socketIOServices.getSocketsInRoom(connection.room, 'VIDEO') });
                    }

                });

                //ToDo :- modularize it
                socket.on("join room", roomID => {

                    socketIOServices.addSocketConnection({ id: socket.id, name: socket.id, room: roomID, type: 'VIDEO' });

                    let otherUsers = socketIOServices.getSocketsInRoom(roomID, 'VIDEO');

                    otherUsers = otherUsers.filter(user => user.id != socket.id);
                    otherUsers = otherUsers.map(x => x.id);

                    if (otherUsers && otherUsers.length > 0) {
                        socket.emit("other user", otherUsers);
                        socket.to(otherUsers).emit("user joined", socket.id);
                    }
                });

                socket.on("offer", payload => {
                    io.of(socketConstants.socketNameSpaces.VIDEO).to(payload.target).emit("offer", payload);
                });

                socket.on("answer", payload => {
                    io.of(socketConstants.socketNameSpaces.VIDEO).to(payload.target).emit("answer", payload);
                });

                socket.on("ice-candidate", incoming => {
                    io.of(socketConstants.socketNameSpaces.VIDEO).to(incoming.target).emit("ice-candidate", incoming.candidate);
                });

                socket.on('disconnect', () => {

                    const connection = socketIOServices.removeSocketConnection(socket.id, 'VIDEO');
                    console.log(connection);
                    // if (connection) {

                    //     io.of(socketConstants.socketNameSpaces.TEXT).to(connection.room).emit('message', { user: { name: 'admin', room: -1, id: -1 }, text: `${connection.name}, has left the room` });

                    //     io.of(socketConstants.socketNameSpaces.TEXT).to(connection.room).emit('roomData', { room: connection.room, users: socketIOServices.getSocketsInRoom(connection.room, 'TEXT') });
                    // }

                });

            });

        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = SocketEvents;