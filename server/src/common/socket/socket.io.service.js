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

    static getSocketConnectionDetails(connectionId, type) {
        try {

            return userServices.getUser(connectionId, type);

        } catch (err) {
            console.error('[CHAT] SocketIOServices : getSocketConnectionDetails : ', err);
            throw err;
        }
    }

    static removeSocketConnection(connectionId, type) {
        try {

            return userServices.removeUser(connectionId, type);

        } catch (err) {
            console.error('[CHAT] SocketIOServices : removeSocketConnection : ', err);
            throw err;
        }
    }

    static getSocketsInRoom(room, type) {
        try {

            return userServices.getUsersInRoom(room, type);

        } catch (err) {
            console.error('[CHAT] SocketIOServices : removeSocketConnection : ', err);
            throw err;
        }
    }

}

module.exports = SocketIOServices;