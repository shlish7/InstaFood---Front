import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageAvatars from "../ImageAvatars";
import FollowsList from "./FollowsList";

export default function ProfileHeader({ feedItems, user, onUserUnfollowed }) {

  const [profileFeedItems, setProfileFeedItems] = useState()
  const [displayFollowersModal, setDisplayFollowersModal] = useState(false)
  const [displayFollowingModal, setDisplayFollowingModal] = useState(false)

  useEffect(() => {
    const userFeedItemsCount = feedItems?.filter(feedItem => feedItem.owner._id === user._id).length;
    setProfileFeedItems(userFeedItemsCount)

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        console.log('displayFollowersModal',displayFollowersModal);
        displayFollowersModal ? setDisplayFollowersModal(false) : null
        displayFollowingModal ? setDisplayFollowingModal(false) : null
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        displayFollowersModal ? setDisplayFollowersModal(false) : null
        displayFollowingModal ? setDisplayFollowingModal(false) : null 
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [displayFollowersModal, displayFollowingModal]);



  function onCloseModal() {
    setDisplayFollowersModal(false)
    setDisplayFollowingModal(false)
  }

  function onOpenFollowingModal(){
    setDisplayFollowingModal(true)

  }
  function onOpenFollowersModal(){
    setDisplayFollowersModal(true)
  }

  return (
    <>
      <header className="profile-main-header">
        <section className="profile-pic">
          <ImageAvatars
            img={user?.imgUrl}
            avatarSource = {'profile-header-avatar'}
          />
        </section>
        <section className="header-btns">
          <section className="profile-link-buttons">
            <span className="user-name-profile-header">{user?.username}</span>
            <Link className="profile-link-button">Edit Profile</Link>
            {/* <Link className="profile-link-button">View Archive</Link> */}
          </section>
          <section className="profile-follows-lists">
            <section className="profile-follows-post">
              <span className="profile-counts">{profileFeedItems}</span>
              <span>Posts</span>
            </section>
            <section className="profile-follows" onClick={onOpenFollowersModal}>
              <span className="profile-counts">
                {user?.followers?.length || 0}
              </span>
              <span>Followers</span>
            </section>
            {displayFollowersModal && <FollowsList user={user} onCloseModal={onCloseModal} followType={'Followers'} onUserUnfollowed={onUserUnfollowed} />}

            <section className="profile-follows" onClick={onOpenFollowingModal}>
              <span className="profile-counts">
                {user?.following?.length || 0}
              </span>
              <span>Following</span>
            </section>
            {displayFollowingModal && <FollowsList user={user} onCloseModal={onCloseModal} followType={'Following'} onUserUnfollowed={onUserUnfollowed}/>}
          </section>
        </section>
      </header>
    </>
  );
}
