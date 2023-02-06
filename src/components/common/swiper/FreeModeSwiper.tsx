import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode } from "swiper";

interface IProps {
  elementList: JSX.Element[];
  slidesPerView: number;
  spaceBetween: number;
}

export default function FreeModeSwiper(props: IProps) {
  const slideElementList = props.elementList.map((element, index) => (
    <SwiperSlide key={`slide-${index}`}>{element}</SwiperSlide>
  ));
  return (
    <Swiper
      slidesPerView={props.slidesPerView}
      spaceBetween={props.spaceBetween}
      grabCursor={true}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode]}
      className="free-mode-swiper"
    >
      {slideElementList}
    </Swiper>
  );
}
