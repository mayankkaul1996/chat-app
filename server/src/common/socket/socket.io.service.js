const userServices = require('../../modules/users/users');


class SocketIOServices {

    static addSocketConnection(connectionDetails) {
        try {

            return userServices.addUser(connectionDetails);

        } catch (err) {
            console.error('[CHAT] SocketIOServices : addSocketConnection : ', err);
            throw err;
        }
    }

    static getSocketConnectionDetails(connectionId) {
        try {

            return userServices.getUser(connectionId);

        } catch (err) {
            console.error('[CHAT] SocketIOServices : getSocketConnectionDetails : ', err);
            throw err;
        }
    }

    static removeSocketConnection(connectionId) {
        try {

            return userServices.removeUser(connectionId);

        } catch (err) {
            console.error('[CHAT] SocketIOServices : removeSocketConnection : ', err);
            throw err;
        }
    }

    static getSocketsInRoom(room) {
        try {

            return userServices.getUsersInRoom(room);

        } catch (err) {
            console.error('[CHAT] SocketIOServices : removeSocketConnection : ', err);
            throw err;
        }
    }

}

module.exports = SocketIOServices;