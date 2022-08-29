import Dashboard from "./dashboard";
import Sidebar from "./sidebar";
import PostForm from "./post-form";
import {appDb} from './firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState,useEffect, useRef } from "react";
import { getDatabase, ref, onValue, child, get} from "firebase/database";

function App(props) {

  // get state profile name from firebase auth
  const [ profileName,setProfileName] = useState('');
  const [ userId, setUserId] = useState('');
  const [postData, setPostData] = useState();

 
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

  //read
  const readPost =() => {
    const db = getDatabase();
    const userTwitRef = ref(db, `post/` );
    onValue(userTwitRef, (snapshot) => {
      const data = snapshot.val();

      var arrData = Object.keys(data)
    .map(function(key) {
        return data[key];
    });
      console.log(arrData);

      console.log(data);
      
      setPostData(arrData);
    });
  }


  useEffect(()=> {
    readPost();
  },[]);

  const renderListData = postData.map((item)=>
        <div>
          <div>{item.username}</div>
          <div>{item.twit}</div>
        </div>
    )


  return (
    <div className="app-tab">
          <Dashboard username={profileName}/>
          <div>
            <h1>Hi i am App Home my name is {profileName}</h1>
            <PostForm username={profileName} userId={userId}/>
            <div>
             {renderListData}
            </div>

          </div>
          <Sidebar/>
    </div>
  );
}

export default App;
// App as Home