import Dashboard from "./dashboard";
import Sidebar from "./sidebar";
import PostForm from "./post-form";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState,useEffect, useRef } from "react";
import { getDatabase, ref, onValue, child, get} from "firebase/database";

function App(props) {

  // get state profile name from firebase auth
  const [ profileName,setProfileName] = useState('');
  const [ userId, setUserId] = useState('');
  const [postData, setPostData] = useState([]);

  const auth = getAuth();
   let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, collect have user.id and display name
        if(user.displayName){
         setProfileName('@' + user.displayName);
         setUserId(user.uid);
         
        } else{
            setProfileName('Anon');
            console.log('loaded');
           }
          
      } else {
        // User is signed out
       setProfileName('Guest');
      }
    });
    
      unsubscribe();
  
  //read
  const readPost =() => {

      // READ DATA ONCE
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'post')).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        var arrData = Object.keys(data).map(function(key) {
          return data[key];
      });
        //console.log(arrData);      
        setPostData(arrData.reverse());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  

  
  useEffect(()=> {
    readPost();
    
  },[postData]);

  let renderListData =  postData.map((item)=>
        <div className="main-content">
            <div className="twit-content">{item.twit}</div>
            <div className="username-content">{item.username}</div> 
            <div className="date-content">{item.createdAt}</div> 
        </div>
    )

    const displayPostForm= ()=>{
      if (profileName !== 'Anon' && profileName !== 'Guest'){
          alert('post form activated');
          const postForm = document.querySelector('.post-form');
          postForm.style.display='flex';
          const textArea = document.querySelector('#post-text');
          textArea.value='';
      }
}


  return (
    <div className="app-tab">
          <Dashboard username={profileName}/>
          <div>
            <div onClick={displayPostForm} id='new-twit'>New Twit</div>
            <PostForm username={profileName} userId={userId}/>
              <div className="content-cont">
              {renderListData}
              </div>
               
  
            

          </div>
          <Sidebar/>
    </div>
  );
}

export default App;
// App as Home