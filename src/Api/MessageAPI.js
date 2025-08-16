import axios from 'axios'
const api = axios.create({baseURL:"https://gingerchat-server.onrender.com"})

export const getMessages = (id)=>api.get(`/message/${id}`)

export const sendMessage = (data)=>api.post('/message/',data)