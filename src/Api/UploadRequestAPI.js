import axios from "axios";
const API = axios.create({baseURL:'https://ginger-chat-server-9kbl.onrender.com'});

export const uploadRequest = (imageData)=>API.post('/uploadRequest/',imageData)