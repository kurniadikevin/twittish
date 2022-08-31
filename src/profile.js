import Dashboard from "./dashboard";
import './profile.css';
import Sidebar from "./sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import ProfileForm from "./profile-form";


const Profile = ()=> {

    const [ profileName,setProfileName] = useState('');
    const [ userData,setUserData] = useState({})


    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        if(user.displayName){
         setUserData(user);
         console.log(userData);
        } else{
            setProfileName('Anon');

        }
      } else {
        // User is signed out
       setProfileName('Guest');
      }
    });

    const displayProfileForm = () => {
        const profileForm = document.querySelector('#profile-form'); 
        profileForm.style.display= 'grid';
       

    }

    return(
        <div className="profile-tab">

            <Dashboard/>

            <div className="profile-page">
                <div className="profile-head">
                    <div className="profile-side">
                        <div className="picture-cont">PP</div>
                        <button id="edit-profile" onClick={displayProfileForm}>Edit</button>
                    </div>

                    <div className="profile-main">
                            <div className="profile-name">@{userData.displayName}</div>
                            <div className="profile-desc">profile desc</div>
                    </div>
                </div>

                <div className="profile-body">
                    <ProfileForm />
                
                </div>
            </div>

            < Sidebar />    
        </div>
    )
}

export default Profile;