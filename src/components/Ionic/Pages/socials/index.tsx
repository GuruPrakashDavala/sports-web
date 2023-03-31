/** @jsxImportSource theme-ui */

import { useCallback, MutableRefObject, Fragment } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  useIonViewDidLeave,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { colors } from "../../../../styles/theme";
import {
  InfiniteSocialsResponseType,
  useInfiniteSocials,
} from "../../../../utils/queries";
import SectionHeading from "../../../SectionHeading";
import TwitterTweetEmbed from "../../../SocialEmbeds/TwitterTweetEmbed";
import { useHistory } from "react-router";
import Head from "next/head";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

type IonStandingsPageProps = {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  homeRef?: MutableRefObject<HTMLIonContentElement | null>;
};

const SocialsBlockPicker = (props: {
  type: string;
  socialId: string;
}): JSX.Element => {
  const { type, socialId } = props;

  switch (type) {
    case "Twitter":
      return <TwitterTweetEmbed tweetId={socialId} />;
    case "YouTube":
      return (
        <div sx={{ paddingX: 2, paddingBottom: 2, borderRadius: "10px" }}>
          <LiteYouTubeEmbed id={socialId} title={socialId} />
        </div>
      );
    default:
      return <></>;
  }
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

  const {
    isLoading,
    isError,
    error,
    data: socials,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteSocials({});

  const loadMore = (ev: any) => {
    if (hasNextPage) {
      fetchNextPage();
      setTimeout(() => ev.target.complete(), 500);
    } else {
      setTimeout(() => ev.target.complete(), 500);
    }
  };

  const socialEmbeds = socials as unknown as InfiniteSocialsResponseType;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonTitle>Trending</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollEvents={true} ref={contentRef} fullscreen>
        <Head>
          <title>{`Trending socials page`}</title>
          <meta
            name="description"
            content="Cricfanatic superfast cricket news"
          />
        </Head>

        <SectionHeading title={"What's trending"} />

        {socialEmbeds &&
          !isLoading &&
          socialEmbeds.pages.map((group, index) => {
            return (
              <Fragment key={index}>
                {group.data.map((social, index) => (
                  <div
                    key={social.id}
                    sx={{
                      paddingBottom: 1,
                      backgroundColor:
                        index % 2 === 0 ? colors.white : colors.gray300,
                    }}
                  >
                    {social.attributes.title && (
                      <p
                        sx={{
                          paddingX: 3,
                          paddingTop: index === 0 ? 0 : 3,
                          paddingBottom: 1,
                          variant: "text.heading4",
                          fontWeight: "500",
                        }}
                      >
                        {social.attributes.title}
                      </p>
                    )}

                    <SocialsBlockPicker
                      type={social.attributes.type}
                      socialId={social.attributes.social_id}
                    />
                  </div>
                ))}
              </Fragment>
            );
          })}

        <IonInfiniteScroll onIonInfinite={loadMore}>
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default Socials;
