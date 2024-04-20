import axios from 'axios'
const API = axios.create({baseURL:'http://localhost:5000'})
export const getAllUsers = ()=>API.get('/user/getAllUsers');
export const sendFriendRequest = (friendData)=>API.post('/user/sendFriendRequest',friendData);
export const undoFriendRequest = (friendData)=>API.post('/user/undoFriendRequest',friendData);
export const getUser = (id)=>API.get(`/user/${id}`);
