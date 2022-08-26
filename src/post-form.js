
const PostForm =() =>{

    return(
       <div className='post-form'>
            <label id="post-label">Twit</label>
            <textarea id="post-text" rows='4' cols='30' name="post-text">
                Write something you want to post
            </textarea>
           <div className="publish-icon">
            <span class="material-symbols-outlined">
                publish
            </span>
           </div>
        </div>
    )
}

export default PostForm;