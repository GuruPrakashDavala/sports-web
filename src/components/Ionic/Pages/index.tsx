/** @jsxImportSource theme-ui */

import {
  useState,
  useEffect,
  useCallback,
  MutableRefObject,
  Fragment,
} from "react";
import {
  InfiniteSocialsResponseType,
  useArticles,
  useCurrentFixtures,
  useFixturesDefinedInCMS,
  useHomepage,
  useInfiniteSocials,
} from "../../../utils/queries";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  IonButtons,
  useIonViewWillLeave,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  ScrollDetail,
} from "@ionic/react";
import { isMatchLive } from "../../../utils/matchcenter";
import { HomePageContent } from "../../../pages";
import { getSeriesIdsFromFixturesList } from "../../../utils/fixtures";
import PageLoader from "../../Loaders/PageLoader/PageLoader";
import Link from "../../Primitives/Link";
import { logoLink } from "../../../utils/header";
import { App } from "@capacitor/app";
import HeaderPromo from "../../Header/HeaderPromo";
import { Globals as GlobalsT } from "../../../types/header";
import GoTop from "../../Primitives/GoTopButton";
import SocialsFeed from "../../SocialsFeed";

type IonHomePageProps = {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  globals?: GlobalsT;
};

const IonHomePage = (props: IonHomePageProps) => {
  const { contentRef, globals } = props;
  const [value, setValue] = useState(0);
  const [showGoTop, setShowGoTop] = useState(false);

  // hardware back button
  const ionBackButton = useCallback(() => {
    App.exitApp();
  }, []);

  // Force rerender by using state variable to avoid swiper initialization issues
  useIonViewDidEnter(() => {
    setValue((value) => value + 1);
    console.log(value);
    document.addEventListener("ionBackButton", ionBackButton);
  });

  useIonViewWillLeave(() => {
    document.removeEventListener("ionBackButton", ionBackButton);
  });

  const [refetchInterval, setRefetchInterval] = useState<number>(0);

  const { data: homepageRes, isLoading: isHomepageLoading } = useHomepage();

  const { data: fixturesDefinedInCMS, isLoading: fixturesListLoading } =
    useFixturesDefinedInCMS();

  const seriesIds =
    !fixturesListLoading && fixturesDefinedInCMS
      ? getSeriesIdsFromFixturesList(fixturesDefinedInCMS.data)
      : ``;

  const { data: currentFixtures } = useCurrentFixtures({
    seriesIds,
    refetchInterval,
    queryEnabled: seriesIds.length > 0,
  });

  const homepage =
    !isHomepageLoading && homepageRes ? homepageRes.data : undefined;

  const fixtures = currentFixtures;

  const { data: recentNews } = useArticles({});

  const recentNewsArticles = recentNews ? recentNews.data : undefined;

  useEffect(() => {
    if (fixtures) {
      const isLive = fixtures.filter((fixture) => isMatchLive(fixture.status));
      isLive.length > 0
        ? setRefetchInterval(1000 * 30) // 0.5 mins polling
        : setRefetchInterval(1000 * 300); // 5 mins polling;
    }
  }, [currentFixtures]);

  const promo = globals?.data.attributes.Mobile_Promo;

  const showSocialsInHomePage =
    globals?.data.attributes.Mobile_App_Settings?.show_socials_in_homepage;

  const {
    isLoading: socialsLoading,
    data: socials,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteSocials({ queryEnabled: showSocialsInHomePage ?? false });

  const loadMore = (ev: any) => {
    if (hasNextPage) {
      fetchNextPage();
      setTimeout(() => ev.target.complete(), 500);
    } else {
      setTimeout(() => ev.target.complete(), 500);
    }
  };

  const socialEmbeds = socials as unknown as InfiniteSocialsResponseType;

  const handleScroll = (scrollEvent: CustomEvent<ScrollDetail>) => {
    const scrollYPosition = scrollEvent.detail.scrollTop;

    if (scrollYPosition > 2000) {
      return setShowGoTop(true);
    } else if (scrollYPosition < 2000) {
      return setShowGoTop(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonButtons slot="start" sx={{ paddingX: 2, alignItems: "center" }}>
            <Link href="/" styles={logoLink}>
              <img
                src="/assets/logo_text.png"
                alt="cricfanatic"
                sx={{ height: ["14px", "18px"], width: "auto" }}
              />
            </Link>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent
        scrollEvents={true}
        ref={contentRef}
        onIonScroll={handleScroll}
        fullscreen
      >
        {promo && promo.active && (
          <HeaderPromo
            promoDescription={promo.promo_description}
            href={promo.href}
            external={promo.external}
          />
        )}

        {homepage && fixtures && recentNewsArticles ? (
          <Fragment>
            <GoTop contentRef={contentRef} showGoTop={showGoTop} />

            <HomePageContent
              homepage={homepage}
              fixtures={fixtures}
              recentNewsArticles={recentNewsArticles}
            />

            {!socialsLoading && socialEmbeds && (
              <SocialsFeed socialEmbeds={socialEmbeds} />
            )}

            {hasNextPage && (
              <IonInfiniteScroll
                onIonInfinite={loadMore}
                sx={{ alignContent: "center" }}
              >
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
              </IonInfiniteScroll>
            )}
          </Fragment>
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default IonHomePage;
