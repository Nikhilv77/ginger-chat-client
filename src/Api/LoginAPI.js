import axios from 'axios'
const api = axios.create({baseURL:'http://localhost:5000'})
export const LoginAPI = (loginData)=>
  api.post('/auth/login',loginData)
export const deleteAccountAPI = (userId)=>api.post('/auth/delete-account',userId)