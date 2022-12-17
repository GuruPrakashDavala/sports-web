/** @jsxImportSource theme-ui */

import { Fragment, useEffect, useState, useMemo } from "react";
import FixtureCard from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { tabStyles } from "../matchcenter/[...slug]";
import { add, format } from "date-fns";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { useRouter } from "next/router";
import { fetchStrapiAPI } from "../../lib/strapi";
import {
  InfiniteFixturesResponseType,
  useInfiniteFixtures,
} from "../../utils/queries";
import {
  getDatesForSelectedTab,
  getSelectedSeriesStageIds,
  isMatchLive,
} from "../../utils/matchcenter";
import FixtureSkeleton from "../../components/Loaders/Matchcenter/FixtureSkeleton";

const FixturesContent = (props: {
  selectedStage: string;
  series: [] | CMSFixtures[];
  fixtures?: InfiniteFixturesResponseType;
  isRecentTab?: boolean;
}): JSX.Element => {
  const { fixtures, selectedStage, series, isRecentTab } = props;
  const bp = useBreakpointIndex();

  const seriesName = series.find(
    (series) => series.code === selectedStage
  )?.seriesName;

  if (!fixtures) {
    return <FixtureSkeleton />;
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
          {selectedStage === "All" ? `All series` : `${seriesName}`}
        </p>
      </div>

      {fixtures.pages.map((group, index) => {
        const fixturesGroup = isRecentTab ? group.data.reverse() : group.data;
        return (
          <Fragment key={index}>
            {fixturesGroup.map((fixture) => {
              return (
                <Fragment key={fixture.id}>
                  <FixtureCard
                    fixture={fixture}
                    styles={{ paddingX: 0 }}
                    includeStageName={true}
                  />
                </Fragment>
              );
            })}
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

type Series = {
  id: number;
  seriesId: string;
};

export type CMSFixtures = {
  id: number;
  seriesIds: Series[];
  seriesName: string;
  code: string;
};

const Schedule = (props: {
  // fixtures: FixtureT[];
  series: [] | CMSFixtures[];
  seriesIds: string;
}): JSX.Element => {
  const [refetchInterval, setRefetchInterval] = useState<number>(0);
  const [seriesIds, setSeriesIds] = useState<string>(props.seriesIds);

  const now = new Date();
  const startDate = format(now, "yyyy-MM-d");
  const endDate = format(add(now, { days: 1 }), "yyyy-MM-d");
  const startAndEndDateRange = `${startDate}, ${endDate}`;
  // Default date is for a day
  const [dateRange, setDateRange] = useState<string>(startAndEndDateRange);

  const { data: fixturesData, isLoading: fixturesLoading } =
    useInfiniteFixtures({
      seriesIds: seriesIds,
      dateRange,
      refetchInterval,
    });

  const fixturesFromQuery =
    fixturesData as unknown as InfiniteFixturesResponseType;

  const fixtures =
    !fixturesLoading && fixturesData ? fixturesFromQuery : undefined;

  const [selectedStage, setSelectedStage] = useState<string>("All");

  const tabLists = [
    { id: "0", name: "today" },
    { id: "1", name: "upcoming" },
    { id: "2", name: "recent" },
  ];

  const bp = useBreakpointIndex();
  const router = useRouter();

  useMemo(() => {
    if (fixtures) {
      const isLive = fixtures.pages.filter((page) =>
        page.data.find((fixture) => isMatchLive(fixture.status))
      );

      console.log("isAnyFixtureLive");
      console.log(isLive);

      isLive && isLive.length > 0
        ? setRefetchInterval(20000) // 2 mins polling for live fixtures
        : setRefetchInterval(1000 * 300); // 5 mins polling;
    }
  }, [fixtures]);

  useEffect(() => {
    // selectedStage contains the series code
    if (selectedStage) {
      router.query.series
        ? setSelectedStage(router.query.series as string)
        : setSelectedStage("All");

      setSeriesIds(
        selectedStage === "All"
          ? props.seriesIds
          : getSelectedSeriesStageIds(
              selectedStage,
              props.series,
              props.seriesIds
            )
      );
    }
  }, [router.query.series, selectedStage]);

  const stageChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    router.push({
      query: { series: event.target.value },
    });
  };

  return (
    <SectionWrapper styles={{ paddingX: [2, 3, 5, null, 7], paddingY: 1 }}>
      <Tabs
        defaultIndex={0}
        sx={{ ...tabStyles, ...fixtureTabStyles, width: "100%" }}
        onSelect={(index) => setDateRange(getDatesForSelectedTab(index))}
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
              <option value={series.code} key={series.code}>
                {series.seriesName}
              </option>
            ))}
          </select>
        </TabList>

        <TabPanel id="todayfixtures">
          <FixturesContent
            selectedStage={selectedStage}
            series={props.series}
            fixtures={fixtures}
          />
        </TabPanel>

        <TabPanel id="upcomingfixtures">
          <FixturesContent
            selectedStage={selectedStage}
            series={props.series}
            fixtures={fixtures}
          />
        </TabPanel>

        <TabPanel id="recentfixtures">
          <FixturesContent
            selectedStage={selectedStage}
            series={props.series}
            fixtures={fixtures}
            isRecentTab={true}
          />
        </TabPanel>
      </Tabs>
    </SectionWrapper>
  );
};

export async function getStaticProps(context: any) {
  try {
    const fixturesDefinedInCMS = await fetchStrapiAPI(
      `/fixtures-list?populate=deep,3`
    );

    const seriesIds = fixturesDefinedInCMS.data.attributes.series
      .map((series: any) =>
        series.seriesIds.map((seriesItem: any) => seriesItem.seriesId)
      )
      .toString();

    // const res = await fetch(
    //   `${fixturesRestAPI}/fixtures/schedule?seriesIds=${seriesIds}`
    // );

    // const fixtures = await res.json();

    return {
      props: {
        // fixtures: undefined,
        series: fixturesDefinedInCMS.data.attributes.series,
        seriesIds,
      },
      revalidate: 60 * 5,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default Schedule;
