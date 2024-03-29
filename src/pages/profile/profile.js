import Dashboard from "../../components/dashboard/dashboard";
import './profile.css';
import Sidebar from "../../components/sidebar/sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ProfileForm from "../../components/profile-form";
import { getDatabase, ref, child, get,} from "firebase/database";
import { Link } from "react-router-dom";
import PostForm from "../../components/post-form";



const Profile = ()=> {

    const [ profileName,setProfileName] = useState('');
    const [ userData,setUserData] = useState({});
    const [ profilePost, setProfilePost] = useState([]);
    const [PPurl, setPPUrl] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
    const [ profileDesc, setProfileDesc] = useState('');
    const [postData, setPostData] = useState([]);

    // authentication
    const auth = getAuth();
    const authFunc = ()=> onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        if(user.displayName){
         setUserData(user);
         console.log('user');  
        } else{
            setProfileName('Anon');
          }
      } else {
        // User is signed out
       setProfileName('Guest');
      }
    });


    // display form dom
    const displayProfileForm = () => {
        const profileForm = document.querySelector('#profile-form'); 
        profileForm.style.display= 'grid';
        const profileTab = document.querySelector('.profile-tab');
        profileTab.style.background='rgb(100,100,100,0.5)';
        //profileTab.style.opacity='0.1';
    }


      // Read data for profile home
      const dbRef = ref(getDatabase());
      const readFunc = () => {
      get(child(dbRef, 'post')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let arrData = Object.keys(data).map(function(key) {
            return data[key];
            });
          console.log('arrData'); 
          const newData = arrData.reverse();
          setPostData(newData);
          const filteredData = newData.filter((data)=>{
            return  data.userId === userData.uid || data.retweetUid === userData.uid;
        })
        setProfilePost(filteredData);
        //loader
        const loader = document.querySelector('.lds-roller');
        loader.style.display='none';  

        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }


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
      //render data
      let renderListData =  profilePost.map((item,index)=>
<div className="main-content">
            <div className="row1-content">
            <img src={PPurl} id="profPic-content" alt="ppImage"/>
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
                <span class="material-symbols-outlined">
                mode_comment
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
                    <button id="reply-btn" >
                      Reply</button> 
                </div>
            </div>
        </div>
    )
    
   
  const pull_data = (data) => {
    setPPUrl(data); // LOGS DATA FROM DASHBOARD
  }

  // read data for profile description
  const readDesc = ()=>{
    get(child(dbRef, `profileDesc/${userData.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setProfileDesc(data.desc);
    
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  readDesc();

  useEffect(()=> {
    authFunc();
    readFunc();
  },[userData])


    return(
        <div className="profile-tab">

            <Dashboard  func={pull_data}  pageSelected={1}/>
            <PostForm username={userData.displayName} userId={userData.uid} ppUrl={PPurl}/>

            <div className="profile-page">
                <div className="profile-head">
                    <div className="profile-side">
                        <div className="picture-cont">
                          <img id="profile-pic-prof" src={PPurl}
                          alt='loading...'/>
                        </div>
                        <button id="edit-profile" onClick={displayProfileForm}>Edit</button>
                    </div>

                    <div className="profile-main">
                            <div className="profile-name">@{userData.displayName}</div>
                            <div className="profile-desc">{profileDesc}</div>
                           {/* <button id="follow-btn">Follow</button> */}
                    </div>
                </div>

                <div className="profile-body">
                    <ProfileForm uidImg={userData.uid} userData={userData} />
                    <div className="content-cont">
                      {renderListData}
                    </div>
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
   
                
                </div>
            </div>

            < Sidebar  data={postData}/>    
        </div>
    )
}

export default Profile;