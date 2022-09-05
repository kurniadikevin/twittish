import './sidebar.css';


const Sidebar =() => {



    return (
        <div className="sidebar">
            <div className="search-bar-cont">
                <div className='search-title'>Search</div>
                <div className='search-cont'>
                    <input type='text' id="search-query" placeholder="Find something" >

                    </input>
                    <button id='search-btn'>
                        <span class="material-symbols-outlined">
                        search
                        </span>
                    </button>
                </div>
            </div>
            <div>
                Result here...
            </div>
            
        </div>
    )
}

export default Sidebar;