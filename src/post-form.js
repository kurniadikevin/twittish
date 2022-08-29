import { getDatabase, ref, set, get,onValue,  push, on } from "firebase/database";
import { FirebaseApp } from "firebase/app";


const PostForm =(props) =>{

    const postText = document.querySelector('#post-text');

  const  publishTwit = async () =>{
        let myPromise = new Promise(
             function(resolve){
            resolve((postText.value));
        })
        let inputText = await myPromise;
        writeUserData(props.userId, props.username, inputText);
        alert(props.userId + props.username + inputText);      
  }

//write
function writeUserData(userId, name, textData) {
            const db = getDatabase();
            push(ref(db, 'post/'), {
              userId : userId,
              username : name,
            twit : textData,
            });  
        }




    return(
       <div className='post-form'>
            <label id="post-label"></label>
            <textarea id="post-text" rows='4' cols='30' name="post-text"
            placeholder="Write something you want to post">
            </textarea>
            <div className="post-bottom">
                <div className="username-form">{props.username}</div>
                <div id="publish-icon" onClick={publishTwit}>
                   <span class="material-symbols-outlined">
                    publish
                    </span>
                </div>
           </div>
        </div>
    )
}

export default PostForm;