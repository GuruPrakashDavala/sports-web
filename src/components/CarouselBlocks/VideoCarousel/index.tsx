import { ColorTheme } from "../../../types/modifier";
import { VideoCarousel as VideoCarouselT } from "../../../types/blocks";
import Carousel, { CarouselItem } from "../../Carousel";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { ThemeUICSSObject } from "theme-ui";
import { renderImage } from "../../../utils/util";
import { VIDEOS_PAGE_BASE_URL } from "../../../utils/pages";
import TwitterVideoCard from "../../Cards/TwitterVideoCard";
import BasicArticleCard from "../../Cards/BasicArticalCard";
import { useVideos } from "../../../utils/queries";
import { VideoType } from "../../Cards/VideoCard/VideoMicroCard";

type VideoCarouselProps = {
  block: VideoCarouselT;
  theme?: ColorTheme;
  styles?: ThemeUICSSObject;
};

const VideoCarouselPicker = (props: VideoCarouselProps): JSX.Element => {
  const { block, theme, styles = {} } = props;

  const carouselType = block.automatic ? "automatic" : "manual";
  const category = block.category?.data?.attributes.slug;

  const fetchVideosByCategory = block.automatic && category ? true : false;

  const { data: videos } = useVideos({
    category,
    enabled: fetchVideosByCategory ?? false,
  });

  const videosByCategory = videos ? videos.data : undefined;

  const videoCarouselProps: VideoCarouselT = {
    id: block.id,
    category: undefined,
    title: block.title,
    type: "videocarousel",
    videos: {
      data: videosByCategory ? videosByCategory : [],
    },
    automatic: true,
    theme: block.theme,
  };

  switch (carouselType) {
    case "automatic":
      return (
        <VideoCarousel
          block={videoCarouselProps}
          theme={theme}
          styles={styles}
        />
      );
    case "manual":
      return <VideoCarousel block={block} theme={theme} styles={styles} />;

    default:
      return <></>;
  }
};

const VideoCarousel = (props: VideoCarouselProps): JSX.Element => {
  const { block, theme, styles = {} } = props;

  if (!block.videos.data || block.videos.data.length === 0) return <></>;

  const carouselTheme = block.theme ?? theme;

  const categoryLink = {
    href: `/${VIDEOS_PAGE_BASE_URL}`,
    external: false,
    label: "View all videos",
  };

  const carouselItems: CarouselItem[] = block.videos.data.map((video) => {
    const videoType = video.attributes.type;
    return {
      content:
        videoType === VideoType.MUX ? (
          <BasicArticleCard
            label={video.attributes.title}
            imageSrc={renderImage(video.attributes.thumbnail.data)}
            date={video.attributes.createdAt}
            cricfanaticOriginals={video.attributes.cricfanatic_originals}
            cardType={"Video"}
            badge={video.attributes.badge}
            slug={video.attributes.slug}
            theme={carouselTheme}
            styles={{ height: "100%", cursor: "grab", ...styles }}
          />
        ) : videoType === VideoType.TWITTER_VIDEO ? (
          <TwitterVideoCard
            label={video.attributes.title}
            tweetId={video.attributes.tweet_id}
            date={video.attributes.createdAt}
            badge={video.attributes.badge}
            slug={video.attributes.slug}
            theme={carouselTheme}
            styles={{ height: "100%", cursor: "grab", ...styles }}
          />
        ) : (
          <></>
        ),
    };
  });

  return (
    <SectionWrapper theme={carouselTheme}>
      <SectionHeading
        title={block.title}
        theme={carouselTheme}
        styles={{ px: [0, 1] }}
        link={categoryLink}
      />
      <Carousel swiperId={block.id.toString()} items={carouselItems} />
    </SectionWrapper>
  );
};

export default VideoCarouselPicker;
