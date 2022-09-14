import './sidebar.css';
import { useState } from 'react';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const Sidebar =(props) => {

    const [searchResult, setSearchResult] = useState([]);

    const onChangeValue = () => {
        const searchInputVal = document.querySelector('#search-query').value;
        console.log(searchInputVal);
        const postData = props.data;
        //console.log(postData);
        const searchOutput = postData.filter((item)=> {
            return   item.username === searchInputVal ;
           
            //item.includes(searchInputVal);
        })
        console.log(searchOutput);
        setSearchResult(searchOutput); 
    }

    const submitSearch = () => {
        const resultCont = document.querySelector('.display-result-cont');
        console.log(searchResult);
       const displayResult = searchResult.map(function(item){
          return( ` <div class='cont-result'>
                        <div class='user-result'>${item.username}</div>
                        
                        <div class='twit-result'>${item.twit}</div>
                  </div>`
            )
       }
      );
       
       resultCont.innerHTML=  displayResult.join('');
       resultCont.style.display='block';
    }

    const leaveSearchResult = ()=>{
        const resultCont = document.querySelector('.display-result-cont');
        resultCont.style.display='none';
    } 

     //close pop-up text
 const closePopUp = ()=>{
    const popUp =document.querySelector('.sidebar-popup');
    popUp.style.display='none';
  }


    return (
        <div className="sidebar">
            <div className="search-bar-cont">
                <div className='search-title'>Search</div>
                <div className='search-cont'>
                    <input type='text' id="search-query" placeholder="Find something" 
                    onChange={onChangeValue}>
                    </input>
                    <button id='search-btn' onClick={submitSearch}>
                        <span class="material-symbols-outlined">
                        search
                        </span>
                    </button>
                </div>
            </div>
            <div className='display-result-cont' onMouseLeave={leaveSearchResult}>     
                    
            </div>

            <div className='sidebar-main'>
            <div className='sidebar-popup'>
                      <div id='popup-close' onClick={closePopUp}>x</div>
                      <div id='popup-text'>pop up text</div>
              </div>
            </div>

            <div className='sidebar-footer'>
              <div>WebApp by Kevin Kurniadi </div>
              <div>  
                <a href='https://github.com/kurniadikevin'>
                  <i class="fa fa-github" id='github-logo'  href="https://github.com/kurniadikevin"></i> 
                </a>
             </div>
            </div>
        </div>
    )
}

export default Sidebar;