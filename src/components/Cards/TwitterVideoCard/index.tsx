import { CategoryType } from "../../../types/article";
import { ThemeUICSSObject } from "theme-ui";
import { ColorThemeAll } from "../../../types/modifier";
import { ArticleVariant } from "../ArticleCard";

type TwitterVideoCardProps = {
  tweetId?: string;
  label: string;
  date: string;
  category?: CategoryType;
  badge?: string;
  slug: string;
  styles?: ThemeUICSSObject;
  theme?: ColorThemeAll;
  variant?: ArticleVariant;
  reelVideo?: boolean;
};

const TwitterVideoCard = (props: TwitterVideoCardProps): JSX.Element => {
  // const {
  //   tweetId,
  //   label,
  //   date,
  //   category,
  //   badge,
  //   slug,
  //   theme,
  //   variant,
  //   reelVideo,
  //   styles = {},
  // } = props;
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<boolean>(false);
  // const [tweet, setTweet] = useState<undefined | TweetT>();

  // const getTweetFunction = async (tweetId: string) => {
  //   try {
  //     setError(false);
  //     setLoading(true);
  //     const tweet = await getTweet(tweetId);
  //     tweet ? setTweet(tweet) : setError(true);
  //     setLoading(false);
  //     return;
  //   } catch (err) {
  //     console.log(`Error fetching the tweet - ${tweetId}`);
  //     console.log(err);
  //     setError(true);
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   if (tweetId) {
  //     getTweetFunction(tweetId);
  //   }
  // }, [tweetId]);

  // const tweetImage = tweet ? tweet.video?.poster : null;
  // const mediaAvailable = tweet
  //   ? tweet.video?.mediaAvailability.status === "available"
  //   : false;
  // const showVideoCondition = tweet && mediaAvailable && tweetImage;

  // if (!tweetId) {
  //   return <></>;
  // }

  // return (
  //   <>
  //     {error ? (
  //       <></>
  //     ) : !loading && showVideoCondition ? (
  //       <BasicArticleCard
  //         label={label}
  //         imageSrc={tweetImage}
  //         badge={badge}
  //         date={date}
  //         category={category}
  //         variant={variant}
  //         cardType={"Video"}
  //         slug={slug}
  //         reelVideo={reelVideo}
  //         theme={theme}
  //         styles={styles}
  //       />
  //     ) : (
  //       <ArticleCardSkeleton styles={{ paddingX: [0] }} />
  //     )}
  //   </>
  // );

  return <></>;
};

export default TwitterVideoCard;
