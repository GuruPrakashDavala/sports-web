/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import FixtureCard from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { Fixture as FixtureT } from "../../types/sportmonks";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { tabStyles } from "../matchcenter/[...slug]";
import { compareAsc } from "date-fns";
import { useBreakpointIndex } from "@theme-ui/match-media";

const TabPanelContent = (props: { fixtures: FixtureT[] }): JSX.Element => {
  const { fixtures } = props;
  return (
    <div sx={{ paddingX: [0, 3, 5], paddingTop: [null, 3, 5] }}>
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

const Schedule = (props: { fixtures: FixtureT[] }): JSX.Element => {
  console.log(props);
  const fixtures = props.fixtures;
  const tabLists = [
    { id: "0", name: "live" },
    { id: "1", name: "upcoming" },
    { id: "2", name: "recent" },
  ];

  const now = new Date();
  const todayFixtures = fixtures.filter(
    (fixture) => compareAsc(new Date(fixture.starting_at), now) === 0
  );

  const recentFixtures = fixtures
    .filter((fixture) => compareAsc(new Date(fixture.starting_at), now) < 1)
    .reverse();

  const upcomingFixtures = fixtures.filter(
    (fixture) => compareAsc(new Date(fixture.starting_at), now) > 0
  );

  const bp = useBreakpointIndex();

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

  return (
    <SectionWrapper styles={{ paddingX: [2, 3, null, 7], paddingTop: 1 }}>
      <Tabs
        defaultIndex={0}
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

          <div sx={{ display: "flex", gap: 2 }}>
            <select
              name="season"
              sx={{
                padding: 1,
                paddingRight: 3,
                marginBottom: 1,
                border: "none",
                background: colors.gray300,
                width: "50%",
                "> option": { background: colors.white, padding: 1 },
              }}
            >
              <option value="2020">2020-21</option>
              <option value="2021">2021-22</option>
            </select>

            <select
              name="league"
              sx={{
                padding: 1,
                paddingRight: 3,
                marginBottom: 1,
                border: "none",
                background: colors.gray300,
                width: "50%",
                "> option": { background: colors.white, padding: 1 },
              }}
            >
              <option value="ipl">IPL</option>
              <option value="wct20">WCT20</option>
            </select>
          </div>
        </TabList>

        <TabPanel id="todayfixtures">
          <TabPanelContent fixtures={todayFixtures} />
        </TabPanel>

        <TabPanel id="upcomingfixtures">
          <TabPanelContent fixtures={upcomingFixtures} />
        </TabPanel>

        <TabPanel id="recentfixtures">
          <TabPanelContent fixtures={recentFixtures} />
        </TabPanel>
      </Tabs>
    </SectionWrapper>
  );
};

export async function getServerSideProps() {
  try {
    const res = await fetch(
      `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=arQupbeQwcFvjafCxxqydm2XgMRbqRhWjUNJaINkNSG8n75Np9wNPG7aQu2f&include=visitorteam, localteam, league, venue, scoreboards, scoreboards.team, stage, season, odds, tosswon, runs, runs.team&filter[season_id]=782`
    );
    const fixtures = await res.json();
    return { props: { fixtures: fixtures.data } };
  } catch (err) {
    console.log(err);
    return null;
  }
}

export default Schedule;
