/** @jsxImportSource theme-ui */

import { useState, useContext, useEffect } from "react";
import {
  IonContent,
  IonPage,
  IonSpinner,
  useIonViewDidEnter,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import ReelCarousel from "../../../ReelCarousel";
import {
  InfiniteReelsResponseType,
  useInfiniteReels,
  useReel,
} from "../../../../utils/queries";
import TabBarContext, {
  TabBarContextProps,
} from "../../contexts/tabBarContext";
import { useParams } from "react-router";
import { ReelType } from "../../../../types/common";
import { BsFilm } from "react-icons/bs";
import { ThemeUICSSObject } from "theme-ui";
import Head from "next/head";

const ReelLoadingContainerStyles: ThemeUICSSObject = {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "black",
  flexDirection: "column",
  gap: 1,
};

const ReelVideos = () => {
  const [showCarousel, setShowCarousel] = useState<boolean>(false);
  const [reelsList, setReelsList] = useState<ReelType[] | undefined>(undefined);
  const { setShowTabs } = useContext<TabBarContextProps>(TabBarContext);
  const { slug } = useParams<{ slug: string }>();
  const { data: reel, isLoading: isSelectedVideoLoading } = useReel(slug);
  const {
    data: reels,
    hasNextPage,
    fetchNextPage,
    isLoading: isAllVideosLoading,
  } = useInfiniteReels({});

  useEffect(() => {
    const reelItem = reel && reel?.data.length > 0 ? reel.data[0] : undefined;

    const allReels =
      !isAllVideosLoading && reels
        ? (reels as unknown as InfiniteReelsResponseType).pages
            .flatMap((group) => group.data.flatMap((video) => video))
            ?.filter((video) => video.id !== reelItem?.id)
        : undefined;

    if (reelItem && allReels) {
      const listVideos = [reelItem, ...allReels];
      setReelsList(listVideos);
    } else {
      setReelsList(undefined);
    }
  }, [reel, reels]);

  useIonViewWillEnter(() => {
    setShowTabs(false);
  }, []);

  useIonViewDidEnter(() => {
    setTimeout(() => {
      setShowCarousel(true);
    }, 1000);
  }, []);

  useIonViewWillLeave(() => {
    setShowTabs(true);
  });

  return (
    <IonPage>
      <IonContent style={{ backgroundColor: "black" }}>
        <Head>
          <title>{`CricFanatic Reel Videos - ${slug}`}</title>
          <meta
            name="description"
            content="Cricfanatic superfast cricket news and videos at your fingertips"
          />
        </Head>

        {!isAllVideosLoading &&
        !isSelectedVideoLoading &&
        reelsList &&
        reelsList.length > 0 &&
        showCarousel ? (
          <ReelCarousel
            swiperId={"reels-carousel"}
            reels={reelsList}
            hasNextPage={hasNextPage}
            loadMore={fetchNextPage}
          />
        ) : (
          <div sx={ReelLoadingContainerStyles}>
            <IonSpinner color={"light"} />
            <div
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <BsFilm color="white" fontSize={24} />
              <p sx={{ variant: "text.subheading3", color: "white" }}>
                Loading...
              </p>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ReelVideos;
