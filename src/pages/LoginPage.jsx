import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import InstafoodIconLogo from '../assets/svg/InstaOr1.svg?react'
import { login } from '../store/user.actions'


export function LoginPage() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()


  function onHandleChange({ target }) {
    const { value, id } = target
    console.log('value',value);
    console.log('id',id);
    console.log('target',target);

    switch(id){
        case 'userName':
            setUserName(value)
                break;
        case 'password':
            setPassword(value)
            break;
    }
    
}


async function onLoginUser(ev){
  ev.stopPropagation()
  ev.preventDefault()

  try {
      console.log('username',username);
      console.log('password',password);
      const loginResult = await login({username, password})
      console.log('loginResult',loginResult);
      navigate('/')
  } catch (err) {
      console.log('Faild to log in:', err);

  }
}

  function onShowPassword() {
    setShowPassword(prev => !prev)
}

  return (
    <div className="login-page">
      <form action="submit" className="login-form">
        <section className="login-section">
          <InstafoodIconLogo className='signup-instafood-logo' />

          <input type="text"  value={username} onChange={onHandleChange} id='userName' className='login-user-name' placeholder='Phone number, username, or email' />
          <input type={showPassword ? 'text' : 'password'} onChange={onHandleChange} id='password' className='login-password' placeholder='Password' />
          <div className="show-password-container">
            <input type="checkbox" className="show-password" onChange={onShowPassword} />
            <label htmlFor="checkbox" className='password-checkbox-label'>Show Password?</label>
          </div>
          <button className="login-btn" onClick={onLoginUser}>Log in</button>
        </section>
      </form>
      <section className="dont-have-account">
        <span className="dont-have-account-span">
          Don't have an account? <Link to='/signup' className='link-to-signup'>Signup</Link>
        </span>
      </section>
    </div>
  )
}

