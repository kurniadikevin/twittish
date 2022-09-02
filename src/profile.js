import Dashboard from "./dashboard";
import './profile.css';
import Sidebar from "./sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import { getDatabase, ref, child, get} from "firebase/database";
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
   let unsubscribe=  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        if(user.displayName){
         setUserData(user);
         //console.log(user);  
        } else{
            setProfileName('Anon');
          }
      } else {
        // User is signed out
       setProfileName('Guest');
      }
    });
    unsubscribe();

    // display form dom
    const displayProfileForm = () => {
        const profileForm = document.querySelector('#profile-form'); 
        profileForm.style.display= 'grid';
    }


      // Read data for profile home
      const dbRef = ref(getDatabase());
      get(child(dbRef, 'post')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          var arrData = Object.keys(data).map(function(key) {
            return data[key];
            });
          //console.log(arrData); 
          const newData = arrData.reverse();
          const filteredData = newData.filter((data)=>{
            return  data.userId === userData.uid;
        })
        setProfilePost(filteredData);
          
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });

      //render data
      let renderListData =  profilePost.map((item)=>
        <div className="main-content">
            <div className="twit-content">{item.twit}</div>
            <div className="username-content">{item.username}</div> 
            <div className="date-content">{item.createdAt}</div> 
        </div>
    )
    
    // Find url for profile picture
    const getProfileImage = ()=> {   
     getDownloadURL(sRef(storage, `images/ProfilePicture-${userData.uid}`))
      .then((url) => {
      // Or inserted into an <img> element
    const img = document.getElementById('user-PP');
    const imgDash = document.getElementById('profile-pic');
    img.setAttribute('src', null);
    img.setAttribute('src', url);
    imgDash.setAttribute('src', null);
    imgDash.setAttribute('src', url);
    setPPUrl(url);
  })
  .catch((error) => {
    // Handle any errors
    alert('load img error');
  });
}

  useEffect(()=>{
    getProfileImage(); 
  },[userData.uid]);

  
    return(
        <div className="profile-tab">

            <Dashboard  />

            <div className="profile-page">
                <div className="profile-head">
                    <div className="profile-side">
                        <div className="picture-cont">
                          <img id="user-PP"
                          alt='IMG NOT LINK YET!!!'/>
                        </div>
                        <button id="edit-profile" onClick={displayProfileForm}>Edit</button>
                    </div>

                    <div className="profile-main">
                            <div className="profile-name">@{userData.displayName}</div>
                            <div className="profile-desc">profile desc  </div>
                    </div>
                </div>

                <div className="profile-body">
                    <ProfileForm uidImg={userData.uid}/>
                    <div className="content-cont">
                      {renderListData}
                    </div>   
                
                </div>
            </div>

            < Sidebar />    
        </div>
    )
}

export default Profile;