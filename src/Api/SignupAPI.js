import axios from "axios";
const api = axios.create({baseURL : 'http://localhost:5000'})
export const signupAPI =(signupData)=> api.post('/auth/signup',signupData)