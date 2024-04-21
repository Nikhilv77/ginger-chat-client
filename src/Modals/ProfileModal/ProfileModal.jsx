import React, { useState } from "react";
import './ProfileModal.css';
import selfieImage from '../../Images/selfie.jpg';
import EditProfileModal from "../EditProfileModal/EditProfileModal";
const ProfileModal = ({setShowProfileModal}) => {
  const openLogoutModelHandler = ()=>{
    setShowProfileModal(false)
    document.getElementsByClassName('logout-modal')[0].style.display = 'grid'
  }
  const showEditModalHandler = ()=>{
    setShowEditAccount(true)
  }
  const[showEditAccount,setShowEditAccount] = useState(false);

  return <div className="profile-modal">
  {showEditAccount && <EditProfileModal setShowEditAccount={setShowEditAccount}/>}
<div className="profile-modal-container">
<i onClick={()=>setShowProfileModal(false)} class="ri-close-large-line"></i>
<div className="profile-modal-container-image-actions">
<div className="profile-modal-container-image-actions-container">
  <h2>My Profile</h2>
  <img src={selfieImage} alt="" />
  <p>Hi, I am Nikhil. I like builing cool stuff, playing chess and enjoy travelling new places. Send me a chat.</p>
  <div className="delete-update-actions">
    <button onClick={showEditModalHandler}>Edit Account</button>
    <button onClick={()=>{
      setShowProfileModal(false)
      document.getElementsByClassName('delete-account-modal')[0].style.display = "grid"
    }}>Delete Account</button>
  </div>
</div>
</div>
<div className="profile-modal-container-info">
  <div className="profile-information">
    <div className="profile-info-name">
    <h2>Name</h2>
    <p>Nikhil Verma</p>
    </div>
    <div className="profile-info-user-name">
      <h2>User Name</h2>
      <p>@nikhil</p>
    </div>
    <div className="profile-info-email">
      <h2>Email</h2>
      <p>nv581339@gmail.com</p>
    </div>
    <div className="profile-info-friends">
      <h2>Friends</h2>
      <p>443</p>
    </div>
    <div className="profile-info-friend-requests">
      <h2>Friend Requests </h2>
      <p>79</p>
    </div>
    <div className="profile-info-posts">
      <h2>Lives in</h2>
      <p>Panvel</p>
    </div>
   
  </div>
  <div>
    <button onClick={openLogoutModelHandler}>Logout</button>
  </div>
</div>
</div>
  </div>; 
};

export default ProfileModal;
