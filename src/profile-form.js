
const ProfileForm = () => {

    const closeProfileForm = ()=> {
        const profileForm = document.querySelector('#profile-form');
        profileForm.style.display = 'none';
       
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
                    <button id="add-img-btn">Add image</button>
                </div>
                <button id="profile-form-add">Add</button>
        </div>
    )
}

export default ProfileForm;