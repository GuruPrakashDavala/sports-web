/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import FixtureCard from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { Fixture as FixtureT } from "../../types/sportmonks";
import { Select, Box } from "theme-ui";
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

  return (
    <SectionWrapper styles={{ paddingX: [2, 3, 5, 7] }}>
      <div sx={{ display: "flex" }}>
        <Tabs defaultIndex={1} sx={{ ...tabStyles, width: "100%" }}>
          <TabList>
            {tabLists.map((tab) => (
              <Tab tabIndex={tab.id} key={tab.id}>
                <p>{tab.name}</p>
              </Tab>
            ))}
          </TabList>

          <TabPanel id="upcoming">
            <div
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                margin: 0,
                padding: 0,
              }}
            >
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
            {recentFixtures.map((fixture) => {
              return (
                <Fragment key={fixture.id}>
                  <FixtureCard fixture={fixture} styles={{}} />
                </Fragment>
              );
            })}
          </TabPanel>
        </Tabs>
      </div>
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
