
import { Link } from 'react-router-dom'
import InstafoodIconLogo from '../assets/svg/InstaOr1.svg?react'

export function SignupPage() {

  return (
    <div className="signup-page">
      <form action="submit" className="signup-form">
        <section className="signup-section">
        <InstafoodIconLogo className='signup-instafood-logo'/>
          <input type="text" className='signup-email' placeholder='Phone number, username, or email' />
          <input type="password" className='signup-password' placeholder='Password' />
          <input type="text" className='signup-full-name' placeholder='Full Name' />
          <input type="text" className='signup-user-name' placeholder='User Name' />
          <button className="signup-btn">Sign up</button>
        </section>
      </form>
      <section className="have-account">
          <span className="have-account-span">
          have an account? <Link to='/login' className='link-to-log-in'>Log in</Link>
          </span>
      </section>
    </div>
  )
}

