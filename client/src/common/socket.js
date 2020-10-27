import io from 'socket.io-client';

const ENDPOINT = `${process.env.REACT_APP_ENDPOINT}`;
debugger;

let socket;

const connect  = () => {
    return socket = io(ENDPOINT);
};

export const getSocket = ()=>{
    if(socket) return socket;

    return connect();
}