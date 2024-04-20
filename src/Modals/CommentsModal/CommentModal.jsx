import React, { useRef } from "react";
import './CommentModal.css'
import { format } from "timeago.js";
import { fetchComments } from "../../Api/PostAPI";
import ClipLoader from "react-spinners/ClipLoader";
import { useState,useEffect } from "react";
import { makeComment } from "../../Api/PostAPI";
import { socket } from "../../App";
const CommentModal = ({setShowComments,postId,userName,setCommentsLength}) => {
  const[comments,setComments] = useState([]);
  const inputComment = useRef();
  const[loadingComments,setLoadingComments] = useState(false);
  useEffect(()=>{
  socket.on("receiving-new-comment",(newComment)=>{
    setComments(prev=>[newComment,...prev])
  })
  },[])
  useEffect(()=>{
    async function getComments (){
      setLoadingComments(true)
      const response = await fetchComments(postId);
      setLoadingComments(false);
      setComments(response.data);
    }
    getComments();
  },[postId])
  const handleMakeComment = async()=>{
    if(inputComment.current.value === "") return;
   const newComment = {
    userName:userName,
    comment:inputComment.current.value,
    date:new Date()
   }
   inputComment.current.value = "";
   socket.emit("sending-new-comment",newComment);
   await makeComment(newComment,postId);
  }

  return <div className="comment-modal">

{loadingComments ? <ClipLoader color="white" size={50}/>:
    <div className="comment-modal-container">
      
<i onClick={()=>setShowComments(false)} class="ri-close-large-line"></i>
{comments.length === 0 && !loadingComments && <h4 className="no-comments">There are no comments at this moment !</h4>}
<div className="comment-modal-items">
   {comments.map(comment=>{
    return<> <div className="comment-modal-item">
    <h4>{comment.userName}</h4>
    <p>{`"${comment.comment}"`}</p>
   <span>Commented {format(comment.date)}</span>
    </div>
    <hr className="comment-line" />
    </>
   })}
   </div>
   <div className="add-comment">
    <textarea ref={inputComment} name="" id="" cols="30" rows="6"></textarea>
    <button onClick={handleMakeComment}>Add Comment</button>
   </div>
   </div>
}
  </div>;
};

export default CommentModal;