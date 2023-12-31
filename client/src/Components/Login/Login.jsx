/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
// /* eslint-disable no-unused-vars */
// import React, {useEffect, useState} from 'react'
// import './Login.css'
// import '../../App.scss'
// import {Link, useNavigate} from 'react-router-dom'
// import Axios from 'axios'

// import video from '../../LoginAssets/video.mp4'
// import logo from '../../LoginAssets/logo.png'


// //Imported Icons
// import {FaUserShield} from 'react-icons/fa'
// import { BsFillShieldLockFill } from "react-icons/bs";
// import { AiOutlineSwapRight } from "react-icons/ai";



// const Login = () => {


//   // Usestate Hook to store inputs
//   const [loginUserName, setLoginUserName] = useState('')
//   const [loginPassword, setLoginPassword] = useState('')
//   const navigateTo = useNavigate()

//   // Let us show the message to the user
//   const [loginStatus, setLoginStatus] = useState('')
//   const [statusHolder, setstatusHolder] = useState('message')


//   // Onclick let us get what the user has entered
//   const loginUser = (e) => {
//     e.preventDefault();

//     Axios.post('http://localhost:3002/login', {
//       LoginUserName: loginUserName,
//       LoginPassword: loginPassword,
//     }).then((response) => {
//       if (response.data.message || loginUserName === '' || loginPassword === '') {
//         navigateTo('/');
//         setLoginStatus(`Credentials Don't Exist!`);
//       } else if (loginUserName === 'admin' && loginPassword === 'admin') {
//         navigateTo('/admin');
//       } else {
//         // Extract the userID from the response data
//         const userID = response.data[0].id;

//         // Navigate to /dashboard and pass userID as a state parameter
//         navigateTo('/dashboard', { state: { userID } });
//       }
//     });
  
//   useEffect(() => {
//     if(loginStatus !== ''){
//       setstatusHolder('showMessage') // show message
//       setTimeout(() => {
//         setstatusHolder('message') // hide if after 4000ms or 4s
//     }, 4000);
//   }
//   }, [loginStatus])



// // Lets clear the form on submit
//   const onSubmit = () => {
//     setLoginUserName('')
//     setLoginPassword('')
//   }

//   return (
//     <div className="loginPage flex">
//     <div className="container flex">


//       <div className="videoDiv">
//         <video src={video} autoPlay muted loop></video> 
        
//         <div className="textDiv">
//           <h2 className="title">Task Manager</h2>
//           <p>Manage your time well! </p>
//           <br></br>
//           <div className="footerDiv flex">  
//           <span className="text">Don't have an account?</span>
//           <Link to={'/register'}>
//           <button className='btn'>Sign Up</button>
//           </Link>
//         </div>
//         </div>

//         {/* <div className="footerDiv flex">  
//           <span className="text">Don't have an account?</span>
//           <Link to={'/register'}>
//           <button className='btn'>Sign Up</button>
//           </Link>
//         </div> */}

//       </div>

//       <div className="formDiv flex">
//         <div className="headerDiv">
//           <img src={logo} alt="Logo Image" />
//           <h1>Welcome Back!</h1>
//         </div>

//         <form className='form grid' onSubmit={onSubmit}>
//           <span className={statusHolder}>{loginStatus}</span>

//           <div className="inputDiv">
//             <label htmlFor="username">Username</label>
//             <div className="input flex">
//               <FaUserShield className='icon'/> 
//               <input type="text" id='username' placeholder='Enter Username'
//               onChange={(event)=>{
//                 setLoginUserName(event.target.value) 
//               }}/>
//             </div>
//           </div>

//           <div className="inputDiv">
//             <label htmlFor="password">Password</label>
//             <div className="input flex">
//               <BsFillShieldLockFill className='icon'/> 
//               <input type="password" id='password' placeholder='Enter Password'
//               onChange={(event)=>{
//                 setLoginPassword(event.target.value) 
//               }}/>
//             </div>
//           </div>

//         <button type='submit' className='btn flex' onClick={loginUser}>
//           <span>Login </span>
//           <AiOutlineSwapRight className='icon'/>
//         </button>

//         <span className='forgotPassword'>
//           Forgot Password? <a href=''>Click Here</a>
//         </span>
//         </form>
//       </div>

//     </div>
//     </div>
//   )
// }

// export default Login;

import React, { useEffect, useState } from 'react';
import './Login.css';
import '../../App.scss';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

import video from '../../LoginAssets/video.mp4';
import logo from '../../LoginAssets/logo.png';

// Imported Icons
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
  const [loginUserName, setLoginUserName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigateTo = useNavigate();
  const [loginStatus, setLoginStatus] = useState('');
  const [statusHolder, setstatusHolder] = useState('message');

  const loginUser = (e) => {
    e.preventDefault();

    Axios.post('http://localhost:3002/login', {
      LoginUserName: loginUserName,
      LoginPassword: loginPassword,
    }).then((response) => {
      if (response.data.message || loginUserName === '' || loginPassword === '') {
        navigateTo('/');
        setLoginStatus(`Credentials Don't Exist!`);
      } else if (loginUserName === 'admin' && loginPassword === 'admin') {
        navigateTo('/admin');
      } else {
        const userID = response.data[0].id;
        navigateTo('/dashboard', { state: { userID } });
      }
    });
  };

  useEffect(() => {
    if (loginStatus !== '') {
      setstatusHolder('showMessage');
      setTimeout(() => {
        setstatusHolder('message');
      }, 4000);
    }
  }, [loginStatus]);

  const onSubmit = () => {
    setLoginUserName('');
    setLoginPassword('');
  };

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="videoDiv">
          <video src={video} autoPlay muted loop></video>

          <div className="textDiv">
            <h2 className="title">Task Manager</h2>
            <p>Manage your time well! </p>
            <br></br>
            <div className="footerDiv flex">
              <span className="text">Don't have an account?</span>
              <Link to={'/register'}>
                <button className="btn">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="formDiv flex">
          <div className="headerDiv">
            <img src={logo} alt="Logo Image" />
            <h1>Welcome Back!</h1>
          </div>

          <form className="form grid" onSubmit={onSubmit}>
            <span className={statusHolder}>{loginStatus}</span>

            <div className="inputDiv">
              <label htmlFor="username">Username</label>
              <div className="input flex">
                <FaUserShield className="icon" />
                <input
                  type="text"
                  id="username"
                  placeholder="Enter Username"
                  onChange={(event) => {
                    setLoginUserName(event.target.value);
                  }}
                />
              </div>
            </div>

            <div className="inputDiv">
              <label htmlFor="password">Password</label>
              <div className="input flex">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  onChange={(event) => {
                    setLoginPassword(event.target.value);
                  }}
                />
              </div>
            </div>

            <button type="submit" className="btn flex" onClick={loginUser}>
              <span>Login </span>
              <AiOutlineSwapRight className="icon" />
            </button>

            <span className="forgotPassword">
              Forgot Password? <a href="">Click Here</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
