import { useCallback, MutableRefObject } from "react";
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import { useState, useMemo, useEffect, Fragment } from "react";
import { SchedulePageContent } from "../../../../pages/schedule";
import { add, format } from "date-fns";
import {
  InfiniteFixturesResponseType,
  useFixturesDefinedInCMS,
  useInfiniteFixtures,
} from "../../../../utils/queries";
import { getSeriesIdsFromFixturesList } from "../../../../utils/fixtures";
import {
  getSelectedSeriesStageIds,
  isMatchLive,
} from "../../../../utils/matchcenter";
import PageLoader from "../../../Loaders/PageLoader/PageLoader";
import { useHistory } from "react-router";

type IonSchedulePageProps = {
  contentRef: MutableRefObject<HTMLIonContentElement | null>;
  homeRef?: MutableRefObject<HTMLIonContentElement | null>;
};

const SchedulePage = (props: IonSchedulePageProps) => {
  const { contentRef, homeRef } = props;
  const [refetchInterval, setRefetchInterval] = useState<number>(0);
  const { data: fixturesDefinedInCMS, isLoading: fixturesListLoading } =
    useFixturesDefinedInCMS();

  const allSeries =
    !fixturesListLoading && fixturesDefinedInCMS
      ? fixturesDefinedInCMS.data.attributes.series
      : undefined;

  const allSeriesIdsFromFixturesList =
    !fixturesListLoading && fixturesDefinedInCMS
      ? getSeriesIdsFromFixturesList(fixturesDefinedInCMS.data)
      : undefined; // this length is used to enabled query

  const [seriesIds, setSeriesIds] = useState<string | undefined>(undefined);

  const history = useHistory();

  const now = new Date();
  const startDate = format(now, "yyyy-MM-d");
  const endDate = format(add(now, { days: 1 }), "yyyy-MM-d");
  const startAndEndDateRange = `${startDate}, ${endDate}`;

  // Default date is for a day
  const [dateRange, setDateRange] = useState<string>(startAndEndDateRange);

  const {
    data: fixturesData,
    isLoading: fixturesLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteFixtures({
    seriesIds: (seriesIds ?? allSeriesIdsFromFixturesList) as string,
    dateRange,
    refetchInterval,
    queryEnabled: allSeriesIdsFromFixturesList ? true : false,
  });

  const loadMore = () => {
    fetchNextPage();
  };

  const fixturesFromQuery =
    fixturesData as unknown as InfiniteFixturesResponseType;

  const fixtures =
    !fixturesLoading && fixturesData ? fixturesFromQuery : undefined;

  const [selectedStage, setSelectedStage] = useState<string>("All");

  useMemo(() => {
    if (fixtures) {
      const isLive = fixtures.pages.filter((page) =>
        page.data.find((fixture) => isMatchLive(fixture.status))
      );

      isLive && isLive.length > 0
        ? setRefetchInterval(1000 * 60) // 1 mins polling for live fixtures
        : setRefetchInterval(1000 * 300); // 5 mins polling;
    }
  }, [fixtures]);

  useEffect(() => {
    if (selectedStage && allSeries && allSeriesIdsFromFixturesList) {
      setSeriesIds(
        selectedStage === "All"
          ? allSeriesIdsFromFixturesList
          : getSelectedSeriesStageIds(
              selectedStage,
              allSeries,
              allSeriesIdsFromFixturesList
            )
      );
    }
  }, [selectedStage, allSeries]);

  const stageChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedStage(event.target.value);
  };

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

  useIonViewWillLeave(() => {
    document.removeEventListener("ionBackButton", ionBackButton);
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-toolbar-color">
          <IonTitle>Fixtures</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent scrollEvents={true} ref={contentRef} fullscreen>
        {allSeries ? (
          <Fragment>
            <SchedulePageContent
              setDateRange={setDateRange}
              stageChanged={stageChanged}
              selectedStage={selectedStage}
              series={allSeries}
              fixtures={fixtures}
              hasNextPage={hasNextPage}
              loadMore={loadMore}
              isFetching={isFetching}
            />
          </Fragment>
        ) : (
          <PageLoader />
        )}
      </IonContent>
    </IonPage>
  );
};

export default SchedulePage;
