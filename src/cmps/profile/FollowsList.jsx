import { useEffect, useState } from 'react'
import MagnifyingGlassIcon from '../../assets/svg/magnifying-glass.svg?react';
import CloseModalIcon from '../../assets/svg/close-btn-white.svg?react';
import RemoveSearchIcon from '../../assets/svg/remove-search-icon.svg?react';
import { userService } from '../../services/user.service.remote';
import { loadUsers, updateUser } from '../../store/user.actions';
import ImageAvatars from '../ImageAvatars';
import { useNavigate } from 'react-router';

export default function FollowsList({ onCloseModal, user, followType , onUserUnfollowed}) {
  const [displayIcon, setDisplayIcon] = useState(true)
  const [searchTxt, setSearchTxt] = useState('')
  const [followers, setFollowers] = useState([])
  const [filterToEdit, setFilterToEdit] = useState(userService.getDefaultFilter())
  const [filteredUsers, setFilteredUsers] = useState(followers)
  const [following, setFollowing] = useState([])

  const navigate = useNavigate()

  // console.log('user',user);
  // console.log('followers', followers);
  console.log('following on unfollow',following);


  useEffect(() => {
    loadUsers()
    user && followType === "Following" ? getFollowing() : getFollowers()
  }, [user])

  useEffect(() => {
    const { username, fullname } = filterToEdit

    const newFilteredUsers = followers?.filter(item => {
      const usernameMatch = item?.username.toLowerCase().includes(username.toLowerCase())
      const fullnameMatch = item?.fullname.toLowerCase().includes(fullname.toLowerCase())

      return usernameMatch || fullnameMatch;
    });
    setFilteredUsers(newFilteredUsers);
  }, [filterToEdit, followers, following])

  async function getFollowers() {
    const followers = await Promise.all(
      user?.followers?.map(async (item) => {
        const follower = await userService.getById(item)
        return follower
      })
    );

    setFollowers(followers)
  }

  async function getFollowing() {
    const following = await Promise.all(
      user.following.map(async (item) => {
        const follow = await userService.getById(item)
        return follow
      })
    );
    setFollowers(following)
  }

  function onHandleChange({ target }) {
    const value = target.value
    setFilterToEdit({ ...filterToEdit, username: value, fullname: value })

  }

  function onClearSearch() {
    setFilterToEdit({ ...filterToEdit, username: '', fullname: '' })
  }

  function onClosefollowsModal(ev) {
    ev.stopPropagation()
    ev.preventDefault()
    onCloseModal()
  }

  function onFocus() {
    setDisplayIcon(prev => !prev)
  }
  function onBlur() {
    setDisplayIcon(prev => !prev)
  }

  function onNavigateToUserProfile(userId) {
    onCloseModal()
    navigate("/" + userId)
  }

  async function onUnfollowing(userId) {
    console.log('userId', userId);
    console.log('loggedIn user', user._id);
    // console.log('followers', followers);
    // console.log('user',user);
    // const updatedFollowingList = followers.filter(user => {
    //   return user._id !== userId
    // })
    const updatedFollowingList = user?.following?.filter(user => {
      console.log('user',user);
      console.log('userId', userId);

      return user !== userId
    })
    console.log('following list', ...updatedFollowingList);
    // setFollowing(...user.following, ...updatedFollowingList)
    // setFollowers(...user.following, ...updatedFollowingList)
    // setFilteredUsers(updatedFollowingList)
    // await updateUser({ ...user, following: updatedFollowingList });
    console.log('updated user',user)
    await updateUser({ ...user, following: updatedFollowingList });
    const updatedUser =({ ...user, following: updatedFollowingList })
    onUserUnfollowed(updatedUser)
  }


  async function onRemoveFollower(userId) {
    const updatedFollowersList = user?.followers?.filter(user => {
      return user !== userId
    })
    await updateUser({ ...user, followers: updatedFollowersList })
    const updatedUser =({ ...user, followers: updatedFollowersList })
    onUserUnfollowed(updatedUser)
  }


  return (
    <section className='follows-modal'>
      <section className='follows-modal-section'>
        <span className='follows-modal-title'>{followType}</span>
        <CloseModalIcon onClick={onClosefollowsModal} />
      </section>

      <section className="search-follows-section">
        {displayIcon && searchTxt === '' && <MagnifyingGlassIcon className='magnifying-glass-icon' />}
        <input type="text" className="input-search-follows"
          placeholder={displayIcon ? '    Search' : 'Search'}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onHandleChange}
          value={filterToEdit.fullname}
        />
        {searchTxt !== '' && <RemoveSearchIcon className='remove-search' onClick={onClearSearch} />}
      </section>

      <section className="follows-modal-body">
        <ul className='follows-ul-modal'>
          {filteredUsers.map((item, idx) => {
            return <li key={idx} className='follows-list'>
              <section className="avatar-and-user-name">
                <ImageAvatars img={item.imgUrl} />
                <section className="followers">
                  <p className='follow-list-user-name' onClick={() => onNavigateToUserProfile(item._id)}>{item.username}</p>
                  <p className='follow-list-full-name'>{item.fullname}</p>
                </section>
              </section>
              <button className='remove-follow-btn' onClick={() =>{
                followType.toLowerCase()==="following"? onUnfollowing(item._id) : onRemoveFollower(item._id)
                }}>{followType.toLowerCase()==="following" ? "Following" : "Remove"}</button>
            </li>
          })}
        </ul>
      </section>
    </section>
  )
}