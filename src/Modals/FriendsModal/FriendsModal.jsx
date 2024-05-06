import React, { useEffect, useState } from "react";
import './FriendsModal.css'
import { getAllUsers } from "../../Api/UserAPI";
import ClipLoader from "react-spinners/ClipLoader";
import defaultPicture from '../../Images/default-picture.jpg'
import OthersProfileModal from "../OtherProfileModal/OtherProfileModal";
import { socket } from "../../App";
import { useSelector } from "react-redux";
import { unfriendUser } from "../../Api/UserAPI";

const FriendsModal = ({ setFriendsModal }) => {
  const savedUser = useSelector(state => state.AuthReducer.authData.savedUser)
  const [previousRender, setPreviousRender] = useState(false);
  const [friendLoadingStates, setFriendLoadingStates] = useState({});
  const [friends, setFriends] = useState(null); // Maintain local copy of friends list

  useEffect(() => {
    socket.on(`receiving-accepting-request-${savedUser._id}`, () => {
      setPreviousRender(!previousRender);
    });
    socket.on(`receiving-unfriend-${savedUser._id}`, () => {
      setPreviousRender(!previousRender);
    });
  }, []);

  useEffect(() => {
    async function getAllUsersFn() {
      try {
        const response = await getAllUsers();
        const thisUser = response.data.filter(user => user._id === savedUser._id)[0];
        setFriends(response.data.filter(user => thisUser.friends.includes(user._id) && user.friends.includes(thisUser._id)));
      } catch (error) {
        console.log(error);
      }
    }
    getAllUsersFn();
  }, [previousRender]);

  const handleUnfriend = async (userId, friendId) => {
    setFriendLoadingStates(prevState => ({ ...prevState, [friendId]: true }));
    try {
      // Optimistically update the local friends list
      setFriends(prevFriends => prevFriends.filter(user => user._id !== friendId));
      // Perform unfriending operation
      await unfriendUser({ userId, friendId });
      socket.emit('notifying-unfriend', friendId);
      setFriendLoadingStates(prevState => ({ ...prevState, [friendId]: false }));
    } catch (error) {
      console.log(error);
      // If unfriending fails, revert the local friends list
      setFriends(prevFriends => [...prevFriends, { _id: friendId }]);
      setFriendLoadingStates(prevState => ({ ...prevState, [friendId]: false }));
    }
  };

  return (
    <>
      <div className="friends-modal">
        <div className="friends-modal-container">
          <h2>Friends</h2>
          <i onClick={() => setFriendsModal(false)} className="ri-close-large-line"></i>
          {friends === null ? <ClipLoader color={"#333"} size={40} /> :
            <div className="friends-modal-items">
              {friends.length === 0 ? (
                <div className="no-friends-data">
                  <i className="ri-emoji-sticker-fill"></i>
                  <span>You have no friends, get some friends</span>
                </div>
              ) : (
                friends.map(user => (
                  <div key={user._id} className="friends-modal-item">
                    <img src={user?.profilePicture === null ? defaultPicture : process.env.REACT_APP_PUBLIC_FOLDER + user?.profilePicture} alt="" />
                    <div className="friends-modal-item-description">
                      <div className="friends-modal-item-names">
                        <p onClick={() => setFriendsModal(true)}>{user?.name}</p>
                        <p>@{user?.userName}</p>
                      </div>
                      <span>{user?.about}</span>
                    </div>
                    <button onClick={() => handleUnfriend(savedUser._id, user._id)} disabled={friendLoadingStates[user._id]}>
                      {friendLoadingStates[user._id] ? <ClipLoader size={19} color="#fff" /> : "Unfriend"}
                    </button>
                  </div>
                ))
              )}
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default FriendsModal;
