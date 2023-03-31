/** @jsxImportSource theme-ui */

import { useState, useEffect, useCallback, MutableRefObject } from "react";
import {
  useArticles,
  useCurrentFixtures,
  useFixturesDefinedInCMS,
  useHomepage,
} from "../../../utils/queries";
import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  IonButtons,
  useIonViewWillLeave,
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
type IonHomePageProps = {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  globals?: GlobalsT;
};

const IonHomePage = (props: IonHomePageProps) => {
  const { contentRef, globals } = props;
  const [value, setValue] = useState(0);

  // hardware back button
  const ionBackButton = useCallback((ev: any) => {
    App.exitApp();
  }, []);

  // Force rerender by using state variable to avoid swiper initialization issues
  useIonViewDidEnter(() => {
    setValue((value) => value + 1);
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

  const { data: currentFixtures, isLoading: isCurrentFixturesLoading } =
    useCurrentFixtures({
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
        ? setRefetchInterval(20000) // 2 mins polling
        : setRefetchInterval(1000 * 300); // 5 mins polling;
    }
  }, [currentFixtures]);

  const promo = globals?.data.attributes.Mobile_Promo;

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

      <IonContent scrollEvents={true} ref={contentRef} fullscreen>
        {promo && promo.active && (
          <HeaderPromo
            promoDescription={promo.promo_description}
            href={promo.href}
            external={promo.external}
          />
        )}

        {homepage && fixtures && recentNewsArticles ? (
          <HomePageContent
            homepage={homepage}
            fixtures={fixtures}
            recentNewsArticles={recentNewsArticles}
          />
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default IonHomePage;
