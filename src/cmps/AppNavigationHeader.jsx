import React from 'react'
import InstagramIconLogo from '../assets/svg/InstaOr1.svg?react'
import MessagesIcon from '../assets/svg/messages-icon.svg?react'



export default function AppNavigationHeader() {
  return (
    <section className='app-nav-header'>
        <InstagramIconLogo/>
        <MessagesIcon/>
    </section>
  )
}
