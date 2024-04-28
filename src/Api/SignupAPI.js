import axios from "axios";
const api = axios.create({baseURL : 'https://ginger-chat-server.onrender.com'})
export const signupAPI =(signupData)=> api.post('/auth/signup',signupData)