import axios from 'axios'
const api = axios.create({baseURL:'https://ginger-chat-server-9kbl.onrender.com'})

export const getMessages = (id)=>api.get(`/message/${id}`)

export const sendMessage = (data)=>api.post('/message/',data)