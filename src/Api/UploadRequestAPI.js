import axios from "axios";
const API = axios.create({baseURL:"https://gingerchat-server.onrender.com"});

export const uploadRequest = (imageData)=>API.post('/uploadRequest/',imageData)