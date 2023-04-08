/** @jsxImportSource theme-ui */

import { useState, useCallback } from "react";
import Image from "next/legacy/image";
import { colors } from "../../../styles/theme";
import { ImageType } from "../../../types/article";
import { renderImage } from "../../../utils/util";
import Carousel, { CarouselItem } from "../../Carousel";
import ImageCollectionIcon from "../../Icons/ImageCollectionIcon";
import ImageViewer from "react-simple-image-viewer";
import RightArrowIcon from "../../Icons/RightArrow";
import LeftArrowIcon from "../../Icons/LeftArrow";

const ImageCarousel = (props: { images: ImageType[]; index: number }) => {
  const { images, index } = props;
  const imagesList = images.map((image) => renderImage(image));
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const carouselItems: CarouselItem[] = images.map((image, index) => {
    return {
      content: (
        <div
          key={index}
          sx={{
            px: ["5px", 1],
            cursor: "pointer",
          }}
        >
          <Image
            src={renderImage(image)}
            layout="responsive"
            objectFit="cover"
            alt="carouselimages"
            height={60}
            width={80}
            onClick={() => openImageViewer(index)}
          />
        </div>
      ),
      slideStyles: {},
    };
  });

  return (
    <div
      sx={{
        py: [2, null, 4, 5],
        width: ["calc(100% + 30px)", null, null, "calc(200% + 120px)"],
        marginLeft: ["-15px", null, null, "calc(-50% - 60px)"],
      }}
      key={index}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 1,
        }}
      >
        <ImageCollectionIcon />
        {/* <FaEye sx={{ marginLeft: "5px" }} /> */}
        <p
          sx={{
            paddingX: "5px",
            variant: "text.label2",
            color: colors.gray100,
          }}
        >
          Image slider: Swipe left to see more images. Tap on the image for full
          view.
        </p>
      </div>

      <Carousel
        swiperId="imageCarousel"
        items={carouselItems}
        styles={{ gap: [1] }}
      />

      {isViewerOpen && (
        <div
          sx={{
            "> div > span": {
              opacity: 1,
              width: "fit-content",
              height: "60px",
              "&:hover": { opacity: 1 },
            },
          }}
        >
          <ImageViewer
            src={imagesList}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            disableScroll={false}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)",
              zIndex: 99,
            }}
            closeOnClickOutside={true}
            rightArrowComponent={<RightArrowIcon />}
            leftArrowComponent={<LeftArrowIcon />}
          />
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
