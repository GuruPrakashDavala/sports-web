/** @jsxImportSource theme-ui */

import Image from "next/image";
import { colors } from "../../../styles/theme";
import { ImageType } from "../../../types/article";
import { renderImage } from "../../../utils/util";
import Carousel, { CarouselItem } from "../../Carousel";
import ImageCollectionIcon from "../../Icons/ImageCollectionIcon";

const ImageCarousel = (props: { images: ImageType[]; index: number }) => {
  const { images, index } = props;
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
            alt="image"
            height={60}
            width={80}
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
      <div sx={{ display: "flex", flexDirection: "row", alingItems: "center" }}>
        <ImageCollectionIcon />
        <p
          sx={{
            paddingX: "5px",
            paddingY: 1,
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
    </div>
  );
};

export default ImageCarousel;
