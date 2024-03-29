/** @jsxImportSource theme-ui */

import { CarouselProps } from "../Carousel";
import { Swiper, SwiperSlide } from "swiper/react";
import { CSSProperties, useState, useContext } from "react";
import { ReelType } from "../../types/common";
import "swiper/swiper.min.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ReelImageViewer from "./ReelImageViewer";
import ReelVideoPlayer from "./ReelVideoPlayer";
import { ThemeUICSSObject } from "theme-ui";
import { ReelEntitlements } from "../CarouselBlocks/ReelCarousel";

const swiperSlideStyles: CSSProperties = {
  display: "flex",
  height: "100%",
  width: "100%",
  background: "black",
};

const goBackButtonStyles: ThemeUICSSObject = {
  position: "absolute",
  top: 0,
  padding: 2,
  paddingY: 3,
  width: "100%",
  zIndex: 999,
};

const ReelCarousel = (
  props: Partial<CarouselProps> & {
    reels: ReelType[];
    hasNextPage: any;
    loadMore: () => void;
  }
) => {
  const { swiperId, reels, hasNextPage, loadMore } = props;
  const [currentSlideId, setCurrentSlideId] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(true);

  return (
    <Swiper
      id={swiperId}
      direction={"vertical"}
      className="mySwiper"
      style={{ height: "100%", width: "100%" }}
      slidesPerView={1}
      onSlideChange={(slide) => {
        setCurrentSlideId(slide.realIndex);
        if (reels.length - 1 === slide.realIndex) {
          if (hasNextPage) {
            loadMore();
          }
        }
      }}
    >
      <div sx={goBackButtonStyles}>
        <AiOutlineArrowLeft color="white" fontSize={22} />
      </div>

      {reels.map((reel, index) => {
        const isReelItemAnImage =
          reel.attributes.type === ReelEntitlements.IMAGE
            ? ReelEntitlements.IMAGE
            : undefined;

        const isReelItemAVideo =
          reel.attributes.type === ReelEntitlements.MUX ||
          reel.attributes.type === ReelEntitlements.TWITTER_VIDEO;

        return (
          <SwiperSlide
            key={reel.id}
            style={swiperSlideStyles}
            onClick={() => setMuted(!muted)}
          >
            {isReelItemAnImage ? (
              <ReelImageViewer reel={reel} />
            ) : isReelItemAVideo ? (
              <ReelVideoPlayer
                video={reel}
                muted={muted}
                play={index === currentSlideId}
              />
            ) : (
              <></>
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ReelCarousel;
