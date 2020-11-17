import React, { useState, useEffect } from 'react';
import queryString from 'query-string';

import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import { getSocket } from '../../common/socket';

const ENDPOINT = `${process.env.REACT_APP_ENDPOINT}`;
let socket;

const Chat = ({location}) => {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    

    useEffect(()=>{ 

        const { name, room } = queryString.parse(location.search);

        // socket = io(ENDPOINT);
        socket = getSocket('chat/text');
        setName(name);
        setRoom(room);
        // debugger;
        socket.emit('join', { name, room }, (error)=>{
            if(error) {
                alert(error);
              }
        });

        // return () => {

        //     socket.emit('disconnect');
        //     socket.off();

        // }

    }, [ENDPOINT, location.search]);

    // debugger;
    //for messages
    useEffect(()=>{
        // debugger;
        socket.on('message', message => {
            setMessages([ ...messages, message ]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });

    }, [messages]);

    //function for sending messages
    const sendMessage = (event)=>{

        event.preventDefault();
        if(message) socket.emit('sendMessage', message, () => setMessage(''));

    };

    console.log(message, messages);
    
    return (
            <div className="outerContainer">
                <div className="container">
                    <InfoBar className="chatInfoFar" room={room}/>
                    <Messages className="chatMessageSection"  messages={messages} name={name} />
                    <Input className="chatInputBox"  message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                </div>
                <TextContainer users={users}/>
            </div>
        );
};


export default Chat;