import styled from "@emotion/styled";

export const SwipeContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  overflow: hidden;
  z-index: 1;
  list-style: none;
  .swiper-container-android .swiper-slide,
  .swiper-wrapper {
    transform: translate3d(0px, 0, 0);
  }
  .swiper-container-free-mode > .swiper-wrapper {
    transition-timing-function: ease-out;
  }
  .swiper-container-pointer-events {
    touch-action: pan-y;
  }
  .swiper-slide-invisible-blank {
    visibility: hidden;
  }
  .swiper-container-autoheight,
  .swiper-container-autoheight .swiper-slide {
    height: auto;
  }
  .swiper-container-autoheight .swiper-wrapper {
    align-items: flex-start;
    transition-property: transform, height;
  }
  .swiper-container-css-mode > .swiper-wrapper {
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .swiper-container-css-mode > .swiper-wrapper::-webkit-scrollbar {
    display: none;
  }
  .swiper-container-css-mode > .swiper-wrapper > .swiper-slide {
    scroll-snap-align: start start;
  }
  .swiper-container-horizontal.swiper-container-css-mode > .swiper-wrapper {
    scroll-snap-type: x mandatory;
  }
`;

export const SwipeWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
  transition-property: transform;
`;

export const SwipeSlide = styled.div`
  position: relative;
  flex-shrink: 0;
  transition-property: transform;
`;
