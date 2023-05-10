import './popup.css';

export const PopUpAlert=()=>{

         //close pop-up text
 const closePopUp = ()=>{
    const popUp =document.querySelector('.sidebar-popup');
    popUp.style.display='none';
  }
    return(
        <div className='sidebar-popup'>
            <div id='popup-close' onClick={closePopUp}>x</div>
            <div id='popup-text'>pop up text</div>
        </div>
    )
}