import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import HomeIcon from '../assets/svg/home/home-icon.svg?react'
import HomeBoldIcon from '../assets/svg/home/home-bold-icon.svg?react'

// import InstagramIconLogo from '../assets/svg/instagram-nav-bar-logo.svg?react'
import InstagramIconLogo from '../assets/svg/InstaOr1.svg?react'
import InstagramNarrowLogo from '../assets/svg/instagram-icon-logo.svg?react'
import SearchIcon from '../assets/svg/search-icon.svg?react'
import ExploreIcon from '../assets/svg/explore-icon.svg?react'
import ReelsIcon from '../assets/svg/reels-icon.svg?react'
import MessagesIcon from '../assets/svg/messages-icon.svg?react'
import NotificationsIcon from '../assets/svg/notifications-icon.svg?react'
import CreateIcon from '../assets/svg/create-icon.svg?react'
import ThreadsIcon from '../assets/svg/threads-icon.svg?react'
import MoreIcon from '../assets/svg/more-icon.svg?react'
import ImageAvatars from './ImageAvatars.jsx'
import { CreatePost } from './CreatePost.jsx'
import { SearchBar } from './SearchBar.jsx'
import { setMenuItem } from '../store/feedItem.actions.js'
import { loadUsers } from '../store/user.actions.js'



export default function AppNavigation({ chat = false }) {
  const user = useSelector(storeState => storeState.userModule.user)
  const activeOption = useSelector(storeState => storeState.feedItemModule.currentMenu)
  const [openModal, setOpenModal] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [narrowBar, setNarrowBar] = useState(false)
  const [openSerachBar, setOpenSearchBar] = useState(false)
  const [mobileView, setMobileView] = useState(false)

  const searchBarRef = useRef(null)

  console.log('narow', narrowBar);


  useEffect(() => {
    loadUsers()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpenSearchBar(false) // Close the search bar on Esc or Enter
        setNarrowBar(false)
      }
    }

    const handleClickOutside = (event) => {
      // Close the search bar if the click is outside the search bar
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setOpenSearchBar(false)
        setNarrowBar(false)

      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup the listeners
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])



  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is less than 1264px
      const isSmallScreen = window.innerWidth < 1264
      // setIsSmallScreen(window.innerWidth < 1264)
      setNarrowBar(isSmallScreen || chat)  // Update the state based on the screen size
      setIsSidebarOpen(window.innerWidth >= 768) // Adjust the sidebar visibility as needed

    }

    // Initial check on component mount
    handleResize()

    // Add resize event listener
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function onOpenSearchBar(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    setOpenSearchBar(true)
    setNarrowBar(true)
  }

  function onOpenModal(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    setOpenModal(true)
  }

  function onCloseModal() {
    setOpenModal(prev => !prev)
  }

  return (
    <>
      <section className='nav-bar-container' >
        <ul className='nav-bar-ul'>
          <section className="left-nav-bar-header">
            {(!narrowBar ?
              (
                <section className='insta-logo' >
                  <InstagramIconLogo />
                </section>)
              :
              (<section className='insta-logo' >
                <InstagramNarrowLogo />
              </section>)
            )}
          </section>
          <div className="nav-bar-subcontainer">
            <section className="left-nav-bar-main">
              <li className='nav-li '><Link className='nav-link' to='/'><HomeIcon /><div className='nav-option-name'>Home</div></Link></li>
              <li className={!narrowBar ? 'nav-li search' : 'nav-li-no-gap search'}
                onClick={onOpenSearchBar}>
                {
                  openSerachBar ?
                    <div ref={searchBarRef}>
                      <SearchBar />
                    </div> : ''
                }
                <SearchIcon /><div className='nav-option-name'>Search</div></li>
              <li className='nav-li explore'><Link className='nav-link' to='/explore'><ExploreIcon /><div className='nav-option-name'>Explore</div></Link></li>
              <li className='nav-li reels'><ReelsIcon /><div className='nav-option-name'>Reels</div></li>
              <li className='nav-li'><Link className='nav-link' to='messages'><MessagesIcon /><div className='nav-option-name'>Messages</div></Link></li>
              <li className='nav-li notification'><NotificationsIcon /><div className='nav-option-name'>Notifications</div></li>
              <li className='nav-li' onClick={onOpenModal}><CreateIcon /><div className='nav-option-name'>Create</div></li>
              <li className='nav-li'><Link className='nav-link' to={'/' + user?._id}><ImageAvatars avatarSource={'navigation-avatar'} img={user?.imgUrl || null} /><div className='nav-option-name'>Profile</div></Link></li>
            </section>
            <section className='left-nav-bar-footer'>
              <li className='nav-li threads'><ThreadsIcon /><div className='nav-option-name'>Threads</div></li>
              <li className='nav-li more'><MoreIcon /><div className='nav-option-name'>More</div></li>
            </section>
          </div>

        </ul>
        {openModal ? <CreatePost onCloseModal={onCloseModal} /> : null}
      </section>
    </>

  )
}


