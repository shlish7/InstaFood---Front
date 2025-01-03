import React, { useState } from 'react'
import InstafoodIconLogo from '../../assets/svg/InstaOr1.svg?react'
import CloseModalIcon from '../../assets/svg/close-btn-white.svg?react'
import { login } from '../../store/user.actions'

export default function SwitchUser({ onCloseModal }) {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    async function onLoginUser(ev){
        ev.stopPropagation()
        ev.preventDefault()

        try {
            console.log('username',username);
            console.log('password',password);
            const loginResult = await login({username, password})
            console.log('loginResult',loginResult);
            onCloseModal()

        } catch (err) {
            console.log('Faild to log in:', err);

        }
    }

    function onHandleChange({ target }) {
        const { value, id } = target
        // console.log('value',value);
        // console.log('field',field);
        // console.log('type',type);
        // console.log('target',target);
        // console.log('className',className);
        switch(id){
            case 'userName':
                setUserName(value)
                    break;
            case 'password':
                setPassword(value)
                break;
        }
        
    }

    function onClickX(ev) {
        ev.stopPropagation()
        ev.preventDefault()
        onCloseModal()
    }

    function onShowPassword() {
        setShowPassword(prev => !prev)
    }

   
    return (
        <div className="switch-user-modal">

            <CloseModalIcon className='close-modal' onClick={onClickX} />
            <form action="submit" className="switch-user-form">
                <section className="switch-user-section">
                    <InstafoodIconLogo className='switch-user-instafood-logo' />
                    <input type="text" value={username} onChange={onHandleChange} id='userName' className='switch-user-name' placeholder='Phone number, username, or email' />
                    <input type={showPassword ? 'text' : 'password'} onChange={onHandleChange} value={password} id='password' className='switch-password' placeholder='Password' />
                    <div className="show-password-container">
                        <input type="checkbox" className="show-password" onChange={onShowPassword} />
                        <label htmlFor="checkbox" className='password-checkbox-label'>Show Password?</label>
                    </div>
                    <button type ='button' className="login-btn" onClick={onLoginUser}>Log in</button>
                </section>
            </form>
        </div>
    )
}
