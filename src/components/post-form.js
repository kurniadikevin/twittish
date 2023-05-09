import { getDatabase, ref, set, get,onValue,  push, on, serverTimestamp } from "firebase/database";
import {  useState } from "react";
import storage from "../firebase";
import {  ref as ImgRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const PostForm =(props) =>{

  const[file,setFile]= useState('');
  const [picNum,setPicNum] = useState();
  const [picUrl, setPicUrl] = useState('');


  const postText = document.querySelector('#post-text');

  // remove postForm
    const removePostForm = ()=> {
      const postForm = document.querySelector('.post-form');
      postForm.style.display= 'none'; // disable post form after publish twit      
      const profileTab = document.querySelector('.app-tab');
      profileTab.style.background='rgb(30,30,30)';
    }


//write
function writeUserData(userId, name, textData,postImageUrl) {
            const db = getDatabase();
            push(ref(db, 'post/'), {
              userId : userId,
              username : name,
              twit : textData,
              createdAt :  Date(serverTimestamp()),
              profileImg : props.ppUrl,
              postImage : postImageUrl

            });  
        }

        // delegate click icon to input file that hidden
  const delegateClickImage= ()=>{
    const inputFile= document.querySelector('#input-file-img');
    inputFile.click();
  }

  //handle change for input image
  function handleChange(event) {
    setFile(event.target.files[0]);  
}

 function handleUpload () {
  if (!file) {
      alert("Please choose a file first!")
        // update alert on pop Up
        const popUp =document.querySelector('.sidebar-popup');
        popUp.style.display='grid';
        const popUpText = document.querySelector('#popup-text');
        popUpText.textContent=`Failed to load Image`;
  } 
      console.log(file);
      let randomNum = Math.floor(Math.random() * 10000);
      const storageRef = ImgRef(storage,`/post_images/postPicture_${randomNum}`);
      //alert(`Image name ${file.name} loaded`);
      uploadBytesResumable(storageRef, file);
      // update alert on pop Up
          const popUp =document.querySelector('.sidebar-popup');
          popUp.style.display='grid';
          const popUpText = document.querySelector('#popup-text');
          popUpText.textContent=`Image ${file.name} loaded`;
      setPicNum(randomNum);  
      setPicUrl('true');
 }
   

const  publishTwit = async () =>{

  
  let myPromise = new Promise(
    function(resolve){
    resolve((postText.value));
    })
    let inputText = await myPromise;

    if(picUrl ==='true'){
      // get image url
      getDownloadURL(ImgRef(storage, `/post_images/postPicture_${picNum}`))
      .then((url) => {
        console.log(url);
        writeUserData(props.userId, props.username, inputText,url);
        setPicUrl('');
        removePostForm();

        // update alert on pop Up
        const popUp =document.querySelector('.sidebar-popup');
        popUp.style.display='grid';
        const popUpText = document.querySelector('#popup-text');
        popUpText.textContent='Twit successfully posted!';
        
              
    })
  } else{
      writeUserData(props.userId, props.username, inputText,'');
      setPicUrl('')
      removePostForm();
      // update alert on pop Up
      const popUp =document.querySelector('.sidebar-popup');
      popUp.style.display='grid';
      const popUpText = document.querySelector('#popup-text');
      popUpText.textContent='Twit successfully posted!';
      
  }
}

    return(
       <div className='post-form'>
                <div className="post-top">
                    <div id="close-icon" onClick={removePostForm}><span class="material-symbols-outlined">
                            close
                          </span> 
                    </div>
                </div>
                  <label id="post-label"></label>
                  <textarea id="post-text" rows='4' cols='30' name="post-text"
                  placeholder="Write something you want to post">
                  </textarea>
            <div className="post-bottom">
                <div className="username-form">{props.username}</div>

                <div className="icon-bottom">
                    <div id="publish-icon" onClick={publishTwit}>
                      <span class="material-symbols-outlined"/>

              
                <div className="input-cont">
                  <div>
                    <span class="material-symbols-outlined" id="input-file-img-click"
                    onClick={delegateClickImage}
                    /*  onClick={document.getElementById('input-file-img').onClick()} */ >
                      add_photo_alternate</span> 
                    <input type="file" id="input-file-img" accept="/image/*" 
                    onClick={handleChange }/>
                    
                    <button id="add-img-btn" onClick={handleUpload} type='file' accept="/image/*">
                        Add </button>

                    </div>
                    <div id="publish-icon" onClick={publishTwit}>
                        <span class="material-symbols-outlined">

                        publish
                        </span>
                    </div>
                </div>
           </div>
        </div>
      </div>
      </div>
    )
}

export default PostForm;