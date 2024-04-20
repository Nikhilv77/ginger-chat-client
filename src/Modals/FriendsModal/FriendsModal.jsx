import React, { useEffect, useState } from "react";
import './FriendsModal.css'
import { getAllUsers } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import selfieImage from '../../Images/selfie.jpg'
const FriendsModal = ({setFriendsModal}) => {
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
  return <div className="friends-modal">
    <div className="friends-modal-container">
    <h2>Friends</h2>
<i onClick={()=>setFriendsModal(false)} class="ri-close-large-line"></i>
{loadingComments && <ClipLoader color={"#fff"} size={40}/>}
<div className="friends-modal-items">
 
  {allUsers.map(user=>{
    return (<><div className="friends-modal-item">
      <img src={selfie} alt="" />
      <div className="friends-modal-item-description">
        <div className="friends-modal-item-names">
      <p>{user.name}</p>
      <p>@{user.userName}</p>
      </div>
      <span>Hi, there I am a good person, I like travelling and eating good food. You can always add me as friend. See you soon.</span>
      </div>
        <button>Unfriend</button>
    </div>
    <hr id="friend-item-hr" />
    </>
    )
  })}
  </div>
  </div>
  </div>;
};

export default FriendsModal;
