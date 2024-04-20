import axios from 'axios'
const api = axios.create({baseURL:'http://localhost:5000'})

export const getMessages = (id)=>api.get(`/message/${id}`)

export const sendMessage = (data)=>api.post('/message/',data)