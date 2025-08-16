import axios from 'axios'
const api = axios.create({baseURL:"https://gingerchat-server.onrender.com"})
export const LoginAPI = (loginData)=>
  api.post('/auth/login',loginData)
export const deleteAccountAPI = (userId)=>api.post('/auth/delete-account',userId)

export const verifyUserAPI = (token)=>api.post('/auth/user-verification', token)

export const updatePassword = (data)=> api.put('/auth/update-password',data)