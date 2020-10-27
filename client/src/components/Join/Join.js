import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { v1 as uuid } from "uuid";


import './Join.css';

const Join = (props) =>{ 

     const [name, setName] = useState('');
     const [room, setRoom] = useState('');

     const userData = JSON.parse(localStorage.getItem('user'));

     const createVideoChatRoom = () => {
          const id = uuid();
          props.history.push(`/room/${id}`);
     }


     return (
           <div className="joinOuterContainer">
             <div className="joinMainContainer">
             <div className="joinHeader card card-stats">
             <h1 className="joinHeaderName">{userData.name}</h1>
             </div>
                <div className="joinInnerContainer">


                    <h1 className="joinheading">Join</h1>

                    <div><input placeholder="Name" className="joinInput" type="text" onChange={ event => setName(event.target.value) } /></div>

                    <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={ event => setRoom(event.target.value) } /></div>

                    <Link onClick={ event=>( !name || !room ) ? event.preventDefault() : null } to={`/chat?name=${name}&room=${room}`}>
                         <button className="button mt-20" type="submit">Join Text Chat</button>
                    </Link>

                    <div>
                    <button className="button mt-20" type="submit" onClick={createVideoChatRoom}>Join Video Chat</button>
                    </div>

                </div>
                </div>

           </div>

     )
};

export default Join;