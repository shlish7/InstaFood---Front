import { Link } from 'react-router-dom'
import InstafoodIconLogo from '../assets/svg/InstaOr1.svg?react'

export function LoginPage() {

  return (
    <div className="login-page">
      <form action="submit" className="login-form">
        <section className="login-section">
        <InstafoodIconLogo className='signup-instafood-logo'/>

          <input type="text" className='login-user-name' placeholder='Phone number, username, or email' />
          <input type="password" className='login-password' placeholder='Password' />
          <button className="login-btn">Log in</button>
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

