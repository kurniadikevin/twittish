import Dashboard from "./dashboard";
import Sidebar from "./sidebar";
import PostForm from "./post-form";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState,useEffect } from "react";

function App(props) {

  // get state profile name from firebase auth
  const [ profileName,setProfileName] = useState('');
  const [ userId, setUserId] = useState('');
 
  const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, collect have user.id and display name
        if(user.displayName){
         setProfileName('@' + user.displayName);
         setUserId(user.uid);
        } else{
            setProfileName('Anon');
        }
      } else {
        // User is signed out
       setProfileName('Guest');
      }
    });

  return (
    <div className="app-tab">
          <Dashboard username={profileName}/>
          <div>
            <h1>Hi i am App Home my name is {profileName}</h1>
            <PostForm username={profileName} userId={userId}/>
          </div>
          <Sidebar/>
    </div>
  );
}

export default App;
// App as Home