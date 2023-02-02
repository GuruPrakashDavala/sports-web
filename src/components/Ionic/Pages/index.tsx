/** @jsxImportSource theme-ui */

import { useState, useEffect, useCallback } from "react";
import {
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
  useIonRouter,
} from "@ionic/react";
import { isMatchLive } from "../../../utils/matchcenter";
import { HomePageContent } from "../../../pages";
import { getSeriesIdsFromFixturesList } from "../../../utils/fixtures";
import PageLoader from "../../Loaders/PageLoader/PageLoader";
import Link from "../../Primitives/Link";
import { logoLink } from "../../../utils/header";
import { App } from "@capacitor/app";

const IonHomePage = () => {
  const [value, setValue] = useState(0);

  // hardware back button
  const ionBackButton = useCallback(() => {
    App.exitApp();
  }, []);

  // force rerender by using state variable to avoid swiper initialization issues
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

  useEffect(() => {
    if (fixtures) {
      const isLive = fixtures.filter((fixture) => isMatchLive(fixture.status));
      isLive.length > 0
        ? setRefetchInterval(20000) // 2 mins polling
        : setRefetchInterval(1000 * 300); // 5 mins polling;
    }
  }, [currentFixtures]);

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

          {/* <IonTitle>Cricfanatic</IonTitle> */}
          {/* <IonProgressBar type="indeterminate" color={"light"}></IonProgressBar> */}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {homepage && fixtures ? (
          <HomePageContent homepage={homepage} fixtures={fixtures} />
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default IonHomePage;
