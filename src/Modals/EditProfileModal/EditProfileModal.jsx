import React, { useEffect, useState } from "react";
import './EditProfileModal.css'
import { getAllUsers } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import selfieImage from '../../Images/selfie.jpg'
const EditProfileModal = ({setShowEditAccount}) => {
  const [about, setAbout] = useState('');
  const characterLimit = 120;
  const handleChange = (event) => {
    const text = event.target.value;
    const chars = text.length;
    if (chars <= characterLimit) {
      setAbout(text);
    } 
  };
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
    <h2>Update your profile</h2>
<i onClick={()=>setShowEditAccount(false)} class="ri-close-large-line"></i>
{loadingComments && <ClipLoader color={"#fff"} size={40}/>}
<div className="edit-profile-modal-items">
 <div className="edit-profile-modal-image">
  <img src={selfie} alt="" />
  <i class="ri-image-edit-fill"></i>
 </div>
<form className="edit-profile-modal-form">
<div className="edit-name-input">
  <label htmlFor="user-name-input">Name</label>
  <input type="text" id="user-name-input" />
</div>
<div className="edit-user-name-input">
  <label htmlFor="edit-user-name-input">User name</label>
  <input type="text" id="edit-user-name-input" />
</div>
<div className="edit-lives-in">
    <label htmlFor="edit-lives-in">Lives in</label>
    <input type="text" id="edit-lives-in" />
</div>
<div className="edit-about">
    <label htmlFor="edit-about">About</label>
     <textarea id="edit-about" cols="30" rows="8" value={about} onChange={handleChange}></textarea>
</div>
<span>{`${about.length}/${characterLimit}`}</span>
<button>Forgot Password</button>
<button>Update</button>
</form>
  </div>
  </div>
  </div>;
};

export default EditProfileModal;
