import './sign-page.css';
import { getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword  } from "firebase/auth";
/* import { app } from './firebase.js'; */
import {useNavigate} from 'react-router-dom';
import { useCallback, useState } from 'react';
import { PopUpAlert } from '../../components/popup/popup';

const SignPage = ()=> {

 //sign up function   
 const signUpNewUser = () => {
    let email = document.querySelector('#user-email').value;
    let password = document.querySelector('#user-password').value;
    let userName = document.querySelector('#user-username').value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        user.displayName = userName;
        console.log(user);
        redirectFunc();
       
        // update alert on pop Up
        const popUp =document.querySelector('.sidebar-popup');
        popUp.style.display='grid';
        const popUpText = document.querySelector('#popup-text');
        popUpText.textContent='Account created!';
})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // update alert on pop Up
        const popUp =document.querySelector('.sidebar-popup');
        popUp.style.display='grid';
        const popUpText = document.querySelector('#popup-text');
        popUpText.textContent=errorCode + errorMessage;
      });
 }
    
    //log in function
    const logInUser = () => {
        let email = document.querySelector('#user-email').value;
        let password = document.querySelector('#user-password').value;
        let userName = document.querySelector('#user-username').value;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            user.displayName = userName;
            console.log(user);
            redirectFunc();
            //alert('sign in succesfully'); 
             // update alert on pop Up
            const popUp =document.querySelector('.sidebar-popup');
            popUp.style.display='grid';
            const popUpText = document.querySelector('#popup-text');
            popUpText.textContent='Log in succesful!';
       
                  
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //alert(errorCode + errorMessage);//
            // update alert on pop Up
            const popUp =document.querySelector('.sidebar-popup');
            popUp.style.display='grid';
            const popUpText = document.querySelector('#popup-text');
            popUpText.textContent=errorCode + errorMessage;
        });
    }

      //log in testAccount
      const logInTestAccount = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, 'testAccount@gmail.com', '123123')
        .then((userCredential) => {
            // Signed in with test account
            const user = userCredential.user;
            user.displayName = 'TestAccount';
            redirectFunc();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + errorMessage);//
        });
    }

    //redirect function
    const navigate = useNavigate();
    const redirectFunc = useCallback(() => navigate('/', {replace: true}), [navigate]);
    

    return(
        <div className="sign-page">

            <div className="sign-box">
                    <div className="sign-title">
                        <div>Twittish</div>
                    </div>
                <div className='sign-wrapper'>
                    <div className='sign-desc'>Create Account or Login Account</div>
                    <div className='username-cont'>
                        <label>Username</label>
                        <input type={'text'} id='user-username'></input>
                    </div>
                    <div className='email-cont'>
                        <label>Email</label>
                        <input type={'email'} id='user-email'></input>
                    </div>
                    <div className='password-cont'>
                        <label>Password</label>
                        <input type={'password'} id='user-password'></input>
                    </div>

                    <div className='button-cont'>
                        <div className='button-wrapper'>
                        
                            <button className='signUp-btn' onClick={signUpNewUser}>
                             Create Account</button>
                        
                        
                            <button className='logIn-btn' onClick={logInUser}
                            >Login Account</button>
                        
                        </div>
                        <div className='button-test-wrapper'>
                            <button className='logIn-test-account' onClick={logInTestAccount}>
                                Log in testAccount
                            </button>
                        </div>
                    </div>
                </div>
             <div className='bottom-desc'>
             <div>Background image by <a id='credits-link' href='https://unsplash.com/@nate_dumlao'>Nathan Dumlao</a></div>
             <a href="https://github.com/kurniadikevin/twittish">
                 <i class="fa fa-github" id='github-logo'></i> 
             </a>
             </div>
            </div>
            <PopUpAlert/>
        </div>
    )
}

export default SignPage;