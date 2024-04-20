import React,{useState} from "react";
import './SignupForm.css'
import { signupAction } from "../../Actions/SignupAction";
import {useDispatch,useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom'


const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {authData,loading,error} = useSelector(state=>state.AuthReducer);
  console.log(loading);
  const handleSignup = (e)=>{
    e.preventDefault();
    if(!email || !name|| !userName || !password){
      return;
    }
    const signupData = {
      email,
      name,
      userName,
      password,
    }
    dispatch(signupAction(signupData))
  }
  const[email,setEmail] = useState('');
  const[name,setName] = useState('');
  const[userName,setUserName] = useState('');
  const[password,setPassword]=useState('');
  return <div className="signup-component">
    <form onSubmit={handleSignup} className="signup-form">
      <div className="logo">
        <div>
        <h2 className="logo-text">Ginger</h2><h2 className="logo-text">Chat</h2>
        </div>
        <span>Signup to chat with your friends.</span>
      </div>
    
      <div className="inputs">
      <div className="email-input">
        <input value={email} onChange={(e)=>{
       setEmail(e.target.value)
        }} type="email" placeholder="Email"  required/>
      </div>
      <div className="name-input">
        <input value={name} onChange={(e)=>{
          setName(e.target.value)
        }} type="text" placeholder="Full Name"  required/>
      </div>
      <div className="username-input">
        <input value={userName} onChange={(e)=>{
          setUserName(e.target.value)
        }}  type="text" placeholder="Username"  required/>
      </div>
      <div className="password-input">
        <input value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }}  type="password" placeholder="Password"  required/>
      </div>
      {/* <div className="gender-input">
        <div>
        <input checked = {gender === 'male'} onChange={()=>{
          setGender('male')
        }} type="radio" value='male' name="gender" id="male" required/>
        <label htmlFor="male">Male</label>
        </div>
        <div>
        <input checked = {gender === 'female'} onChange={()=>{
          setGender('female')
        }} type="radio" value="female" name="gender" id="female" required/>
        <label htmlFor="female">Female</label>
        </div>
      </div> */}
      </div>
      <div className="signup-button">
        
       <button onClick={handleSignup} disabled = {loading}>{loading?"signing in...":'Signup'}</button>
      </div>
    
    </form>
    <div className="redirect-to-login">
      <span>Already have an account?</span>
      <span onClick={()=>{
        navigate('/login')
      }}>Login</span>
    </div>
  </div>;
};

export default SignupForm;
