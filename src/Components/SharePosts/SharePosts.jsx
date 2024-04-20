import React, { useRef, useState } from "react";
import pic from '../../Images/nikhil.jpg'
import photoIcon from '../../Images/photo-icon.png'
import {useSelector} from 'react-redux'
import { UploadRequestAction } from "../../Actions/UploadRequestAction";
import {useDispatch} from 'react-redux'
import { makePost } from "../../Api/PostAPI";
import './SharePosts.css'
import { socket } from "../../App";
const PostShare = () => {
    const dispatch = useDispatch();
   const[image,setImage] = useState(null);
   const user = useSelector(state=>state.AuthReducer.authData.savedUser)
   const imageRef = useRef();
   const desc = useRef();
   const handleImageChange = (e)=>{
        if(e.target.files && e.target.files[0]){
            setImage(
         (e.target.files[0])
            )
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(user);
        const newPost = {
            userId :user._id,
            userName:user.name,
            description : desc.current.value
        }
        if(image){
            console.log(image);
            const data=new FormData();
            const fileName= Date.now()+image.name;
            data.append("name", fileName);
            data.append("file", image); 
            newPost.image=fileName;
            console.log(newPost);
            try {
                dispatch(UploadRequestAction(data))
             } catch (error) {
                console.log(error);
             }
        }
        async function makePostFunction(){
            try {
                const response = await makePost(newPost);
                socket.emit("sending-new-post", response.data);
            } catch (error) {
                console.log(error);
            }
        }
        makePostFunction();
        reset();
    }
    const reset = ()=>{
        desc.current.value = "";
        setImage(null)
    }
  return <div className="post-share-card">
    <div className="upper-post-share">
    <img className="share-image" src={pic} alt="profile"/>
        <input ref={desc} required className="share-input" type="text" placeholder="What's on your mind, Friend?" />
    </div>
   
   <div className="share-post-comps">
        <div onClick={()=>imageRef.current.click()} style={{color:'green',cursor:"pointer"}} className="action">
        <img src={photoIcon} alt="" />
        <span>Share a Photo</span>
    </div>
        <button onClick={handleSubmit} className="share-button">Post Now</button>
    
  </div>
  <input type="file" ref={imageRef} hidden onChange={handleImageChange} />
   {
    image && <div className="show-image">
     <i onClick = {()=>setImage(null)} class="ri-close-large-line"></i>
     <img src={URL.createObjectURL(image)} alt="" />
    </div>
   }
  
  </div>;
};

export default PostShare;


// import React, { useRef, useState } from "react";
// import pic from '../../Images/nikhil.jpg'
// import {UilTimes} from '@iconscout/react-unicons'
// import {UilScenery} from '@iconscout/react-unicons'
// import photoIcon from '../../Images/photo-icon.png'
// import {useSelector} from 'react-redux'
// import { UploadRequestAction } from "../../Actions/UploadRequestAction";
// import {useDispatch} from 'react-redux'
// import { CreatePostAction } from "../../Actions/CreatePostAction";
// import './SharePosts.css'
// import { socket } from "../../App";
// const PostShare = () => {
//     const dispatch = useDispatch();
//    const[image,setImage] = useState(null);
//    const user = useSelector(state=>state.AuthReducer.authData.savedUser)
//    const imageRef = useRef();
//    const desc = useRef();
//    const handleImageChange = (e)=>{
//         if(e.target.files && e.target.files[0]){
//             setImage(
//          (e.target.files[0])
//             )
//         }
//     }
//     const handleSubmit = (e)=>{
//         e.preventDefault();
//         console.log(user);
//         const newPost = {
//             userId :user._id,
//             userName:user.name,
//             description : desc.current.value
//         }
//         if(image){
//             console.log(image);
//             const data=new FormData();
//             const fileName= Date.now()+image.name;
//             data.append("name", fileName);
//             data.append("file", image); 
//             newPost.image=fileName;
//             console.log(newPost);
//             try {
//                 dispatch(UploadRequestAction(data))
//              } catch (error) {
//                 console.log(error);
//              }
//         }
//         dispatch(CreatePostAction(newPost));
//         socket.emit("sending-new-post", newPost);
//         reset();
//     }
//     const reset = ()=>{
//         desc.current.value = "";
//         setImage(null)
//     }
//   return <div className="post-share-card">
//     <div className="upper-post-share">
//     <img className="share-image" src={pic} alt="profile"/>
//         <input ref={desc} required className="share-input" type="text" placeholder="What's on your mind, Friend?" />
//     </div>
   
//    <div className="share-post-comps">
//         <div onClick={()=>imageRef.current.click()} style={{color:'green',cursor:"pointer"}} className="action">
//         <img src={photoIcon} alt="" />
//         <span>Share a Photo</span>
//     </div>
//         <button onClick={handleSubmit} className="share-button">Post Now</button>
    
//   </div>
//   <input type="file" ref={imageRef} hidden onChange={handleImageChange} />
//    {
//     image && <div className="show-image">
//      <i onClick = {()=>setImage(null)} class="ri-close-large-line"></i>
//      <img src={URL.createObjectURL(image)} alt="" />
//     </div>
//    }
  
//   </div>;
// };

// export default PostShare;
