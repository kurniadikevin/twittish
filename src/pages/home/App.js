import Dashboard from "../../components/dashboard/dashboard";
import Sidebar from "../../components/sidebar/sidebar";
import PostForm from "../../components/post-form";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState,useEffect, useRef } from "react";
import { getDatabase, ref, update, child, get, push, serverTimestamp} from "firebase/database";
import '../../loader.css';
import { Link } from "react-router-dom";

function App(props) {

  //default black url
  const blankPPUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  // get state profile name from firebase auth
  const [ profileName,setProfileName] = useState('');
  const [ userId, setUserId] = useState('');
  const [postData, setPostData] = useState([]);
  const [PPurl,setPPUrl] = useState(blankPPUrl);
  const [render,setRender]= useState(false);


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
      //console.log(arrData);      
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
  

  
 
  //RETWEET TWIT
  const retweetFunc = (item) => {
    
    function writeNewPost(uid, username, createdAt, twit, myUserName, imgUrl, myUid) {
      const db = getDatabase();

      // A post entry.
      const postData = {
        username : username,
        userId : uid,
        twit : twit,
        createdAt : createdAt,
        profileImg : imgUrl,
        retweetBy : `Retweet by ${myUserName}`,
        retweetUid : myUid
      };

      // Get a key for a new Post.
      const newPostKey = push(child(ref(db), 'post')).key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates['/post/' + newPostKey] = postData;
      //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
      console.log(update(ref(db), updates))
      return update(ref(db), updates);
     
}   
  writeNewPost(item.userId, item.username, item.createdAt, item.twit, profileName, item.profileImg, userId);
   // alert('retweeted');
    // update alert on pop Up
    const popUp =document.querySelector('.sidebar-popup');
    popUp.style.display='grid';
    const popUpText = document.querySelector('#popup-text');
    popUpText.textContent='Retweeted';

  }



  // display form for replay each specific element
  const displayReplyForm = (index,ev,element)=> {
    const replyForm = document.querySelectorAll(element);
    if (ev.target.value === 'OFF'){
        ev.target.value = 'ON';
        replyForm[index].style.display='block';  
    } else {
        ev.target.value = 'OFF';
        replyForm[index].style.display='none';  
    }
  }

  //REPLY TWIT
  const submitReply = async(item,index) =>{
    const replyInput = document.querySelectorAll('#reply-input');
    let myPromise = new Promise(
      function(resolve){
     resolve((replyInput[index].value));
 })
 let inputText = await myPromise;
   // alert(inputText);

    function writeNewPost(uid, username, createdAt, twit, imgUrl, userReplyName,userReplyId,replyText,replyTime,replyPP) {
      const db = getDatabase();

      // A post entry.
      const postData = {
        userId : uid,
        username : username, 
        createdAt : createdAt,
        twit : twit,
        profileImg : imgUrl,
      
        reply : {
            username : userReplyName,
            userId : userReplyId,
            replyTwit : replyText,
            createdAt : replyTime,
            profileImg : replyPP
        }
      };

      // Get a key for a new Post.
      const newPostKey = push(child(ref(db), 'post')).key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates['/post/' + newPostKey] = postData;
      //updates['/user-posts/' + uid + '/' + newPostKey] = postData;
      console.log(update(ref(db), updates))
      return update(ref(db), updates);
    }
      writeNewPost(item.userId, item.username, item.createdAt, item.twit, item.profileImg, 
        profileName,userId,inputText,  Date(serverTimestamp()),PPurl)
      //alert('reply sent');
     
       // update alert on pop Up
       const popUp =document.querySelector('.sidebar-popup');
       popUp.style.display='grid';
       const popUpText = document.querySelector('#popup-text');
       popUpText.textContent='Reply send'; 

       //remove reply form after reply send
       const replyForm = document.querySelectorAll('#reply-form');
        replyForm[index].style.display='none';
        setRender(true);
  }


  let renderListData =  postData.map((item,index)=>
        <div className="main-content">
            <div className="row1-content">
              <img src={item.profileImg} id="profPic-content" alt="ppImage"/>
              
              <div className="username-content">
                <Link className='username-content'  
                  to={{ pathname: `/profileVisit/${item.userId}`,  }}
                 state={{ data : item}}>
                      {item.username}
                </Link>  
              </div>      

            </div>
            <div className="row2-content">
                 { 
                      (() => {
                        if(item.postImage) {
                          return ( <img id="postImage-content" src={item.postImage} alt='postImage'></img>);
                        }
                      })()
                    }      
              <div className="twit-content">{item.twit}</div>
              <div className="date-content">{item.createdAt}</div> 
              <div className="retweetBy-content">{item.retweetBy}</div>
            </div>

            <div className="icon-cont">
                <span class="material-symbols-outlined"
                onClick={(event)=> displayReplyForm(index,event,'#reply-display')} value='OFF' 
                id="mode-comment">
                  mode_comment
                  </span>
                  <span class="material-symbols-outlined" id="reply-icon" 
                  onClick={(event)=> displayReplyForm(index,event,'#reply-form')} value='OFF'>
                  reply
                  </span>
                  <span class="material-symbols-outlined" id="retweet-icon" onClick={()=> retweetFunc(item)}>
                  repeat
                  </span>

                {/*REPLY FORM */}
                <div id="reply-form">
                    <div id="reply-header">Replying to {item.username}</div>
                    <textarea id="reply-input" rows={4} cols={35}></textarea>
                    <button id="reply-btn" onClick={()=> submitReply(item,index)}>
                      Reply</button> 
                </div>

                 {/*REPLY DISPLAY */}
                <div id='reply-display'>
                   <div className="reply-display-head">
                      { 
                      (() => {
                        if(item.reply) {
                         
                          return (<div>reply by {item.reply.username}</div>);
                        }
                      })()
                    }        
                   </div>
                   <div className="reply-display-body">
                   { 
                      (() => {
                        if(item.reply) {
                          return (
                          <div>
                             <div> {item.reply.replyTwit}</div>
                             <div id="reply-time"> {item.reply.createdAt}</div>
                          </div>);
                        }
                      })()
                    }       
                   </div>
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

useEffect(()=> {   
  readPost();
  getAuthFunc();
  return readPost(); 
},[]);// 


  return (
    <div className="app-tab" >
          <Dashboard  func={pull_data} pageSelected={0}/>
          <div className="body-wrap">
            <div className="app-header">
                <div onClick={displayPostForm} id='new-twit'>New</div>
            
            </div>
            <PostForm username={profileName} userId={userId} ppUrl={PPurl}/>
              <div className="content-cont">
              {renderListData}
              </div>
              <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
               

          </div>
          <Sidebar data={postData} />
    </div>
  );
}

export default App;
// App as Home