import React, { useState } from 'react'
import './LoginForm.css'
import showPasswordImage from '../../Images/show-password.png'
import hidePasswordImage from '../../Images/hide-password.png'
import {useNavigate} from 'react-router-dom'
import {loginAction} from '../../Actions/LoginAction'
import {useDispatch,useSelector} from 'react-redux'

const LoginForm = () => {
  const dispatch = useDispatch();
  const{loading,error,authData} = useSelector(state=>state.AuthReducer)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const LoginHander = (e)=>{
    e.preventDefault();
    if(!email || !password){
      return
    }
    dispatch(loginAction({email,password}))
  }
  return (
    <div className="login-component">
      <form onSubmit={LoginHander} className="login-form">
        <div className="logo">
          <div>
            <h2 className="logo-text">Ginger</h2>
            <h2 className="logo-text">Chat</h2>
          </div>
          <span>Login to chat with your friends.</span>
        </div>

        <div className="inputs">
          <div className="email-input">
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              type="text"
              placeholder="email"
            />
          </div>
          <div className="password-input">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
          { password && <img
              onClick={() => {
                setShowPassword(!showPassword)
              }}
              src={showPassword ? hidePasswordImage : showPasswordImage}
              alt=""
            />}
          </div>
        </div>
        <div className="login-button">
          <button type='submit'  disabled = {loading}>{loading? 'loging in...' : 'Log in'}</button>
        </div>
        <div className="forgot-password">
          <span>Forgot Password?</span>
        </div>
      </form>
      <div className="redirect-to-signup">
        <span>Don't have an account?</span>
        <span onClick={()=>{
          navigate('/signup')
        }}>Sign up</span>
      </div>
    </div>
  )
}

export default LoginForm
