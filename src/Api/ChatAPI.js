import axios from 'axios'
const API= axios.create({baseURL:'https://ginger-chat-server-9kbl.onrender.com'})

export const getUserChats = (id)=> API.get(`/chat/${id}`)
export const createChat = (data)=> API.post('/chat/',data)