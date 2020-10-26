import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { Link } from 'react-router-dom';
import axios from 'axios';


import './Login.css';
import Flash from '../Flash/Flash';
import Loader from '../Loader/Loader';


const endPoint = process.env.REACT_APP_ENDPOINT;
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;




const Login = () =>{ 

	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onSuccess = async (res) => {
		console.log('[Login Success] currentUser : ', res.profileObj);
		let loginResponse = await axios.post(`${endPoint}/chat/api/v1/auth/googleLogin`, {token : res.tokenObj.id_token});
		// window.flash(loginResponse.data.msg, 'success');
		localStorage.setItem('user', JSON.stringify(loginResponse.data.data));
		window.location.href='/join'
    };

    const onFailure = (res) => {
        console.log('[Login Failed] res : ', res);
	};
	
	const login	 = async () => {
		let data = await axios.get(`${endPoint}/chat/api/v1/auth/login`);
	};

    return (
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form">
					<span className="login100-form-title p-b-26">
						Welcome
					</span>
					<span className="login100-form-title p-b-48">
						<i className="zmdi zmdi-font"></i>
					</span>
					<div className="wrap-input100 validate-input m-b-23" data-validate = "Phone Number is required">
						<span className="label-input100">Phone Number</span>
						<input className="input100" type="text" name="phone" placeholder="Type your Phone Number" onChange={ event => setPhone(event.target.value) } />
						<span className="focus-input100 control-label"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Password is required">
						<span className="label-input100">Password</span>
						<input className="input100" type="password" name="pass" placeholder="Type your password" onChange={ event => setPassword(event.target.value) } />
						<span className="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div className="container-login100-form-btn">
						<div className="wrap-login100-form-btn">
							<div className="login100-form-bgbtn"></div>
							<Link onClick={console.log(phone, password)}>
							<button className="login100-form-btn" onClick={login}>
								Login
							</button>
							</Link>
						</div>
					</div>


                    <div className="googleLoginOuterContainer text-center">
                        <GoogleLogin className="googleLoginInnerContainer" clientId={clientId} buttonText="Login using Google" onSuccess={onSuccess} onFailure={onFailure} cookiePolicy={'single_host_origin'} isSignedIn={false} />
					</div>
				</form>
			</div>
		</div>
		</div>
	);

};

export default Login;