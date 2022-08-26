
const PostForm =(props) =>{

    return(
       <div className='post-form'>
            <label id="post-label"></label>
            <textarea id="post-text" rows='4' cols='30' name="post-text"
            placeholder="Write something you want to post">
            </textarea>
            <div className="post-bottom">
                <div className="username-form">{props.username}</div>
                <div className="publish-icon">
                   <span class="material-symbols-outlined">
                    publish
                    </span>
                </div>
           </div>
        </div>
    )
}

export default PostForm;