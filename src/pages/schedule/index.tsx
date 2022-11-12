/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import FixtureCard from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { Fixture as FixtureT } from "../../types/sportmonks";
import { Select, Box, ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { tabStyles } from "../matchcenter/[...slug]";
import { compareAsc, format } from "date-fns";

const Schedule = (props: { fixtures: FixtureT[] }): JSX.Element => {
  const fixtures = props.fixtures;
  const tabLists = [
    { id: "0", name: "upcoming" },
    { id: "1", name: "recent" },
    // { id: "2", name: "scorecard" },
    // { id: "3", name: "trending" },
  ];

  const now = new Date();
  const recentFixtures = fixtures
    .filter((fixture) => compareAsc(new Date(fixture.starting_at), now) < 1)
    .reverse();
  const upcomingFixtures = fixtures.filter(
    (fixture) => compareAsc(new Date(fixture.starting_at), now) > 0
  );

  const fixtureTabStyles: ThemeUICSSObject = {
    "> .react-tabs__tab-list": {
      justifyContent: "space-between",
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
      borderBottom: "1px solid",
      borderColor: colors.gray200,
      margin: "0 0 20px",
      paddingTop: 1,
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
        variant: "text.subheading3",
        color: "rgba(12, 12, 12, 0.3)",
      },
    },
  };

  return (
    <SectionWrapper styles={{ paddingX: [2, 3, 5, 7] }}>
      <Tabs
        defaultIndex={0}
        sx={{ ...tabStyles, ...fixtureTabStyles, width: "100%" }}
      >
        <TabList>
          <div sx={{ display: "flex", flexBasis: "50%" }}>
            {tabLists.map((tab) => (
              <Tab tabIndex={tab.id} key={tab.id}>
                <p>{tab.name}</p>
              </Tab>
            ))}
          </div>

          <Select
            arrow={
              <Box
                as="svg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentcolor"
                sx={{
                  ml: -28,
                  alignSelf: "center",
                  pointerEvents: "none",
                }}
              >
                <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
              </Box>
            }
            defaultValue="Hello"
          >
            <option>Hello</option>
            <option>Hi</option>
            <option>Beep</option>
            <option>Boop</option>
          </Select>
        </TabList>

        <TabPanel id="upcoming">
          <div sx={{ paddingX: [0, 3] }}>
            {upcomingFixtures.map((fixture) => {
              return (
                <Fragment key={fixture.id}>
                  <FixtureCard fixture={fixture} styles={{}} />
                </Fragment>
              );
            })}
          </div>
        </TabPanel>

        <TabPanel id="recent">
          <div sx={{ paddingX: [0, 5] }}>
            {recentFixtures.map((fixture) => {
              return (
                <Fragment key={fixture.id}>
                  <FixtureCard fixture={fixture} styles={{}} />
                </Fragment>
              );
            })}
          </div>
        </TabPanel>
      </Tabs>
    </SectionWrapper>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=arQupbeQwcFvjafCxxqydm2XgMRbqRhWjUNJaINkNSG8n75Np9wNPG7aQu2f&include=visitorteam, localteam, league, venue, scoreboards, scoreboards.team, stage, season, odds, tosswon, runs, runs.team&filter[season_id]=956&sort=starting_at`
  );
  const fixtures = await res.json();

  // Pass data to the page via props
  return { props: { fixtures: fixtures.data } };
}

export default Schedule;
