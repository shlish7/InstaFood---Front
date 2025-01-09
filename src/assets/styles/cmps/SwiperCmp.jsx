import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/css/navigation';

export default function SwiperCmp({ feedItem, onDoubleClicked, isImgDoubleClicked, fullScreen }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [doubleClick, setDoubleClick] = useState(isImgDoubleClicked || false);

    function onImgDoubledClicked() {
        setDoubleClick(prev => {
            const newDoubleClickState = !prev;
            onDoubleClicked();
            return newDoubleClickState;
        });
    }

    return (
        <div className={fullScreen ? 'swiper-full-item-screen-container' : 'swiper-container'}>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                navigation
                pagination={{ clickable: true }}
                speed={800}
                slidesPerView={1}
                className={`my-swiper ${fullScreen ? 'fullscreen-swiper' : ''}`}
            >
                {feedItem.imageUrl.map((imgUrl, index) => (
                    <SwiperSlide 
                        onDoubleClick={onImgDoubledClicked} 
                        key={index}
                        className={fullScreen ? 'fullscreen-slide' : ''}
                    >
                        <div className={`img-container ${fullScreen ? 'fullscreen-img-container' : ''}`}>
                            <img 
                                className={`swiper-img ${fullScreen ? 'fullscreen-img' : ''}`} 
                                src={imgUrl} 
                                alt={`Slide ${index + 1}`} 
                            />
                        </div>
                    </SwiperSlide>
                ))}

                {feedItem?.imageUrl?.length > 1 && (
                    <div className="custom-pagination">
                        {feedItem.imageUrl.map((_, idx) => (
                            <span
                                key={idx}
                                className={`pagination-dot ${currentIndex === idx ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                )}
            </Swiper>
        </div>
    );
}