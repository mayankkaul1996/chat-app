import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './Join.css';

const Join = () =>{ 

     const [name, setName] = useState('');
     const [room, setRoom] = useState('');

     const userData = JSON.parse(localStorage.getItem('user'));
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
                         <button className="button mt-20" type="submit">Sign In</button>
                    </Link>

                </div>
                </div>

           </div>

     )
};

export default Join;