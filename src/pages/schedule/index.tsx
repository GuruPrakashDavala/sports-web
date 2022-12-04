/** @jsxImportSource theme-ui */

import { Fragment, useEffect, useState, useMemo } from "react";
import FixtureCard from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { Fixture as FixtureT } from "../../types/sportmonks";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { tabStyles } from "../matchcenter/[...slug]";
import { compareAsc, isToday, set, add, sub } from "date-fns";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { useRouter } from "next/router";
import { fetchStrapiAPI } from "../../lib/strapi";
import { useFixtureSchedule } from "../../utils/queries";
import { isMatchLive } from "../../utils/matchcenter";
import { fixturesRestAPI } from "../../utils/util";

const FixturesContent = (props: {
  fixtures: FixtureT[];
  selectedStage: string;
  series: [] | CMSFixtures[];
}): JSX.Element => {
  const bp = useBreakpointIndex();
  const { fixtures, selectedStage, series } = props;

  const seriesName = series.find(
    (series) => series.seriesId === selectedStage
  )?.seriesName;

  if (fixtures.length === 0) {
    return <></>;
  }

  return (
    <div sx={{ paddingX: [0, 3, 5], paddingTop: [null, 3, 5] }}>
      <div
        sx={{
          display: "flex",
          alignItems: "center",
          paddingBottom: [1, 2],
          paddingTop: [3, null, 0],
        }}
      >
        <p
          sx={{
            color: colors.gray200,
            variant: bp > 1 ? "text.subheading2" : "text.subheading3",
          }}
        >
          {selectedStage === "All"
            ? `${selectedStage} series`
            : `${seriesName}`}
        </p>
      </div>

      {fixtures.map((fixture) => {
        return (
          <Fragment key={fixture.id}>
            <FixtureCard fixture={fixture} styles={{ paddingX: 0 }} />
          </Fragment>
        );
      })}
    </div>
  );
};

export const selectBtnStyles: ThemeUICSSObject = {
  padding: 1,
  paddingRight: 3,
  marginBottom: [null, 1],
  border: "1px solid #003049",
  background: colors.gray300,
  width: [null, "fit-content"],
  "> option": { background: colors.white },
};

const fixtureTabStyles: ThemeUICSSObject = {
  "> .react-tabs__tab-list": {
    justifyContent: "space-between",
    display: "flex",
    flexDirection: ["column", "row"],
    flexWrap: "wrap",
    width: "100%",
    borderBottom: [null, "1px solid"],
    borderColor: [null, colors.gray200],
    margin: 0,
    paddingTop: 1,
    gap: [2, 0],
  },

  "> ul .react-tabs__tab": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    listStyle: "none",
    padding: 2,
    cursor: "pointer",
    "&:hover": {
      "> p": {
        color: colors.black,
      },
    },
    "> p": {
      variant: "text.subheading4",
      color: "rgba(12, 12, 12, 0.3)",
    },
  },
};

type CMSFixtures = {
  id: number;
  seriesId: string;
  seriesName: string;
};

const Schedule = (props: {
  fixtures: FixtureT[];
  series: [] | CMSFixtures[];
  seriesIds: string;
}): JSX.Element => {
  console.log(props.series);
  const [refetchInterval, setRefetchInterval] = useState<number>(0);
  const { data: fixtureSchedule, isLoading } = useFixtureSchedule(
    props.seriesIds,
    refetchInterval
  );

  const fixtures =
    !isLoading && fixtureSchedule ? fixtureSchedule.data.data : props.fixtures;

  const [selectedStage, setSelectedStage] = useState<string>("All");

  const [todayFixtures, setTodayFixtures] = useState<FixtureT[] | undefined>(
    undefined
  );

  const [recentFixtures, setRecentFixtures] = useState<FixtureT[] | undefined>(
    undefined
  );

  const [upcomingFixtures, setUpcomingFixtures] = useState<
    FixtureT[] | undefined
  >(undefined);

  const tabLists = [
    { id: "0", name: "today" },
    { id: "1", name: "upcoming" },
    { id: "2", name: "recent" },
  ];

  const bp = useBreakpointIndex();
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const now = new Date();
  const dateFromTomorrow = add(
    set(now, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    { days: 1 }
  );

  const dateFromYesterday = sub(
    set(now, {
      hours: 23,
      minutes: 59,
      seconds: 55,
    }),
    { days: 1 }
  );

  useMemo(() => {
    const isLive = fixtures.filter((fixture) => isMatchLive(fixture.status));
    isLive.length > 0
      ? setRefetchInterval(20000) // 2 mins polling
      : setRefetchInterval(1000 * 300); // 5 mins polling;
  }, [fixtureSchedule]);

  useEffect(() => {
    router.query.series
      ? setSelectedStage(router.query.series as string)
      : setSelectedStage("All");

    const fixtureSchedule =
      selectedStage === "All"
        ? fixtures
        : fixtures.filter(
            (fixture) => fixture.stage.id === Number(selectedStage)
          );

    const todayFixtures = fixtureSchedule.filter((fixture) =>
      isToday(new Date(fixture.starting_at))
    );

    const pastFixtures = fixtureSchedule
      .filter(
        (fixture) =>
          compareAsc(new Date(fixture.starting_at), dateFromYesterday) < 0
      )
      .reverse();

    const upcomingFixtures = fixtureSchedule.filter(
      (fixture) =>
        compareAsc(new Date(fixture.starting_at), dateFromTomorrow) > 0
    );

    setTodayFixtures(todayFixtures);
    setRecentFixtures(pastFixtures);
    setUpcomingFixtures(upcomingFixtures);
  }, [router.query.series, selectedStage, fixtureSchedule]);

  const stageChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    router.push({
      query: { series: event.target.value },
    });
  };

  // useEffect(() => {
  //   console.log(router);
  //   const queryPath = router.query.slug;
  //   switch (queryPath) {
  //     case "live":
  //       setTabIndex(0);
  //     case "upcoming":
  //       setTabIndex(1);
  //     case "recent":
  //       console.log("recent case");
  //       setTabIndex(2);
  //     default:
  //       setTabIndex(0);
  //   }
  // }, [router.query.slug, tabIndex]);

  return (
    <SectionWrapper styles={{ paddingX: [2, 3, 5, null, 7], paddingY: 1 }}>
      <Tabs
        defaultIndex={tabIndex}
        sx={{ ...tabStyles, ...fixtureTabStyles, width: "100%" }}
      >
        <TabList>
          <div
            sx={{
              display: "flex",
              ...(bp < 1
                ? { borderBottom: "1px solid", borderColor: [colors.gray200] }
                : {}),
            }}
          >
            {tabLists.map((tab) => (
              <Tab tabIndex={tab.id} key={tab.id}>
                <p>{tab.name}</p>
              </Tab>
            ))}
          </div>

          <select
            name="series"
            sx={selectBtnStyles}
            onChange={stageChanged}
            value={selectedStage}
          >
            <option value="All">All series</option>
            {props.series.map((series) => (
              <option value={series.seriesId} key={series.seriesId}>
                {series.seriesName}
              </option>
            ))}
          </select>
        </TabList>

        <TabPanel id="todayfixtures">
          {todayFixtures && (
            <FixturesContent
              fixtures={todayFixtures}
              selectedStage={selectedStage}
              series={props.series}
            />
          )}
        </TabPanel>

        <TabPanel id="upcomingfixtures">
          {upcomingFixtures && (
            <FixturesContent
              fixtures={upcomingFixtures}
              selectedStage={selectedStage}
              series={props.series}
            />
          )}
        </TabPanel>

        <TabPanel id="recentfixtures">
          {recentFixtures && (
            <FixturesContent
              fixtures={recentFixtures}
              selectedStage={selectedStage}
              series={props.series}
            />
          )}
        </TabPanel>
      </Tabs>
    </SectionWrapper>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const fixturesDefinedInCMS = await fetchStrapiAPI(
      `/fixtures-list?populate=deep,2`
    );

    const seriesIds = fixturesDefinedInCMS.data.attributes.series
      .map((series: any) => series.seriesId)
      .toString();

    const res = await fetch(
      `${fixturesRestAPI}/fixtures/schedule?seriesIds=${seriesIds}`
    );

    const fixtures = await res.json();

    return {
      props: {
        fixtures: fixtures.data,
        series: fixturesDefinedInCMS.data.attributes.series,
        seriesIds,
      },
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default Schedule;
