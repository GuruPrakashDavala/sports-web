/** @jsxImportSource theme-ui */

import { useCallback, MutableRefObject } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  useIonViewDidLeave,
} from "@ionic/react";
import { colors } from "../../../../styles/theme";
import { useTweets } from "../../../../utils/queries";
import SectionHeading from "../../../SectionHeading";
import TwitterTweetEmbed from "../../../SocialEmbeds/TwitterTweetEmbed";
import { useHistory } from "react-router";

type IonStandingsPageProps = {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  homeRef?: MutableRefObject<HTMLIonContentElement | null>;
};

const Socials = (props: IonStandingsPageProps) => {
  const history = useHistory();
  const { contentRef, homeRef } = props;

  const ionBackButton = useCallback((ev: any) => {
    ev.detail.register(10, () => {
      history.replace(`/home`);
      setTimeout(() => {
        if (homeRef) {
          homeRef.current && homeRef.current.scrollToTop(300);
        }
      }, 50);
    });
  }, []);

  useIonViewDidEnter(() => {
    document.addEventListener("ionBackButton", ionBackButton);
  });

  useIonViewDidLeave(() => {
    document.removeEventListener("ionBackButton", ionBackButton);
  });

  const { data: tweetsFromStrapi } = useTweets();

  const tweetsData = tweetsFromStrapi ? tweetsFromStrapi.data : undefined;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonTitle>Trending</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollEvents={true} ref={contentRef} fullscreen>
        <SectionHeading title={"What's trending"} />

        {tweetsData &&
          tweetsData.map((tweet, index) => (
            <div
              key={tweet.id}
              sx={{
                paddingBottom: 1,
                backgroundColor:
                  index % 2 === 0 ? colors.white : colors.gray300,
              }}
            >
              {tweet.attributes.title && (
                <p
                  sx={{
                    paddingX: 3,
                    paddingTop: index === 0 ? 0 : 3,
                    paddingBottom: 1,
                    variant: "text.heading4",
                    fontWeight: "500",
                  }}
                >
                  {tweet.attributes.title}
                </p>
              )}

              <TwitterTweetEmbed tweetId={tweet.attributes.tweet_id} />
            </div>
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Socials;
