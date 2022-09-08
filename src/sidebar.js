import './sidebar.css';
import { useState } from 'react';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const Sidebar =(props) => {

    const [searchResult, setSearchResult] = useState();

    const onChangeValue = () => {
        const searchInputVal = document.querySelector('#search-query').value;
        console.log(searchInputVal);
        const postData = props.data;
        //console.log(postData);
        const searchOutput = postData.filter((item)=> {
            return item.username === searchInputVal;
        })
        console.log(searchOutput);
        setSearchResult(searchOutput); 
    }

    const submitSearch = () => {
        console.log(searchResult);
       const displayResult = searchResult.map((data)=>
       <div>
            <div>{data.username}</div>
            <div>{data.twit}</div>
       </div>
      );

      
       console.log(displayResult);
       const resultCont = document.querySelector('.display-result-cont');
       resultCont.innerHTML= displayResult;
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
            <div className='display-result-cont'>
              
            </div>
            
        </div>
    )
}

export default Sidebar;