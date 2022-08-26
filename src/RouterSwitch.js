import {  Routes, Route} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import App from './App';
import Profile from "./profile";
import Message from "./message";
import SignPage from "./sign-page";

const RouterSwitch = ()=> {

     // get state profile name from firebase auth
  const [ profileName,setProfileName] = useState()
 
  const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        if(user.displayName){
         setProfileName('@' + user.displayName);
        } else{
            setProfileName('Anon');
        }
      } else {
        // User is signed out
       setProfileName('Guest');
      }
    });

    return (
    <Routes>
                  
        <Route path="/" element={<App username={profileName}/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/message" element={<Message username={profileName}/>} /> 
        <Route path="/signPage" element={<SignPage/>} /> 
    </Routes>
    )
}

export default RouterSwitch;