import {Link} from 'react-router-dom';

const Dashboard =() => {


    return(
        <div className='dashboard'>
            <div className='title-app' >
                <div >Twittish</div>
            </div>
            <nav className='nav-link'>
                <Link to = '/' className='class-link'>Home</Link>
                <Link to = '/profile' className='class-link'>Profile</Link>
                <Link to = '/message' className='class-link'>Message</Link>
                <Link to = '/signPage' className='class-link'>Sign-Page</Link> 
            </nav>
            <div className='profile-icon'>
                Profile Icon
            </div>
        </div>
    )
}

export default Dashboard;