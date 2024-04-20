import React, { useEffect, useState } from "react";
import './EditProfileModal.css'
import { getAllUsers } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import selfieImage from '../../Images/selfie.jpg'
const EditProfileModal = ({setFriendRequestsModal}) => {
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
  return <div className="edit-profile-modal">
    <div className="edit-profile-modal-container">
    <h2>Friend Requests</h2>
<i onClick={()=>setFriendRequestsModal(false)} class="ri-close-large-line"></i>
{loadingComments && <ClipLoader color={"#fff"} size={40}/>}
<div className="edit-profile-modal-items">
 
  {allUsers.map(user=>{
    return (<div className="edit-profile-modal-item">
      <img src={selfie} alt="" />
      <div className="edit-profile-modal-item-description">
        <div className="edit-profile-modal-item-names">
      <p>{user.name}</p>
      <p>@{user.userName}</p>
      </div>
      <span>Hi, there I am a good person, I like travelling and eating good food. You can always add me as friend. See you soon.</span>
      </div>
      <div className="edit-profile-button">
        <button>Accept</button>
        <button>Decline</button>
        </div>
    </div>
    )
  })}
  </div>
  </div>
  </div>;
};

export default EditProfileModal;
