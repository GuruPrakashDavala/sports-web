/** @jsxImportSource theme-ui */

import { useState, useCallback } from "react";
import Image from "next/image";
import { colors } from "../../../styles/theme";
import { ImageType } from "../../../types/article";
import { renderImage } from "../../../utils/util";
import Carousel, { CarouselItem } from "../../Carousel";
import ImageCollectionIcon from "../../Icons/ImageCollectionIcon";
import ImageViewer from "react-simple-image-viewer";

const ImageCarousel = (props: { images: ImageType[]; index: number }) => {
  const { images, index } = props;
  const imagesList = images.map((image) => renderImage(image));
  console.log(imagesList);
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
        <p
          sx={{
            paddingX: "5px",
            variant: "text.label2",
            color: colors.gray100,
          }}
        >
          Image slider: Swipe left to see more images
        </p>
      </div>

      <Carousel
        swiperId="imageCarousel"
        items={carouselItems}
        styles={{ gap: [1] }}
      />

      {isViewerOpen && (
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
        />
      )}
    </div>
  );
};

export default ImageCarousel;
