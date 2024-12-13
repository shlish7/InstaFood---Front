import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Carousel } from "../Carousel.jsx";
import { userService } from '../../services/user.service.remote.js';
import { ButtonsView } from './ButtonsView.jsx';
import { LikesCount } from './LikesCount.jsx';
import { FeedItemDescription } from './FeedItemDescription.jsx';
import { CommnetsView } from './CommnetsView.jsx';
import { FeedItemCreatorDetails } from './FeedItemCreatorDetails.jsx';
import { updateFeedItem } from '../../store/feedItem.actions';

export function FeedItem({ feedItem, onOpenFeedItem, handleCommentSubmit }) {

  const user = useSelector(storeState => storeState.userModule.user)

  const [ isImgDoubleClicked, setIsImgDoubleClicked ] = useState(feedItem?.likes?.some(like => like.userId === user?._id))
  const [ creator, setCreator ] = useState()

  useEffect(() => {
    getCreator();
  }, [feedItem]);

  async function getCreator() {
    const user = await userService.getById(feedItem?.owner._id);
    setCreator(user)
  }

  function onDoubleClicked() {
    onChangeLike()
    setIsImgDoubleClicked(prev => !prev)   
  }

  async function onChangeLike(){
    const updatedLikes = feedItem?.likes?.some(like => like.userId === user?._id)
      ? feedItem?.likes?.filter(like => like.userId !== user?._id)
      : [...feedItem.likes, { userId: user?._id }]

    const savedFeedItem = await updateFeedItem({ ...feedItem, likes: updatedLikes });
  }

  return (
      <section className="home-feed-container">
        <FeedItemCreatorDetails feedItem={feedItem} user={creator}/>
        <Carousel feedItem={feedItem} onDoubleClicked={onDoubleClicked} isImgDoubleClicked={isImgDoubleClicked} fullScreen={false}/>
        <ButtonsView feedItem={feedItem} isImgDoubleClicked={isImgDoubleClicked} onChangeLike={onChangeLike} onOpenFeedItem={onOpenFeedItem}/>
        {feedItem?.likes?.length > 0 && <LikesCount feedItem={feedItem}/>}
        <FeedItemDescription feedItem={feedItem} user={creator}/>
        <CommnetsView feedItem={feedItem} handleCommentSubmit={handleCommentSubmit} user={creator} />
      </section>
  )
}

