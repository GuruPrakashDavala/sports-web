import { ColorTheme } from "../../../types/modifier";
import { ReelCarousel as ReelCarouselT } from "../../../types/blocks";
import Carousel, { CarouselItem } from "../../Carousel";
import SectionHeading from "../../SectionHeading";
import SectionWrapper from "../../Wrappers/SectionWrapper";
import { ThemeUICSSObject } from "theme-ui";
import { renderImage } from "../../../utils/util";
import { VIDEOS_PAGE_BASE_URL } from "../../../utils/pages";
import TwitterVideoCard from "../../Cards/TwitterVideoCard";
import BasicArticleCard from "../../Cards/BasicArticalCard";
import { useReels } from "../../../utils/queries";

export enum ReelEntitlements {
  MUX = "Mux Video",
  TWITTER_VIDEO = "Twitter Video",
  IMAGE = "Image",
}

type ReelCarouselProps = {
  block: ReelCarouselT;
  theme?: ColorTheme;
  styles?: ThemeUICSSObject;
};

const ReelCarouselPicker = (props: ReelCarouselProps): JSX.Element => {
  const { block, theme, styles = {} } = props;

  const carouselType = block.automatic ? "automatic" : "manual";
  const category = block.category?.data?.attributes.slug;

  const fetchVideosByCategory = block.automatic && category ? true : false;

  const { data: reels } = useReels({
    category,
    enabled: fetchVideosByCategory ?? false,
  });

  const reelsByCategory = reels ? reels.data : undefined;

  const reelCarouselProps: ReelCarouselT = {
    id: block.id,
    category: undefined,
    title: block.title,
    type: "reelcarousel",
    reels: {
      data: reelsByCategory ? reelsByCategory : [],
    },
    automatic: true,
    theme: block.theme,
  };

  switch (carouselType) {
    case "automatic":
      return (
        <ReelCarousel block={reelCarouselProps} theme={theme} styles={styles} />
      );
    case "manual":
      return <ReelCarousel block={block} theme={theme} styles={styles} />;

    default:
      return <></>;
  }
};

const ReelCarousel = (props: ReelCarouselProps): JSX.Element => {
  const { block, theme, styles = {} } = props;

  if (!block.reels.data || block.reels.data.length === 0) return <></>;

  const carouselTheme = block.theme ?? theme;

  const categoryLink = {
    href: `/${VIDEOS_PAGE_BASE_URL}`,
    external: false,
    label: "View all reels",
  };

  const carouselItems: CarouselItem[] = block.reels.data.map((reel) => {
    const reelType = reel.attributes.type;
    return {
      content:
        reelType === ReelEntitlements.MUX ||
        reelType === ReelEntitlements.IMAGE ? (
          <BasicArticleCard
            label={reel.attributes.title}
            imageSrc={renderImage(reel.attributes.thumbnail.data)}
            date={reel.attributes.createdAt}
            cardType={"Video"}
            badge={reel.attributes.badge}
            slug={reel.attributes.slug}
            reelVideo={true}
            theme={carouselTheme}
            styles={{ height: "100%", cursor: "grab", ...styles }}
          />
        ) : reelType === ReelEntitlements.TWITTER_VIDEO ? (
          <TwitterVideoCard
            label={reel.attributes.title}
            tweetId={reel.attributes.tweet_id}
            date={reel.attributes.createdAt}
            badge={reel.attributes.badge}
            slug={reel.attributes.slug}
            reelVideo={true}
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

export default ReelCarouselPicker;
