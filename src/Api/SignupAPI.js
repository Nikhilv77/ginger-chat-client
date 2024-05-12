import axios from "axios";
const api = axios.create({baseURL : 'https://ginger-chat-server-9kbl.onrender.com'})
export const signupAPI =(signupData)=> api.post('/auth/signup',signupData)