import { differenceInMinutes, isToday } from "date-fns";
import { useState, useEffect, useMemo, useContext } from "react";
import { useParams } from "react-router";
import { MatchCenterContent } from "../../../../pages/matchcenter/[...slug]";
import {
  isMatchFinished,
  isMatchLive,
  now,
} from "../../../../utils/matchcenter";
import {
  useFixtureDetails,
  useRecentArticles,
} from "../../../../utils/queries";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import PageLoader from "../../../Loaders/PageLoader/PageLoader";
import TabBarContext, {
  TabBarContextProps,
} from "../../contexts/tabBarContext";

const MatchDetailPage = () => {
  const [refetchInterval, setRefetchInterval] = useState<number>(0);
  const { setShowTabs } = useContext<TabBarContextProps>(TabBarContext);

  const { fixtureId, teams } = useParams<{
    fixtureId: string;
    teams: string;
  }>();

  const { isLoading: fixtureLoading, data: fixtureResponse } =
    useFixtureDetails(fixtureId, refetchInterval);

  const fixture =
    !fixtureLoading && fixtureResponse ? fixtureResponse.data : undefined;

  const { isLoading: recentArticlesLoading, data: articles } =
    useRecentArticles();

  const recentArticles =
    !recentArticlesLoading && articles ? articles.data : undefined;

  const [isLive, setIsLive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useIonViewWillEnter(() => {
    setShowTabs(false);
  });

  useIonViewWillLeave(() => {
    setShowTabs(true);
  });

  useEffect(() => {
    if (fixture) {
      setIsLive(isMatchLive(fixture.status));
      setIsFinished(isMatchFinished(fixture.status));
    }
  }, [fixture]);

  // API polling memo
  useMemo(() => {
    if (fixture) {
      const differenceInMins = differenceInMinutes(
        new Date(fixture.starting_at),
        now
      );

      const isFixtureStartsToday = isToday(new Date(fixture.starting_at));

      const doesGameStartsInLessThanSixtyMins =
        differenceInMins > 0 && differenceInMins < 60;

      if (isLive) {
        setRefetchInterval(15000); // 1.5 mins polling
      } else {
        isFinished
          ? setRefetchInterval(0)
          : doesGameStartsInLessThanSixtyMins
          ? setRefetchInterval(1000 * 300) // 5 mins polling
          : isFixtureStartsToday
          ? setRefetchInterval(1000 * 1200) // 20 mins polling
          : setRefetchInterval(0);
      }
    }
  }, [fixtureResponse, isLive, isFinished]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" className="ion-back-button" />
          </IonButtons>
          <IonTitle>
            {fixture
              ? `${fixture.localteam.name} vs ${fixture.visitorteam.name}`
              : teams}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen scrollY={true}>
        {fixture ? (
          <MatchCenterContent
            fixture={fixture}
            recentArticles={recentArticles}
            isLive={isLive}
            isFinished={isFinished}
          />
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default MatchDetailPage;
