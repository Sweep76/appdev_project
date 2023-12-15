import React, {useState} from 'react'
import './Login.css'
import '../../App.scss'
import {Link, useNavigate} from 'react-router-dom'
import Axios from 'axios'

import video from '../../LoginAssets/video.mp4'
import logo from '../../LoginAssets/logo.png'


//Imported Icons
import {FaUserShield} from 'react-icons/fa'
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";



const Login = () => {
  // Usestate Hook to store inputs
  const [loginUserName, setLoginUserName] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const navigateTo = useNavigate()

  // Onclick let us get what the user has entered
  const loginUser = (e) => {
    // Lets prevent submitting
    e.preventDefault();
    // We shall require Axios to create an API that connects to the server
    // Lets install it
    Axios.post('http://localhost:3002/login', {
        // create variable to send to the server through the route
        LoginUserName: loginUserName,
        LoginPassword: loginPassword
    }).then((response) => {
        console.log()
        // I want to catch the response first - We have data successfully from the database
      if(response.data.message){
        // if credential dont match
        navigateTo('/') // so we shall navigate to the same login page
      }
      else{
        navigateTo('/dashboard') // if the credentials match, user goes to dashboard
      }
    })
  }  

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
          <button className='btn'>Sign Up</button>
          </Link>
        </div>
        </div>

        {/* <div className="footerDiv flex">  
          <span className="text">Don't have an account?</span>
          <Link to={'/register'}>
          <button className='btn'>Sign Up</button>
          </Link>
        </div> */}

      </div>

      <div className="formDiv flex">
        <div className="headerDiv">
          <img src={logo} alt="Logo Image" />
          <h1>Welcome Back!</h1>
        </div>

        <form action="" className='form grid'>
          {/* <span className='message'>Login Status will go here</span> */}

          <div className="inputDiv">
            <label htmlFor="username">Username</label>
            <div className="input flex">
              <FaUserShield className='icon'/> 
              <input type="text" id='username' placeholder='Enter Username'
              onChange={(event)=>{
                setLoginUserName(event.target.value) 
              }}/>
            </div>
          </div>

          <div className="inputDiv">
            <label htmlFor="password">Password</label>
            <div className="input flex">
              <BsFillShieldLockFill className='icon'/> 
              <input type="password" id='password' placeholder='Enter Password'
              onChange={(event)=>{
                setLoginPassword(event.target.value) 
              }}/>
            </div>
          </div>

        <button type='submit' className='btn flex' onClick={loginUser}>
          <span>Login </span>
          <AiOutlineSwapRight className='icon'/>
        </button>

        <a href='/dashboard'>Dashboard</a>

        <span className='forgotPassword'>
          Forgot Password? <a href=''>Click Here</a>
        </span>
        </form>
      </div>

    </div>
    </div>
  )
}

export default Login