/** @jsxImportSource theme-ui */

import { useEffect, useRef, useState } from "react";
import { ThemeUICSSObject } from "theme-ui";
import SwiperCore, {
  Navigation,
  Keyboard,
  Mousewheel,
  SwiperOptions,
  Swiper,
} from "swiper/core";
import { SwipeContainer, SwipeSlide, SwipeWrapper } from "./carouselStyles";
import CarouselNavigationButton from "./navigationButton";
import { domAnimation, LazyMotion } from "framer-motion";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { useThemeUI } from "theme-ui";
import { column } from "../../utils/grid";
import { themeUIArray } from "../../utils/themeui";

SwiperCore.use([Navigation, Keyboard, Mousewheel]);

const carouselWrapperStyles: ThemeUICSSObject = {
  // position: ["relative", null, null, null, null, "initial"],
  position: ["relative", null, null, null, null],
  width: "100%",
};

export type CarouselItem = {
  content: JSX.Element;
  slideStyles?: ThemeUICSSObject;
};

export type CarouselProps = {
  swiperId: string;
  items: CarouselItem[];
  swiperOptions?: SwiperOptions;
  onInit?: (s: Swiper) => void;
  styles?: ThemeUICSSObject;
};

const Carousel = (props: CarouselProps): JSX.Element => {
  const { swiperId, items, swiperOptions, styles = {}, onInit } = props;
  const bp = useBreakpointIndex({ defaultIndex: 0 });
  const smallBp = bp < 2;
  const {
    theme: { space },
  } = useThemeUI();

  // if (!items) return <></>;

  const [carouselAtEnd, setCarouselAtEnd] = useState(false);
  const [carouselAtBeginning, setCarouselAtBeginning] = useState(false);

  const swiperRef = useRef<Swiper | null>(null);
  const swipeContainerRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const getEdgeSlidesOffset = () => {
    return space
      ? Number(
          themeUIArray(
            [space[0], space[0], space[4], space[5], space[6], 0],
            bp
          )
        )
      : 0;
  };

  useEffect(() => {
    const updateCarouselEnds = (s: SwiperCore) => {
      setCarouselAtEnd(s.isEnd);
      setCarouselAtBeginning(s.isBeginning);
    };

    /**
     * * We should only instantiate Swiper once and just update the instance if it's already initialized.
     * Otherwise it can cause issues, if the parent component frequently updates.
     */
    if (!swiperRef.current) {
      const swiper = new SwiperCore(
        swipeContainerRef.current || `.swipe-container-${swiperId}`,
        {
          loop: false,
          grabCursor: true,
          slidesPerView: "auto",
          centeredSlides: false,
          centeredSlidesBounds: false,
          slidesOffsetBefore: getEdgeSlidesOffset(),
          slidesOffsetAfter: getEdgeSlidesOffset(),
          ...swiperOptions,
          navigation: {
            nextEl: `.swiper-button-next-${swiperId}`,
            prevEl: `.swiper-button-prev-${swiperId}`,
            disabledClass: `.swiper-button--disabled-${swiperId}`,
          },
          keyboard: { enabled: true, onlyInViewport: true },
          mousewheel: { forceToAxis: true },
          on: {
            ...swiperOptions?.on,
            init: (s) => updateCarouselEnds(s),
            afterInit: (s) => setTimeout(() => s.slideTo(0, 0), 0), // For some reason w/o this SwiperJS start at the second slide. TODO: Find a better fix for this.
            fromEdge: (s) => updateCarouselEnds(s),
            reachBeginning: (s) => updateCarouselEnds(s),
            reachEnd: (s) => updateCarouselEnds(s),
          },
        }
      );

      if (onInit) {
        onInit(swiper);
      }

      swiperRef.current = swiper;
    } else {
      swiperRef.current.update();
    }
  }, [items]);

  useEffect(() => {
    if (
      swiperRef.current &&
      !swiperOptions?.centeredSlides &&
      !swiperOptions?.centeredSlidesBounds &&
      !swiperOptions?.slidesOffsetBefore &&
      !swiperOptions?.slidesOffsetAfter
    ) {
      swiperRef.current.params.slidesOffsetBefore = getEdgeSlidesOffset();
      swiperRef.current.params.slidesOffsetAfter = getEdgeSlidesOffset();

      swiperRef.current.params.centeredSlides = smallBp;
      swiperRef.current.params.centeredSlidesBounds = smallBp;
      swiperRef.current.update();
    }
  }, [bp, smallBp]);

  useEffect(() => {
    return () => {
      swiperRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.params = {
        ...swiperRef.current.params,
        ...swiperOptions,
        on: {
          ...swiperOptions?.on,
          ...swiperRef.current.params.on,
        },
      };

      swiperRef.current.update();
    }
  }, [swiperOptions]);

  return (
    <LazyMotion features={domAnimation}>
      <div sx={{ ...carouselWrapperStyles, ...styles }} id="carousel">
        <CarouselNavigationButton
          direction="left"
          className={`swiper-button-prev swiper-button-prev-${swiperId}`}
          hidden={
            carouselAtBeginning || items.length === [1, 2, 2, 3, 3, 3][bp]
          }
          hiddenText="Previous item"
        />
        <CarouselNavigationButton
          direction="right"
          className={`swiper-button-next swiper-button-next-${swiperId}`}
          hidden={carouselAtEnd || items.length === [1, 1, 2, 3, 3, 3][bp]}
          hiddenText="Next item"
        />
        <SwipeContainer
          className={`.swipe-container-${swiperId}`}
          ref={swipeContainerRef}
        >
          <SwipeWrapper
            className="swiper-wrapper"
            ref={wrapperRef}
            // sx={{ gap: ["15px", null, 0] }}
          >
            {items.map((item, i) => {
              return (
                <SwipeSlide
                  className="swiper-slide"
                  key={i}
                  sx={{
                    width: [
                      `calc(100% - 60px) !important`,
                      `calc(100% - 60px) !important`,
                      `calc(50% - 30px) !important`,
                      `calc(33% - 23px) !important`,
                      `calc(33% - 36px) !important`,
                      column(4),
                    ],
                    height: "auto !important",
                    ...item.slideStyles,
                  }}
                >
                  {item.content}
                </SwipeSlide>
              );
            })}
          </SwipeWrapper>
        </SwipeContainer>
      </div>
    </LazyMotion>
  );
};

export default Carousel;
