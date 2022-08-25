import {  Routes, Route} from "react-router-dom";
import App from './App';
import Profile from "./profile";
import Message from "./message";
import SignPage from "./sign-page";

const RouterSwitch = ()=> {
    return (
    <Routes>
                  
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/message" element={<Message/>} /> 
        <Route path="/signPage" element={<SignPage/>} /> 
    </Routes>
    )
}

export default RouterSwitch;