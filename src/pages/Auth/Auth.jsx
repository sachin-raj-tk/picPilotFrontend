import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logIn } from '../../actions/AuthAction.js'
import { signUp } from '../../api/AuthRequest'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'


const Auth = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [isSignUp, setSignUp] = useState(true)
  console.log(loading);
  const navigate = useNavigate()
  const [data, setData] = useState({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" })
  const [confirmPass, setConfirmPass] = useState(true)
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    
    if (isSignUp) {
      if(data.password === data.confirmpass){
       const response = await signUp(data)
       console.log(response.data.data,'evide response');
       navigate("/otpverification",{
        state:{
          registerationData: response.data.data
        }
       })
      }else{
        setConfirmPass(false)
      }
      // data.password === data.confirmpass ? await signUp(data) : setConfirmPass(false)
    }else{
      await dispatch(logIn(data))
      // if(response) toast.success(response);
      
    }
  }


  const resetForm = () => {
    setConfirmPass(true);
    setData({ firstname: "", lastname: "", username: "", password: "", confirmpass: "" })
  }
  return (
    <div className="Auth">

      {/* Left Side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Pic Pilot</h1>
          <h6>Give wings to your snaps</h6>
        </div>
      </div>

      {/* Right Side */}
      <div className="a-right">
        <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input type="text" placeholder='First Name' className="infoInput" name='firstname' onChange={handleChange} value={data.firstname}/>
              <input type="text" placeholder='Last Name' className="infoInput" name='lastname' onChange={handleChange} value={data.lastname}/>
            </div>
          )}
          <div>
            <input type="text" placeholder='UserName' className="infoInput" name='username' onChange={handleChange} value={data.username}/>

          </div>
          <div>
            <input type="password" placeholder='Password' className="infoInput" name='password' onChange={handleChange} value={data.password}/>
            {isSignUp && (
              <input type="password" placeholder='Confirm Password' className="infoInput" name='confirmpass' onChange={handleChange} value={data.confirmpass}/>
            )}
          </div>
          <span style={{ display: confirmPass ? "none" : "block", color: 'red', fontSize: '12px', alignSelf: 'flex-end', marginRight: '5px' }}>
            * Confirm password is not same
          </span>
          <div>

            <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => {setSignUp((prev) => !prev); resetForm()}}>{isSignUp ? "Already have an account. Login!" : "Don't have an account! Sign Up"}</span>
          </div>
          <button className="button infoButton" type='submit' disabled={loading}>{loading? "Loading...": isSignUp ? "Signup" : "Log In"}</button>
        </form>
      </div>


    </div>
  )
}






export default Auth