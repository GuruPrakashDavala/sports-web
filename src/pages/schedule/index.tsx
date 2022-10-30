/** @jsxImportSource theme-ui */

import FixtureCard from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { colors } from "../../styles/theme";

const Schedule = (props: { fixtures: any }): JSX.Element => {
  const fixtures = props.fixtures.data;
  console.log(fixtures);
  return (
    <SectionWrapper>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          margin: 0,
          padding: 0,
        }}
      >
        {fixtures.map((fixture: any, index: number) => {
          return (
            <>
              <FixtureCard fixture={fixture} styles={{}} />
              {index > 0 && index % 10 === 0 ? (
                <div
                  sx={{
                    display: "flex",
                    padding: 5,
                    justifyContent: "center",
                    alignItems: "center",
                    background: colors.mint,
                    width: "100%",
                    marginX: 1,
                    marginY: 2,
                  }}
                >
                  <p sx={{ variant: "text.subheading2", color: colors.white }}>
                    Game week 10 - Sun 09 oct 2022
                  </p>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        })}
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
  return { props: { fixtures: fixtures } };
}

export default Schedule;
