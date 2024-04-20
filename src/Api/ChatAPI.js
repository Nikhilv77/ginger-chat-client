import axios from 'axios'
const API= axios.create({baseURL:'http://localhost:5000'})

export const getUserChats = (id)=> API.get(`/chat/${id}`)