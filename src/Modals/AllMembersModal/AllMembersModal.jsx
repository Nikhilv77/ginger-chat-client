import React, { useEffect, useState } from "react";
import './AllMembersModal.css'
import { getAllUsers } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import selfieImage from '../../Images/selfie.jpg'
const AllMembersModal = ({setShowMembersModal}) => {
  const[allUsers,setAllUsers] = useState([]);
  const[loadingComments,setLoadingComments] = useState(false);
  const[selfie,setSelfie] = useState(null);
  useEffect(()=>{
  async function getAllUsersFn(){
    setLoadingComments(true)
    try {
      const response = await getAllUsers();
      setAllUsers(response.data);
      setSelfie(selfieImage)
    } catch (error) {
      console.log(error);
    }
    setLoadingComments(false)
  }
    getAllUsersFn();
  },[])
  return <div className="all-members-modal">
    <div className="all-members-modal-container">
    <h2>Find Friends</h2>
<i onClick={()=>setShowMembersModal(false)} class="ri-close-large-line"></i>
{loadingComments && <ClipLoader color={"#fff"} size={40}/>}
<div className="all-members-modal-items">
 
  {allUsers.map(user=>{
    return (<div className="all-members-modal-item">
      <img src={selfie} alt="" />
      <div className="all-members-modal-item-description">
        <div className="all-members-modal-item-names">
      <p>{user.name}</p>
      <p>@{user.userName}</p>
      </div>
      <span>Hi, there I am a good person, I like travelling and eating good food. You can always add me as friend. See you soon.</span>
      </div>
        <button>Add as friend</button>
    </div>
    )
  })}
  </div>
  </div>
  </div>;
};

export default AllMembersModal;
