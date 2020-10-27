import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import Flash from './components/Flash/Flash';
import Bus from './utils/bus';
import Room from './components/Chat/VideoChat/VideoChat';

const App = () => {

    window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));

    return (

   
        <div className="App">
            <Flash />
            <Router>
                <Route path="/" exact component={Login}/>
                <Route path="/join" exact component={Join}/>
                <Route path="/chat" component={Chat}/>
                <Route path="/room/:roomId" component={Room} />
            </Router>
        </div>
    
);
}


export default App;