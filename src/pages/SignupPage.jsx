
import { Link, Navigate, useNavigate } from 'react-router-dom'
import InstafoodIconLogo from '../assets/svg/InstaOr1.svg?react'
import { useState } from 'react'
import { signup } from '../store/user.actions'

export function SignupPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullName] = useState('')
  const [username, setUserName] = useState('')
  const [credentials, setCredentials] = useState([])

  const navigate = useNavigate()

  function onHandleChange({ target }) {
    const { value, id } = target
    console.log('value',value);
    console.log('id',id);
    console.log('target',target);

    switch(id){
        case 'email':
            setEmail(value)
                break;
        case 'password':
            setPassword(value)
            setCredentials({...credentials,password: value })
                break;
        case 'fullName':
            setFullName(value)
            setCredentials({...credentials,fullname: value })
                break;
        case 'userName':
            setUserName(value)
            setCredentials({...credentials,username: value })
                break;
    }
}


async function onSignup(ev = null) {
  try{
    if (ev) ev.preventDefault()
      if (!credentials.username || !credentials.password || !credentials.fullname) return
      // props.onSignup(credentials)
      console.log('credentials',credentials);
      signup(credentials)
      // clearState()
      navigate("/")
  }
  catch(err){
    console.log('Can\'t sign up ',err);
  }

}


  return (
    <div className="signup-page">
      <form action="submit" className="signup-form">
        <section className="signup-section">
        <InstafoodIconLogo className='signup-instafood-logo'/>
          <input type="text" value={email} onChange={onHandleChange} id='email' className='signup-email' placeholder='Phone number, username, or email' />
          <input type="password" value={password} onChange={onHandleChange} id='password' className='signup-password' placeholder='Password' />
          <input type="text" value={fullname} onChange={onHandleChange} id='fullName' className='signup-full-name' placeholder='Full Name' />
          <input type="text" value={username} onChange={onHandleChange} id='userName' className='signup-user-name' placeholder='User Name' />
          <button className="signup-btn" onClick={onSignup}>Sign up</button>
        </section>
      </form>
      <section className="have-account" >
          <span className="have-account-span">
          have an account? <Link to='/login' className='link-to-log-in'>Log in</Link>
          </span>
      </section>
    </div>
  )
}

