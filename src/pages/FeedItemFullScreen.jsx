import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { Carousel } from "../cmps/Carousel.jsx";
import { CommentsIndex } from "../cmps/Comments/CommentsIndex.jsx";
import CloseModal from '../assets/svg/close-modal-icon.svg?react'
import ImageAvatars from '../cmps/ImageAvatars.jsx';
import { ButtonsView } from '../cmps/FeedItem/ButtonsView.jsx';
import { LikesCount } from '../cmps/FeedItem/LikesCount.jsx';
import { NewComment } from '../cmps/Comments/NewComment.jsx';
import { userService } from '../services/user.service.remote.js';
import Verified from "../assets/svg/verified.svg?react";
import { useSelector } from 'react-redux';
import { loadFeedItem, updateFeedItem } from '../store/feedItem.actions.js';

export function FeedItemFullScreen() {
  const { pId } = useParams()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const feedItem = useSelector(storeState => storeState.feedItemModule.feedItem)

  const [ isImgDoubleClicked, setIsImgDoubleClicked ] = useState(feedItem?.likes?.some(like => like.userId === user?._id))
  const [ onCloseFeedItemFullScreen, setOnCloseFeedItemFullScreen ] = useState();

  function onDoubleClicked() {
    onChangeLike()
    setIsImgDoubleClicked(prev => !prev)   
  }

  async function onChangeLike(){
    const updatedLikes = feedItem?.likes?.some(like => like.userId === user?._id)
      ? feedItem?.likes?.filter(like => like.userId !== user?._id)
      : [...feedItem.likes, { userId: user?._id }]

    const savedFeedItem = await updateFeedItem({ ...feedItem, likes: updatedLikes });
    console.log("full screen saved item: ", savedFeedItem)
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && !event.shiftKey) {
        navigate(-1)

      }
      if (event.key === 'Enter' && !event.shiftKey) {
        navigate(-1)
   
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseFeedItemFullScreen])


  useEffect(() => {
    getFeedItem()
  }, [pId])

  useEffect(() => {
    feedItem && loadUser()
  }, [feedItem])

  async function getFeedItem() {
    try {
      loadFeedItem(pId)
    } catch {
    }
  }

  async function loadUser() {
    try {
      const user = await userService.getById(feedItem?.owner?._id)
      setUser(user)
    } catch {
    }
  }
  
  function onNavigateBack() {
    navigate(-1)
  }

  function onNavigateToProfile(){
    navigate("/"+user?._id)
  }

  console.log('feedItem?.likes?.length',feedItem?.likes?.length);
  console.log('feedItem?.likes?.userId',feedItem?.likes);

  return (
    <>
      <CloseModal className='close-modal-icon-feed-item-full-screen' onClick={onNavigateBack} />
      <section className="feed-item-container-full-screen">
        { feedItem && <Carousel feedItem={feedItem} fullScreen={true} onDoubleClicked={onDoubleClicked} isImgDoubleClicked={isImgDoubleClicked}  /> }
        <section className="full-screen-comments">
          <section className="full-screen-comment-user-details" onClick={onNavigateToProfile}>
            { user?.imgUrl && <ImageAvatars img={user.imgUrl} avatarWidth='44px' avatarHeight='44px'/> }
            { user?.username && <span className="full-screen-comments-user-name">{user.username}</span> }
            <Verified/>
          </section>
          <section className="scrollable-comments">
          { feedItem && <CommentsIndex feedItem= {feedItem}/> }
          </section>
          <section className="full-screen-button-and-likes">
            <ButtonsView feedItem={feedItem} isImgDoubleClicked={isImgDoubleClicked} onChangeLike={onChangeLike}/>
            { feedItem?.likes?.length > 0 && <LikesCount feedItem={feedItem}/> }
          </section>     
          <section className="full-screen-new-comment">
            <NewComment  fullScreen={true}/>
          </section>
        </section>
      </section>
    </>
  );
}