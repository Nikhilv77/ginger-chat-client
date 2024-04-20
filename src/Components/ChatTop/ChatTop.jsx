import {useSelector} from 'react-redux'
import React from "react";
import "./ChatTop.css";
import { useEffect,useState } from "react";
import { getUser } from "../../Api/UserAPI";
import { getMessages } from "../../Api/MessageAPI";
import {format} from "timeago.js"
import InputEmoji from "react-input-emoji";
import { sendMessage } from "../../Api/MessageAPI";
import selfie from "../../Images/selfie.webp"

const ChatTop = ({currentChat,currentUserId,setSendMessage,receivedMessage}) => {
  console.log(receivedMessage,"received-message");
  const user = useSelector((state) => state.AuthReducer?.authData?.savedUser)

  const[otherUsersData,setOtherUsersData] = useState([])
  const[messages,setMessages] = useState([])
  const[newMessage,setNewMessage] = useState("")
  useEffect(()=>{
if(receivedMessage!==null && receivedMessage?.chatId === currentChat._id){
setMessages([...messages, receivedMessage])
}
  },[receivedMessage])
  useEffect(()=>{
    const otherUserId = currentChat?.members?.find(id=>id!==currentUserId)
   async function getotherUsers(){
    try {
      const{data} = await getUser(otherUserId)
      setOtherUsersData(data);
    } catch (error) {
      console.log(error);
    }
   
    }
    if(currentChat !==null)getotherUsers();
  },[currentChat,currentUserId])
useEffect(()=>{
  async function fetchMessages(){
    console.log("fired");
    const{data} = await getMessages(currentChat._id)
    setMessages(data)
  }
  if(currentChat!==null)fetchMessages();
},[currentChat])
console.log(messages,"messages");

const handleOnEnter = async(e)=>{

  const message = {
    senderId:currentUserId,
    text:newMessage,
    chatId:currentChat._id
  }
  const receiverId = currentChat?.members?.find(id=>id!==currentUserId)
  setSendMessage({...message,receiverId})
  setSendMessage({...message, receiverId})
  console.log(message,'newmessage');
  try {
    const{data} = await sendMessage(message)
    setMessages([...messages,data])
  } catch (error) {
    console.log(error);
  }

}

  return <div className="chat-top">
<div className="chat-top-upper">
  <img src={selfie} alt="" />
<p>Riya Verma</p>
</div>
<div className="chat-top-body">
  {messages.map(message=>{
    return (<>
    <p className={message.senderId === user._id? 'my-message':'others-message'}>{message.text}
    <br />
    <span>{format(message.createdAt)}</span>
    </p>

    </>)
  })}
</div>
<div className="chat-top-bottom">
  <InputEmoji
  fontFamily= 'Josefin Sans, sans-serif'
  fontSize={21}
  borderColor='#383838'
  borderRadius={8}
  height={60}
    value={newMessage}
    onChange={setNewMessage}
    cleanOnEnter
    onEnter={handleOnEnter}
    placeholder="Type a message"
  />
  <button onClick={handleOnEnter}>Send</button>
</div>
  </div>;
};
export default ChatTop;
