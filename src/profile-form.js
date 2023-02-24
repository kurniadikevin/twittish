import {  ref, uploadBytesResumable } from "firebase/storage";
import { set, getDatabase, ref as Dref, serverTimestamp} from 'firebase/database';
import storage from "./firebase";
import { useState } from "react";

const ProfileForm = (props) => {

    const [file,setFile]= useState('');
   console.log(props.userData);
    const closeProfileForm = ()=> {
        const profileForm = document.querySelector('#profile-form');
        profileForm.style.display = 'none';
        const profileTab = document.querySelector('.profile-tab');
        profileTab.style.background='rgb(30,30,30)';
    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }
            const storageRef = ref(storage, `/images/ProfilePicture-${props.uidImg}`);
            //alert('file uploaded');
            uploadBytesResumable(storageRef, file);
            // update alert on pop Up
                const popUp =document.querySelector('.sidebar-popup');
                popUp.style.display='grid';
                const popUpText = document.querySelector('#popup-text');
                popUpText.textContent='Image uploaded';
        }

    //write profile description database
    //write
function writeProfileDesc(userId, name, textData) {
    const db = getDatabase();
    set(Dref(db, `profileDesc/${userId}`), {
      userId : userId,
      username : name,
      desc : textData,
      createdAt :  Date(serverTimestamp()),
    });  
}
  
    const submitForm = ()=> {
        const nameInput = document.querySelector('#name-input');
        props.userData.displayName = nameInput.value;
        const descInput = document.querySelector('#desc-text');
        const descriptionData = descInput.value ? descInput.value : '';

        writeProfileDesc(props.userData.uid , props.userData.displayName, descriptionData);  
        console.log(props.userData);
        //close form
       closeProfileForm();
       // update alert on pop Up
       const popUp =document.querySelector('.sidebar-popup');
       popUp.style.display='grid';
       const popUpText = document.querySelector('#popup-text');
       popUpText.textContent='Profile Edited';
    }

    return(
        <div id="profile-form">
                <div className="profile-header">
                    <div >Profile Edit</div>
                    <div id="close-edit" onClick={closeProfileForm}>
                        X</div>    
                </div>
                <div className="name-cont">
                    <label>Name</label>
                    <input type='text' id="name-input" defaultValue={props.userData.displayName}></input>
                </div>
                <div className="desc-cont">
                    <label>Desc</label>
                    <textarea id='desc-text' rows='4' cols='30' name="desc-text"> 
                    </textarea>
                </div>
                <div className="pp-cont">
                    <label>Profile Picture</label>
                    <input type="file" onChange={handleChange} accept="/image/*" />
                    <button id="add-img-btn" onClick={handleUpload} type='file' accept="/image/*">
                        Add Image </button>
                   
                </div>
                <button id="profile-form-add" onClick={submitForm}>Add</button>
        </div>
    )
}

export default ProfileForm;