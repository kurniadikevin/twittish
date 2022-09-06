import Dashboard from "./dashboard";
import Sidebar from "./sidebar";
import PostForm from "./post-form";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState,useEffect, useRef } from "react";
import { getDatabase, ref, onValue, child, get} from "firebase/database";
import './loader.css';

function App(props) {

  // get state profile name from firebase auth
  const [ profileName,setProfileName] = useState('');
  const [ userId, setUserId] = useState('');
  const [postData, setPostData] = useState([]);


  const auth = getAuth();
   const getAuthFunc = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, collect have user.id and display name
        if(user.displayName){
         setProfileName('@' + user.displayName);
         setUserId(user.uid);
         
        } else{
            setProfileName('Anon');
            //alert('loaded');
           }
          
      } else {
        // User is signed out
       setProfileName('Guest');
      }
    });
    
  
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
      //alert(arrData);      
        setPostData(arrData.reverse());
        const loader = document.querySelector('.lds-roller');
        loader.style.display='none';
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  

  
  useEffect(()=> {   
    readPost();
    getAuthFunc();
    return readPost(); 
  },[]);

  // display form for replay each specific element
  const displayReplyForm = (index,ev)=> {
    const replyForm = document.querySelectorAll('#reply-form');
    if (ev.target.value === 'OFF'){
        ev.target.value = 'ON';
        replyForm[index].style.display='block';  
    } else {
        ev.target.value = 'OFF';
        replyForm[index].style.display='none';  
    }
  }


  let renderListData =  postData.map((item,index)=>
        <div className="main-content">
            <div className="twit-content">{item.twit}</div>
            <div className="username-content">{item.username}</div> 
            <div className="date-content">{item.createdAt}</div> 
            <div className="icon-cont">
                <span class="material-symbols-outlined">
                  favorite
                  </span>
                  <span class="material-symbols-outlined" id="reply-icon" 
                  onClick={(event)=> displayReplyForm(index,event)} value='OFF'>
                  reply
                  </span>
                  <span class="material-symbols-outlined">
                  repeat
                  </span>

                <div id="reply-form">
                    <div id="reply-header">Replying to {item.username}</div>
                    <textarea id="reply-input" rows={4} cols={35}></textarea>
                    <button id="reply-btn">Reply</button> 
                </div>
            </div>
        </div>
    )

    const displayPostForm= ()=>{
      if (profileName !== 'Anon' && profileName !== 'Guest'){
          //alert('post form activated');
          const postForm = document.querySelector('.post-form');
          postForm.style.display='flex';
          const textArea = document.querySelector('#post-text');
          textArea.value='';
          const profileTab = document.querySelector('.app-tab');
          profileTab.style.background='rgb(100,100,100,0.5)';
      }
}

   


  return (
    <div className="app-tab">
          <Dashboard />
          <div>
            <div onClick={displayPostForm} id='new-twit'>New Twit</div>
            <PostForm username={profileName} userId={userId}/>
              <div className="content-cont">
              {renderListData}
              </div>
              <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
               
  
            

          </div>
          <Sidebar/>
    </div>
  );
}

export default App;
// App as Home