import Dashboard from "./dashboard";
import './profile.css';
import Sidebar from "./sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import { getDatabase, ref, child, get, off} from "firebase/database";
import { getDownloadURL, getStorage } from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import storage from "./firebase";



const Profile = ()=> {

    const [ profileName,setProfileName] = useState('');
    const [ userData,setUserData] = useState({});
    const [ profilePost, setProfilePost] = useState([]);
    const [PPurl, setPPUrl] = useState('');

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
          var arrData = Object.keys(data).map(function(key) {
            return data[key];
            });
          console.log('arrData'); 
          const newData = arrData.reverse();
          const filteredData = newData.filter((data)=>{
            return  data.userId === userData.uid;
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

    useEffect(()=> {
      authFunc();
      readFunc();
    },[userData])

      //render data
      let renderListData =  profilePost.map((item)=>
        <div className="main-content">
            <div className="twit-content">{item.twit}</div>
            <div className="username-content">{item.username}</div> 
            <div className="date-content">{item.createdAt}</div>
            <div className="icon-cont">
                <span class="material-symbols-outlined">
                  favorite
                  </span>
                  <span class="material-symbols-outlined">
                  reply
                  </span>
                  <span class="material-symbols-outlined">
                  repeat
                  </span>
            </div> 
        </div>
    )
    
   
  const pull_data = (data) => {
    setPPUrl(data); // LOGS DATA FROM CHILD profile
  }

  

    return(
        <div className="profile-tab">

            <Dashboard  func={pull_data}/>

            <div className="profile-page">
                <div className="profile-head">
                    <div className="profile-side">
                        <div className="picture-cont">
                          <img id="profile-pic-prof" src={PPurl}
                          alt='IMG NOT LINK YET!!!'/>
                        </div>
                        <button id="edit-profile" onClick={displayProfileForm}>Edit</button>
                    </div>

                    <div className="profile-main">
                            <div className="profile-name">@{userData.displayName}</div>
                            <div className="profile-desc">{userData.description}</div>
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

            < Sidebar />    
        </div>
    )
}

export default Profile;