import './sign-page.css';

const SignPage = ()=> {

    return(
        <div className="sign-page">

            <div className="sign-box">
                    <div className="sign-title">
                        <div>Twittish</div>
                    </div>
                    <div className='email-cont'>
                        <label>Email</label>
                        <input type={'email'}></input>
                    </div>
                    <div className='password-cont'>
                        <label>Password</label>
                        <input type={'password'}></input>
                    </div>

                    <div className='button-cont'>
                        <div className='button-wrapper'>
                        <button className='signUp-btn'>Sign Up</button>
                        <button className='logIn-btn'>Log in</button>
                        </div>
                    </div>
            
            </div>
        </div>
    )
}

export default SignPage;