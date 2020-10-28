import io from 'socket.io-client';

const ENDPOINT = `${process.env.REACT_APP_ENDPOINT}`;

let sockets = {};

const connect = (namespace) => {

    let serverEndPoint = `${ENDPOINT}${namespace ? '/' + namespace : ''}`;

    console.log('serverEndPoint', serverEndPoint);

    return io(serverEndPoint);

};

export const getSocket = (namespace) => {
    if ((namespace ? namespace : '/') in sockets) {
        return sockets[namespace];
    }

    return connect(namespace);

}