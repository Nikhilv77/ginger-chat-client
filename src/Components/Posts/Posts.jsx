import React, { useEffect, useState } from "react";
import './Posts.css'
import Post from "../Post/Post";
import { GetAllPosts } from "../../Actions/CreatePostAction";
import {useDispatch,useSelector} from 'react-redux'
import { socket } from "../../App";
import { fetchAllPosts } from "../../Api/PostAPI";
import ClipLoader from "react-spinners/ClipLoader";
const Posts = () => {
  const[receivedPost,setReceivedPost] = useState(null);
  let[AllPosts,setAllPosts] = useState([])
  
  useEffect(()=>{
    async function fetAllPosts(){
      try {
        const response = await fetchAllPosts();
        console.log(response.data);
        setAllPosts(response.data)
      } catch (error) {
        console.log(error);
      }
    }
    fetAllPosts();
  },[receivedPost])
  useEffect(()=>{
socket.on('deleted-post',(postId)=>{
  console.log("fired");
  async function fetAllPosts(){
    try {
      const response = await fetchAllPosts();
      console.log(response.data,"fetched");
      setAllPosts(response.data)
    } catch (error) {
      console.log(error);
    }
  }
  fetAllPosts();
})
  },[])
  useEffect(()=>{
  socket.on('receiving-new-post',(newPost)=>{
    setReceivedPost(newPost)
  })
  },[])
  useEffect(() => {
    if (receivedPost) {
      setAllPosts(prevPosts => [receivedPost, ...prevPosts]);
    }
  }, [receivedPost]);

  const user = useSelector(state=>state.AuthReducer.authData.savedUser)
  return <div className="posts">
   {AllPosts?AllPosts.map((post,index)=>{
    return <Post post = {post}/>
   }):  <ClipLoader
   className="post-loader"
   size={70}
   color="white"
   
   aria-label="Loading Spinner"
   data-testid="loader"
 />}
  </div>;
};

export default Posts;


// import React, { useEffect, useState } from "react";
// import './Posts.css'
// import Post from "../Post/Post";
// import { GetAllPosts } from "../../Actions/CreatePostAction";
// import {useDispatch,useSelector} from 'react-redux'
// import { socket } from "../../App";
// const Posts = () => {
//   const[receivedPost,setReceivedPost] = useState(null);
//   useEffect(()=>{
//     dispatch(GetAllPosts())
//   },[])
//   useEffect(()=>{
//   socket.on('receiving-new-post',(newPost)=>{
//     setReceivedPost(newPost)
//   })
//   },[])
//   const dispatch = useDispatch();
//   const user = useSelector(state=>state.AuthReducer.authData.savedUser)
//   const {loading,error,Posts} = useSelector(state=>state.PostReducer);
//   const {loading:allPostsLoading,error:allPostsError, AllPosts} = useSelector(state=>state.GetAllPostsReducer)
  
//   let allPosts = AllPosts;
//   if(Posts.length>0){
//     let othersPosts = AllPosts.filter(post=>post.userId!==user._id)
//     othersPosts = othersPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     if(receivedPost !==null){
//       allPosts = [receivedPost,...Posts,...othersPosts]
//     }else{
//       allPosts = [...Posts,...othersPosts]
//     }
//   }
//   return <div className="posts">
//    {allPosts.map((post,index)=>{
//     return <Post post = {post}/>
//    })}
//   </div>;
// };

// export default Posts;
