import { useState } from 'react';
import {Link} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard =() => {

    const [ profileName,setProfileName] = useState('')

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        if(user.displayName){
         setProfileName('@' + user.displayName);
        } else{
            setProfileName('Anon');
        }
      } else {
        // User is signed out
       setProfileName('Guest');

      }
    });

    return(
        <div className='dashboard'>
            <div className='title-app' >
                <div >Twittish</div>
            </div>
            <nav className='nav-link'>
                <Link to = '/' className='class-link'>
                    <span class="material-symbols-outlined">
                    other_houses</span>
                     Home</Link>
                <Link to = '/profile' className='class-link'>
                    <span class="material-symbols-outlined">
                    person_4</span>
                    Profile</Link>
                <Link to = '/message' className='class-link'>
                <span class="material-symbols-outlined">
                    inbox</span>
                    Message</Link>
                <Link to = '/signPage' className='class-link'>Sign-Page</Link> 
            </nav>
            <div className='profile-icon'>
                <div className='profile-pic'>PP</div>
                <div className='profile-name'>{profileName}</div>
            </div>
        </div>
    )
}

export default Dashboard;