import {  Routes, Route} from "react-router-dom";
import App from './App';
import Profile from "./profile";
import Message from "./message";

const RouterSwitch = ()=> {
    return (
    <Routes>
                  
        <Route path="/" element={<App />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/message" element={<Message/>} /> 
       
    </Routes>
    )
}

export default RouterSwitch;