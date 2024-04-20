import React from "react";
import SignupVideo from "../../Components/SignupVideo/SignupVideo";
import SignupForm from '../../Components/SignupForm/SignupForm'
import './Signup.css'

const Signup = () => {
  return <div className ="signup">
    <div className="signup-container">
   <SignupVideo/>
 <SignupForm/>
  </div>
  </div>;
};

export default Signup;
