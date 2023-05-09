import Dashboard from "../../components/dashboard";
import '../profile/profile.css';
import Sidebar from "../../components/sidebar/sidebar";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDatabase, ref, child, get, off} from "firebase/database";





const ProfileVisit = (props)=> {

    const [ profilePost, setProfilePost] = useState([]);// 
    const [ profileDesc, setProfileDesc] = useState('');
    const [postData, setPostData] = useState([]);
    
    const [itemUser, setItemUser] = useState({});
    const {type} = useParams();
    
    const location= useLocation();
    //console.log(props);
    //console.log(location, " useLocation Hook");
    const data = location.state?.data;
    console.log(data);
   

      // Read data for profile home
      const dbRef = ref(getDatabase());
      const readFunc = () => {
      get(child(dbRef, 'post')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          let arrData = Object.keys(data).map(function(key) {
            return data[key];
            });
         
          const newData = arrData.reverse();
          setPostData(newData);
          const filteredData = newData.filter((data)=>{
            return  data.userId === itemUser.userId || data.retweetUid === itemUser.userId;
        })
        setProfilePost(filteredData);
        //loader
        const loader = document.querySelector('.lds-roller');
        loader.style.display='none';  

        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }

  // display form for replay each specific element
  const displayReplyForm = (index,ev)=> {
    const replyForm = document.querySelectorAll('#reply-form');
    if (ev.target.value === 'OFF'){
        ev.target.value = 'ON';
        replyForm[index].style.display='block';  
    } else {
        ev.target.value = 'OFF';
        replyForm[index].style.display='none';  
    }
  }

      //render data
      let renderListData =  profilePost.map((item,index)=>
<div className="main-content">
            <div className="row1-content">
              <img src={item.profileImg} id="profPic-content" alt="ppImage"/>
              <div className="username-content">{item.username}</div> 
            </div>
            <div className="row2-content">
              <div className="twit-content">{item.twit}</div>
              <div className="date-content">{item.createdAt}</div> 
              <div className="retweetBy-content">{item.retweetBy}</div>
            </div>
            <div className="icon-cont">
                <span class="material-symbols-outlined">
                mode_comment
                  </span>
                  <span class="material-symbols-outlined" id="reply-icon" 
                  onClick={(event)=> displayReplyForm(index,event)} value='OFF'>
                  reply
                  </span>
                  <span class="material-symbols-outlined">
                  repeat
                  </span>

                <div id="reply-form">
                    <div id="reply-header">Replying to {item.username}</div>
                    <textarea id="reply-input" rows={4} cols={35}></textarea>
                    <button id="reply-btn" >
                      Reply</button> 
                </div>
            </div>
        </div>
    )
    
   
  

  // read data for profile description
  const readDesc = ()=>{
    get(child(dbRef, `profileDesc/${itemUser.userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setProfileDesc(data.desc);
    
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  readDesc();
  


  useEffect(()=> {
    setItemUser(data);
    readFunc();
  },[itemUser])


    return(
        <div className="profile-tab">

            <Dashboard   pageSelected={1}/>

            <div className="profile-page">
                <div className="profile-head">
                    <div className="profile-side">
                        <div className="picture-cont">
                          <img id="profile-pic-prof" src={itemUser.profileImg}
                          alt='IMG NOT LINK YET!!!'/>
                        </div>
                        
                    </div>

                    <div className="profile-main">
                            <div className="profile-name">{itemUser.username}</div>
                            <div className="profile-desc">{profileDesc}</div>
                            <button id="follow-btn">Follow</button>
                    </div>
                </div>

                <div className="profile-body">
                  
                    <div className="content-cont">
                      {renderListData}
                    </div>
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
   
                
                </div>
            </div>

            < Sidebar  data={postData}/>    
        </div>
    )
}

export default ProfileVisit;