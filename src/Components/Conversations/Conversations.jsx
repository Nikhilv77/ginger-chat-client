import { useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { getUser } from '../../Api/UserAPI';
import './Conversations.css';
import selfie from '../../Images/selfie.webp'


const Conversations = ({chat,currentUserId}) => {
  
  const[otherUsersData,setOtherUsersData] = useState([])
  
  useEffect(()=>{
    const otherUserId = chat?.members?.filter(id=>id!==currentUserId)[0]
   async function getotherUsers(){
    try {
      const{data} = await getUser(otherUserId)
      setOtherUsersData(data);
    } catch (error) {
      console.log(error);
    }
   
    }
    getotherUsers();
  },[])
  return <div className='conversation-top'>
  <div className="conversation">
    <img src={selfie} alt="" />
    <div className="conversation-information">
    <p>Riya Verma</p>
    <span>Online</span>
    </div>

  </div>
  {/* <hr className='conversation-hr' /> */}
  </div>;
};

export default Conversations;
