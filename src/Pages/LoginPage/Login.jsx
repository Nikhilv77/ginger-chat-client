import React from "react";
import './Login.css'
import LoginForm from "../../Components/LoginForm/LoginForm";
import LoginImage from '../../Components/LoginImage/LoginImage'

const Login = () => {
  return <div className="login">
    <div className="login-container">
    <LoginImage/>
    <LoginForm/>
  </div>
  </div>;
};

export default Login;
