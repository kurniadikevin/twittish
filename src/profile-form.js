
const ProfileForm = () => {

    return(
        <div className="profile-form">
                <div>Profile Edit</div>
                <div>
                    <label>Name</label>
                    <input type='text'></input>
                </div>
                <div>
                    <label>Description</label>
                    <textarea></textarea>
                </div>
                <div>
                    <label>Profile Picture</label>
                </div>
                <button>Add</button>
        </div>
    )
}

export default ProfileForm;