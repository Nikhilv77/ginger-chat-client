import React from "react";
import './OtherProfileModal.css';
import selfieImage from '../../Images/selfie.jpg'
const OthersProfileModal = ({setShowOthersProfileModal}) => {
  const openLogoutModelHandler = ()=>{
    setShowOthersProfileModal(false)
    document.getElementsByClassName('logout-modal')[0].style.display = 'grid'
  }
  return <div className="others-profile-modal">
  
<div className="others-profile-modal-container">
<i onClick={()=>setShowOthersProfileModal(false)} class="ri-close-large-line"></i>
<div className="others-profile-modal-container-image-actions-container">
  <div className="others-names">
  <h2>Snehal Khandelwal</h2>
  <span>@snehal</span>
  </div>
  <img src={selfieImage} alt="" />
  <p>Hi, I am Nikhil. I like builing cool stuff, playing chess and enjoy travelling new places. Send me a chat.</p>
  <div className="others-location">
  <i class="ri-map-pin-user-fill"></i>
  <span>Panvel</span>
  </div>
  <div className="others-number-of-friends">
    <span>4332 Friends</span>
  </div>
  <div className="others-delete-update-actions">
    <button onClick={()=>{
      setShowOthersProfileModal(false)
      document.getElementsByClassName('delete-account-modal')[0].style.display = "grid"
    }}>Add as Friend</button>
  </div>
</div>
</div>

</div>
; 
};

export default OthersProfileModal;
