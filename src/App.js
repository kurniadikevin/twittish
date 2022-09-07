import Dashboard from "./dashboard";
import Sidebar from "./sidebar";
import PostForm from "./post-form";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState,useEffect, useRef } from "react";
import { getDatabase, ref, onValue, child, get, push, serverTimestamp} from "firebase/database";
import './loader.css';

function App(props) {

  //default black url
  const blankPPUrl = 'https://pixabay.com/get/g5557f40092f55a7b789dccf798166cf3df968a1b1215b2c649129ec9e0f718da0dfa92d6effdabc321f91302fd0b4d109e0d47ac36e70aa37d55a27d9203114ab02eef15e1353faa69f034d45e90da75_640.png';

  // get state profile name from firebase auth
  const [ profileName,setProfileName] = useState('');
  const [ userId, setUserId] = useState('');
  const [postData, setPostData] = useState([]);
  const [PPurl,setPPUrl] = useState(blankPPUrl);


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

  //reply unfinished ??
  const submitReply = (item) =>{
    const replyInput = document.querySelector('#reply-input');
    const replyVal = replyInput.value;
    console.log(replyVal);

    const db = getDatabase();
    push(ref(db, `post/${item}`), {
      userId : userId,
      username : profileName,
      reply : replyVal,
      createdAt :  Date(serverTimestamp())

    });  
  }


  let renderListData =  postData.map((item,index)=>
        <div className="main-content">
            <div className="row1-content">
              <img src={item.profileImg} id="profPic-content" alt="ppImage"/>
              <div className="username-content">{item.username}</div> 
            </div>
            <div className="row2-content">
              <div className="twit-content">{item.twit}</div>
              <div className="date-content">{item.createdAt}</div> 
            </div>
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
                    <button id="reply-btn" onClick={()=> submitReply(item)}>
                      Reply</button> 
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

const pull_data = (data) => {
  setPPUrl(data); // LOGS DATA FROM CHILD profile
}

  return (
    <div className="app-tab">
          <Dashboard  func={pull_data}/>
          <div>
            <div onClick={displayPostForm} id='new-twit'>New Twit</div>
            <PostForm username={profileName} userId={userId} ppUrl={PPurl}/>
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