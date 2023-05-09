import { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDownloadURL, getStorage,} from "firebase/storage";
import { ref as sRef } from 'firebase/storage';
import storage from "../firebase";



const Dashboard =(props) => {

    const blankPPUrl = 'https://pixabay.com/get/g5557f40092f55a7b789dccf798166cf3df968a1b1215b2c649129ec9e0f718da0dfa92d6effdabc321f91302fd0b4d109e0d47ac36e70aa37d55a27d9203114ab02eef15e1353faa69f034d45e90da75_640.png';

    // set username
    const [ profileName,setProfileName] = useState('');
    const [profPicUrl, setProfPicUrl] = useState(blankPPUrl);
    const [userData,setUserData]= useState();

   
    const auth = getAuth();
   
    const authFunc = () =>{
     onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
        
        // User is signed in, see docs for a list of available properties
        if(user.displayName){
         setProfileName('@' + user.displayName);
         getProfileImage();
         console.log('loaded');
         
        } else{
            setProfileName('Anon');
        }

      } else {
        // User is signed out
       setProfileName('Guest');
      }
    });
}

   

    const displayPostForm= ()=>{
            if (profileName !== 'Anon' && profileName !== 'Guest'){
                console.log('post form activated');
                const postForm = document.querySelector('.post-form');
                postForm.style.display='flex';
                const textArea = document.querySelector('#post-text');
                textArea.value='';
                console.log(userData);
               
            }
    }

    const getProfileImage = ()=> {   
        getDownloadURL(sRef(storage, `images/ProfilePicture-${userData.uid}`))
         .then((url) => {
       
        props.func(url);
        setProfPicUrl(url);
        const imgDash = document.getElementById('profile-pic');
        const loader = document.querySelector('#lds-roller-dash');
        loader.style.display='none'
        imgDash.setAttribute('src', null);
        imgDash.setAttribute('src', url);
        imgDash.style.display='block';
        console.log(url); 
        //sRef.off();
     })
     .catch((error) => {
      //alert('load img error');
       
     });

   }

   authFunc();

   
   
   useEffect(()=>{
    //highlight selected page
   const classLink = document.querySelectorAll('.class-link');
   classLink[props.pageSelected].id='class-link-selected';
    
   },[])

    return(
        <div className='dashboard'>
            <div className='title-app' onClick={()=> window.location.reload(false)} >
                <div>Twittish</div>
            </div>
            <nav className='nav-link'>
                <Link to = '/' className='class-link'>
                    <span class="material-symbols-outlined"
                    id='span-nav'>
                    other_houses</span>
                     Home</Link>

                <Link to = '/profile' className='class-link'>
                    <span class="material-symbols-outlined"
                     id='span-nav'>
                    person_4</span>
                    Profile</Link>

                <Link to = '/signPage' className='class-link'>
                <span class="material-symbols-outlined"
                 id='span-nav'>
                    exit_to_app
                    </span>
                    Sign </Link> 
            </nav>
            <div className='post-cont'>
                
            </div>
            <div className='profile-icon'>
                <div className='profile-pic'><img  alt="ppImg" id='profile-pic'  />
                <div class="lds-roller" id='lds-roller-dash'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

                
                </div>
                <div className='profile-name-dash'>{profileName}</div>
            </div>
        </div>
    )
}

export default Dashboard;