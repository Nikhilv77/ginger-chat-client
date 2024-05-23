import axios from "axios";
const api = axios.create({baseURL : 'https://gingerchat-server.onrender.com'})
export const signupAPI =(signupData)=> api.post('/auth/signup',signupData)