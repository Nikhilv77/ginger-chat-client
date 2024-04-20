import React, { useState } from "react";
import './Navbar.css'
import gchatLogo from '../../Images/gc-logo.png'
import { useNavigate } from "react-router-dom";
import MyPostsModal from "../../Modals/MyPostsModal/MyPostsModal";
import ProfileModal from "../../Modals/ProfileModal/ProfileModal";
import FriendsModal from '../../Modals/FriendsModal/FriendsModal'



const Navbar = () => {
  const[showMyPosts,setShowMyPosts] = useState(false)
  const[showProfileModal,setShowProfileModal] = useState(false)
  const[friendsModal,setFriendsModal] = useState(false)
  const navigate = useNavigate();
  const handleNavbarShow = () => {
    document.getElementsByClassName('slider-modal')[0].style.top = 0;
  }
  const handleCloseNavbar = () => {
    document.getElementsByClassName('slider-modal')[0].style.top = '-100%';
  }
  const openAllMembersModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('all-members-modal')[0].style.left = '50%'
  }
  const openProfileModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('profile-modal')[0].style.left = '50%'
  }

  const opendeleteAccountModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('delete-account-modal')[0].style.display = '50%'
  }
  const openfriendsModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('friends-modal')[0].style.left = '50%'
  }
  const openfriendRequestsModalHandler = ()=>{
    handleCloseNavbar();
    document.getElementsByClassName('friend-requests-modal')[0].style.left = '50%'
  }
  return<> 
  {showMyPosts && <MyPostsModal setShowMyPosts={setShowMyPosts}/>}
  {showProfileModal && <ProfileModal setShowProfileModal={setShowProfileModal}/>}
  {friendsModal && <FriendsModal setFriendsModal={setFriendsModal}/>}
  <div className="navbar">
   <img src={gchatLogo} alt="" />
   <i onClick={handleNavbarShow} class="ri-menu-line"></i> 
   <div className="desktop-items">
   <i title="home" onClick={()=>
    navigate('/')} class="ri-home-4-fill"></i>
      <i title="chat" onClick={()=>navigate('/chat')} class="ri-chat-heart-fill"></i>
    <i title="friends" onClick={()=>setFriendsModal(true)} class="ri-user-smile-fill"></i>
    <i title="posts" onClick={()=>setShowMyPosts(true)} class="ri-gallery-line"></i>
    <i title="profile" onClick={()=>setShowProfileModal(true)} class="ri-id-card-fill"></i>
   </div>
  
<div className="slider-modal">
<i onClick={handleCloseNavbar} class="ri-close-large-line"></i>
<div className="items">
  <div className="item">
  <i onClick={()=>{
    handleCloseNavbar();
    navigate('/')}} class="ri-home-4-fill"></i>
    <p>Home</p>
  </div>
  
  <div className="item">
  <i onClick={openAllMembersModalHandler} class="ri-group-fill"></i>
    <p>All Members</p>
  </div>
  <div className="item">
  <i onClick={openProfileModalHandler} class="ri-id-card-fill"></i>
    <p>My Profile</p>
  </div>
  <div className="item">
  <i onClick={()=>setShowMyPosts(true)} class="ri-gallery-line"></i>
    <p>My posts</p>
  </div>
  <div className="item">
  <i onClick={()=>navigate('/chat')} class="ri-chat-heart-fill"></i>
    <p>My Chats</p>
  </div>
  <div className="item">
  <i onClick={openfriendsModalHandler} class="ri-user-smile-fill"></i>
    <p>My Friends</p>
  </div>
  <div className="item">
  <i onClick={openfriendRequestsModalHandler} class="ri-chat-new-line"></i>
    <p>Friend Requests</p>
  </div>
  <div className="item">
  <i class="ri-logout-box-r-fill"></i>
    <p>Logout</p>
  </div>
  <div className="item">
  <i onClick = {opendeleteAccountModalHandler}class="ri-delete-bin-fill"></i>
    <p>Delete Account</p>
  </div>
</div>
</div>
  </div>
  </>;
};

export default Navbar;
