import "./App.css"
import HomePage from "./Pages/HomePage/HomePage";
import Login from "./Pages/LoginPage/Login";
import Signup from "./Pages/SignupPage/Signup";
import {Routes,Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { Chat } from "./Pages/Chat/Chat";
import DeleteAccountModal from "./Modals/DeleteAccountModal/DeleteAccountModal";
import LogoutModal from "./Modals/LogoutModal/LogoutModal";
import { io } from 'socket.io-client';
import { useEffect } from "react";
function App() {
  const user = useSelector(state => state.AuthReducer?.authData?.savedUser);
  const socket = io('http://localhost:8900');
    useEffect(() => {
      return () => {
        socket.disconnect();
      };
    }, []);
  return (
    
    <div className="app">
      <DeleteAccountModal/>
      <LogoutModal/>
<Routes>
  <Route path="/" element = {user?<HomePage/> : <Login/>}/>
  <Route path="/signup" element = {user?<HomePage/>:<Signup/>}/>
  <Route path="/login" element = {user?<HomePage/>:<Login/>}/>
  <Route path="/chat" element = {user?<Chat/>:<Login/>}/>
</Routes>

    </div>
  );
}
export const socket = io('http://localhost:8900');
export default App;
