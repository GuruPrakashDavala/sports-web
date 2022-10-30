/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { getScore } from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { useState, useEffect } from "react";
import { colors } from "../../styles/theme";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { ThemeUICSSObject } from "theme-ui";
import LiveCommentary from "../../components/Matchcenter/Livecommentary";
import Scoreboard from "../../components/Matchcenter/Scoreboard";
import { useRouter } from "next/router";
import BatIcon from "../../components/Icons/Bat";
import LivePulse from "../../components/Icons/LivePulse";
import Pill from "../../components/Primitives/Pill";
import { ColorTheme } from "../../types/modifier";

const getTeamLineup = (lineup: any, teamId: any) => {
  const teamLineup = lineup.filter((lineupItem: any) => {
    return lineupItem.lineup.team_id === teamId;
  });
  return teamLineup;
};

const getPlayersDidNotBat = (
  fixtureBatting: any,
  lineup: any,
  innings: any
) => {
  // fixtureBatting - contains the battings of both teams
  // lineup - contains lineup of specific team (11 players)
  // innings - Enum: S1 or S2
  // teamId - number

  // The below filters the players who batted in the specified innings. Check innings param for innings code.
  const playerIdsWhoBattedInTheInnings = fixtureBatting
    .filter((batting: any) => {
      return batting.scoreboard === innings;
    })
    .map((item: any) => item.player_id);

  const playersDidNotBatInTheInnings = lineup.filter((player: any) => {
    return playerIdsWhoBattedInTheInnings.indexOf(player.id) === -1;
  });

  return playersDidNotBatInTheInnings;
};

export const tabStyles: ThemeUICSSObject = {
  "> .react-tabs__tab-list": {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    // borderBottom: "1px solid #aaa",
    margin: "0 0 20px",
    padding: "0",
  },
  "> ul .react-tabs__tab": {
    flexGrow: 1,
    display: "block",
    position: "relative",
    listStyle: "none",
    padding: 2,
    cursor: "pointer",
    borderBottom: "1px solid #aaa",
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
  "> ul .react-tabs__tab:focus": {
    outline: "none",
  },
  "> ul .react-tabs__tab--selected": {
    background: colors.white,
    borderBottom: "2px solid",
    borderColor: colors.red100,
    "> p": {
      color: colors.black,
    },
  },
  "> .react-tabs__tab-panel": {
    display: "none",
  },
  "> .react-tabs__tab-panel--selected": {
    display: "block",
  },
};

const MatchCenter = (props: { fixture: any }): JSX.Element => {
  console.log(props.fixture);
  const fixture = props.fixture.data;
  if (fixture.status === "NS") {
    return <div>Game not started yet...</div>;
  }

  if (fixture.status === "Aban." && fixture.runs.length === 0) {
    return <div>{fixture.note}</div>;
  }

  const bp = useBreakpointIndex();
  // WIP: S1 and S2 team details

  // Util to get the opposite team info (toss lost team - 2nd Innings)
  const getOppositeTeamInfo = (tosswonTeam: any) => {
    const teamInfo = [fixture.localteam, fixture.visitorteam]
      .filter((team) => tosswonTeam.code !== team.code)
      .map((team) => {
        return {
          name: team.name,
          code: team.code,
          image: team.image_path,
          id: team.id,
        };
      });
    // The above will always contain only one team (item)
    return teamInfo[0];
  };

  const setS1AndS2TeamInfo = () => {
    const tosswonTeam = fixture.tosswon;
    switch (fixture.elected) {
      case "bowling":
        setS2Team({
          name: tosswonTeam.name,
          code: tosswonTeam.code,
          image: tosswonTeam.image_path,
          id: tosswonTeam.id,
        });
        setS1Team(getOppositeTeamInfo(tosswonTeam));
        break;
      case "batting":
        setS1Team({
          name: tosswonTeam.name,
          code: tosswonTeam.code,
          image: tosswonTeam.image_path,
          id: tosswonTeam.id,
        });
        setS2Team(getOppositeTeamInfo(tosswonTeam));
        break;
      default:
        setS1Team({
          name: fixture.localteam.name,
          code: fixture.localteam.code,
          image: fixture.localteam.image_path,
          id: fixture.localteam.id,
        });
        setS2Team({
          name: fixture.visitorteam.name,
          code: fixture.visitorteam.code,
          image: fixture.visitorteam.image_path,
          id: fixture.visitorteam.id,
        });
        break;
    }
  };

  const [s1Team, setS1Team] = useState<
    | {
        name: string;
        code: string;
        image: string;
        id: number;
      }
    | undefined
  >(undefined);

  const [s2Team, setS2Team] = useState<
    | {
        name: string;
        code: string;
        image: string;
        id: number;
      }
    | undefined
  >(undefined);

  const [s1TeamLineup, setS1TeamLineup] = useState();
  const [s2TeamLineup, setS2TeamLineup] = useState();

  const [s1DidNotBat, setS1DidNotBat] = useState();
  const [s2DidNotBat, setS2DidNotBat] = useState();

  const [s1Extras, setS1Extras] = useState();
  const [s2Extras, setS2Extras] = useState();

  const [s1FallOfWickets, setS1FallOfWickets] = useState();
  const [s2FallOfWickets, setS2FallOfWickets] = useState();

  // main tab index
  const [tabIndex, setTabIndex] = useState(1);

  // First useEffect to fetch both S1 and S2 team details
  useEffect(() => {
    /* 
    The below function does the following:
    1. Sets the first batting team info in s1Team
    2. Sets the second batting team info in the s2Team
    See method internals to understand the implementation logics
    */
    if (fixture.resource === "fixtures") {
      setS1AndS2TeamInfo();
    }
  }, [fixture]);

  // Second useEffect to set the S1 and S2 team lineup
  useEffect(() => {
    if (s1Team && s2Team && fixture.lineup.length > 0) {
      setS1TeamLineup(getTeamLineup(fixture.lineup, s1Team.id));
      setS2TeamLineup(getTeamLineup(fixture.lineup, s2Team.id));
    }
  }, [s1Team, s2Team, fixture.lineup]);

  // Third useEffect to set the s1DidNotBat and s2DidNotBat
  useEffect(() => {
    if (s1Team && s2Team && s1TeamLineup && s2TeamLineup) {
      // S1Team player did not bat
      const s1DidNotBat =
        fixture.scoreboards.filter(
          (scoreboardItem: any) =>
            scoreboardItem.scoreboard === "S1" &&
            scoreboardItem.type === "total"
        )?.length > 0
          ? getPlayersDidNotBat(fixture.batting, s1TeamLineup, "S1")
          : s1TeamLineup;

      // S2Team player did not bat
      const s2DidNotBat =
        fixture.scoreboards.filter(
          (scoreboardItem: any) =>
            scoreboardItem.scoreboard === "S2" &&
            scoreboardItem.type === "total"
        )?.length > 0
          ? getPlayersDidNotBat(fixture.batting, s2TeamLineup, "S2")
          : s2TeamLineup;

      s1DidNotBat.length > 0
        ? setS1DidNotBat(s1DidNotBat)
        : setS1DidNotBat(undefined);

      s2DidNotBat.length > 0
        ? setS2DidNotBat(s2DidNotBat)
        : setS2DidNotBat(undefined);
    }
  }, [s1Team, s2Team, s1TeamLineup, s2TeamLineup]);

  // Fourth useEffect to set the s1Extras and s2Extras
  useEffect(() => {
    if (fixture.scoreboards && s1Team && s2Team) {
      const s1ExtrasScoreboard = fixture.scoreboards.filter(
        (scoreboardItem: any) =>
          scoreboardItem.scoreboard === "S1" && scoreboardItem.type === "extra"
      );

      const s1Extras =
        s1ExtrasScoreboard.length > 0
          ? s1ExtrasScoreboard.map((scoreboardItem: any) => {
              return {
                b: scoreboardItem.bye,
                lb: scoreboardItem.leg_bye,
                wide: scoreboardItem.wide,
                nb: scoreboardItem.noball_balls + scoreboardItem.noball_runs,
                p: scoreboardItem.penalty,
                total:
                  scoreboardItem.bye +
                  scoreboardItem.leg_bye +
                  scoreboardItem.wide +
                  scoreboardItem.noball_balls +
                  scoreboardItem.noball_runs +
                  scoreboardItem.penalty,
              };
            })[0]
          : undefined;

      setS1Extras(s1Extras);

      const s2ExtrasScoreboard = fixture.scoreboards.filter(
        (scoreboardItem: any) =>
          scoreboardItem.scoreboard === "S2" && scoreboardItem.type === "extra"
      );

      const s2Extras =
        s2ExtrasScoreboard.length > 0
          ? s2ExtrasScoreboard.map((scoreboardItem: any) => {
              return {
                b: scoreboardItem.bye,
                lb: scoreboardItem.leg_bye,
                wide: scoreboardItem.wide,
                nb: scoreboardItem.noball_balls + scoreboardItem.noball_runs,
                p: scoreboardItem.penalty,
                total:
                  scoreboardItem.bye +
                  scoreboardItem.leg_bye +
                  scoreboardItem.wide +
                  scoreboardItem.noball_balls +
                  scoreboardItem.noball_runs +
                  scoreboardItem.penalty,
              };
            })[0]
          : undefined;

      setS2Extras(s2Extras);
    }
  }, [fixture.scoreboards, s1Team, s2Team]);

  // Fifth useEffect to set S1Fow and S2Fow (Fall of wickets)
  useEffect(() => {
    if (fixture.batting.length > 0) {
      // S1 fall of wickets
      const s1Fow = fixture.batting
        .filter(
          (batting: any, index: number) =>
            batting.scoreboard === "S1" && batting.result.is_wicket === true
        )
        .sort(
          (batting1: any, batting2: any) =>
            batting1.fow_balls - batting2.fow_balls
        );

      // Set S1 fall of wickets
      s1Fow.length > 0
        ? setS1FallOfWickets(s1Fow)
        : setS1FallOfWickets(undefined);

      // S2 fall of wickets
      const s2Fow = fixture.batting
        .filter(
          (batting: any, index: number) =>
            batting.scoreboard === "S2" && batting.result.is_wicket === true
        )
        .sort(
          (batting1: any, batting2: any) =>
            batting1.fow_balls - batting2.fow_balls
        );

      // Set S2 fall of wickets
      s2Fow.length > 0
        ? setS2FallOfWickets(s2Fow)
        : setS2FallOfWickets(undefined);
    }
  }, [fixture.batting, s1Team, s2Team]);

  const router = useRouter();

  // Call this function whenever you want to
  // refresh props!
  // const refreshData = () => {
  //   router.replace(router.asPath);
  // };

  // Timer to test/trigger state updates - testing purpose

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log("timer initiated");
  //     // setTabIndex(1);
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, []);

  // useEffect(() => {
  //   router.push(
  //     `/matchcenter/${fixture.id}/${fixture.localteam.code}vs${fixture.visitorteam.code}/live-commentary`
  //   );
  // }, []);

  return (
    <SectionWrapper styles={{ paddingX: bp > 3 ? 9 : 2 }}>
      {/* <p>Match center WIP</p> */}
      {fixture && s1Team && s2Team && (
        <div
          sx={{
            display: "flex",
            flexDirection: ["column", "row"],
            width: "fit-content",
          }}
        >
          <Pill
            label={`${s1Team.name} vs ${s2Team.name} - ${fixture.league.code} ${fixture.round} ${fixture.stage.name} `}
            theme={ColorTheme.LIGHT}
          />
          <Pill
            label={`Live`}
            theme={ColorTheme.DARK}
            styles={{ marginY: [1, 0], marginX: [0, 1], width: "fit-content" }}
          />
        </div>
      )}

      {fixture && s1Team && s2Team && (
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: [null, null, "space-evenly"],
            flexDirection: ["column", null, "row"],
            padding: [1, null, null, 4],
            background: colors.gray300,
            border: "1px solid",
            borderColor: "rgba(12, 12, 12, 0.17)",
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            marginY: 2,
          }}
        >
          <div
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: [null, null, 1],
            }}
          >
            {bp > 2 && (
              <img
                src={s1Team.image}
                sx={{ height: ["35px", null, null, "65px"] }}
              />
            )}
            <div
              sx={{
                display: "flex",
                flexDirection: ["row", null, "column"],
                alignItems: "center",
              }}
            >
              <p
                sx={{
                  padding: 1,
                  variant: bp > 3 ? "text.subheading3" : "text.label4",
                }}
              >
                {s1Team.code}
              </p>
              <p
                sx={{
                  paddingX: 1,
                  variant: bp > 3 ? "text.subheading2" : "text.label4",
                }}
              >
                {getScore(fixture.scoreboards, "S1")}
              </p>
            </div>
          </div>
          {bp > 10 && (
            <div
              sx={{
                padding: [null, null, null, 2],
                background: colors.black,
                borderRadius: "10px",
              }}
            >
              <p
                sx={{
                  padding: [null, null, null, 2],
                  color: colors.white,
                  variant: "text.heading3",
                }}
              >
                {/* Zimbabwe won by 1 run 🏆 */}
                {fixture.status}
              </p>
            </div>
          )}

          <div
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: [null, null, 1],
            }}
          >
            {bp > 2 && (
              <img
                src={s2Team?.image}
                sx={{ height: ["35px", null, null, "65px"] }}
              />
            )}

            <div
              sx={{
                display: "flex",
                flexDirection: ["row", null, "column"],
                alignItems: "center",
              }}
            >
              <p
                sx={{
                  padding: 1,
                  variant: bp > 3 ? "text.subheading3" : "text.subheading3",
                }}
              >
                {s2Team.code}
              </p>
              <p
                sx={{
                  paddingX: 1,
                  variant: bp > 3 ? "text.subheading2" : "text.label4",
                  fontWeight: "bold",
                }}
              >
                {getScore(fixture.scoreboards, "S2")}
              </p>
            </div>
          </div>
        </div>
      )}

      <Tabs
        selectedIndex={tabIndex}
        onSelect={(index) => setTabIndex(index)}
        sx={{ ...tabStyles }}
      >
        <TabList>
          <Tab
          // onClick={() => {
          //   router.push("/matchcenter/42776/ind-vs-rsa-2022/match-info");
          // }}
          >
            {/* <div sx={{ display: "flex", alignItems: "center" }}>
              <BatIcon
                styles={{
                  paddingRight: 1,
                  "> svg": { fontSize: "22px", color: colors.black },
                }}
              />
              <p>Match info</p>
            </div> */}
            <p>Match info</p>
          </Tab>
          <Tab
          // onClick={() => {
          //   router.push("/matchcenter/42776/ind-vs-rsa-2022/live-commentary");
          // }}
          >
            <p>Live commentary</p>
          </Tab>
          <Tab
          // onClick={() => {
          //   router.push("/matchcenter/42776/ind-vs-rsa-2022/scorecard");
          // }}
          >
            <p>Scorecard</p>
          </Tab>
          <Tab
          // onClick={() => {
          //   router.push("/matchcenter/42776/ind-vs-rsa-2022/trending");
          // }}
          >
            <p>Trending</p>
          </Tab>
          <Tab
          // onClick={() => {
          //   router.push("/matchcenter/42776/ind-vs-rsa-2022/news");
          // }}
          >
            <p>News</p>
          </Tab>
        </TabList>
        <TabPanel>This section contains the match info</TabPanel>
        <TabPanel>
          {/* Livecommentary tab panel */}
          {fixture.status !== "NA" &&
            fixture.balls.length > 0 &&
            s1Team &&
            s2Team && (
              <LiveCommentary
                balls={fixture.balls}
                status={fixture.status}
                note={fixture.note}
                batting={fixture.batting}
                bowling={fixture.bowling}
              />
            )}
        </TabPanel>

        <TabPanel>
          {/* Scorecard tab panel */}
          {s1Team && s2Team && (
            // Should apply mobile responsive custom styles
            <Scoreboard
              fixture={fixture}
              s1Team={s1Team}
              s1DidNotBat={s1DidNotBat}
              s1Extras={s1Extras}
              s1FallOfWickets={s1FallOfWickets}
              s2Team={s2Team}
              s2DidNotBat={s2DidNotBat}
              s2Extras={s2Extras}
              s2FallOfWickets={s2FallOfWickets}
            />
          )}
        </TabPanel>
        <TabPanel>This section contains trending socials</TabPanel>
        <TabPanel>This section related articles</TabPanel>
      </Tabs>
    </SectionWrapper>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const slug = context.params.slug;
    if (slug.length === 0) {
      return {};
    }
    console.log(slug);
    const fixtureId = slug[0];
    const res = await fetch(
      `https://cricket.sportmonks.com/api/v2.0/fixtures/${fixtureId}?api_token=arQupbeQwcFvjafCxxqydm2XgMRbqRhWjUNJaINkNSG8n75Np9wNPG7aQu2f&include=visitorteam, localteam, league, venue, scoreboards, manofmatch, batting, batting.batsman, batting.batsmanout, batting.result, batting.bowler, batting.catchstump, batting.runoutby, odds.bookmaker, bowling, bowling.bowler, scoreboards.team,balls, balls.batsmanout, balls.batsmanone,balls.batsmantwo,balls.catchstump,balls.score,balls.runoutby, lineup, tosswon, runs,stage, runs.team`
    );
    const fixture = await res.json();

    // Pass data to the page via props
    return {
      props: { fixture },
    };
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default MatchCenter;
