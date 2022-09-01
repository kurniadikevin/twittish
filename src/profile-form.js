import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "./firebase";
import { useState } from "react";

const ProfileForm = (props) => {

    const [file,setFile]= useState('');
   
    const closeProfileForm = ()=> {
        const profileForm = document.querySelector('#profile-form');
        profileForm.style.display = 'none';
    }

    function handleChange(event) {
        setFile(event.target.files[0]);
    }

    function handleUpload() {
        if (!file) {
            alert("Please choose a file first!")
        }
            const storageRef = ref(storage, `/images/ProfilePicture-${props.uidImg}`);
            alert('file uploaded');
            uploadBytesResumable(storageRef, file);
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
                    <input type='text' id="name-input"></input>
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
                        Add image</button>
                   
                </div>
                <button id="profile-form-add">Add</button>
        </div>
    )
}

export default ProfileForm;