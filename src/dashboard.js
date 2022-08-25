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
            </nav>
        </div>
    )
}

export default Dashboard;