/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { getScore } from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { useState, useEffect } from "react";
import InningsTable from "../../components/Matchcenter/Scoreboard/InningsTable";
import BowlingTable from "../../components/Matchcenter/Scoreboard/BowlingTable";
import InningsAdditionalInfo from "../../components/Matchcenter/Scoreboard/InningsAdditionalInfo";
import { colors } from "../../styles/theme";
import FallOfWickets from "../../components/Matchcenter/Scoreboard/FallofWickets";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const getTeamLineup = (lineup: any, teamId: any) => {
  const teamLineup = lineup.filter((lineupItem: any) => {
    return lineupItem.lineup.team_id === teamId;
  });
  return teamLineup;
};

const getPlayersDidNotBat = (
  fixtureBatting: any,
  lineup: any,
  innings: any,
  teamId: any
) => {
  // fixtureBattings - contains the battings of both teams
  // lineup - contains lineup of both teams (resource - player)
  // innings - Enum: S1 or S2
  // teamId - number

  // The below filters the players who batted in the specified innings. Check innings param for innings code.
  const playerIdsWhoBattedInTheInnings = fixtureBatting
    .filter((batting: any) => {
      return batting.scoreboard === innings;
    })
    .map((item: any) => item.player_id);

  const teamLineup = lineup.filter((lineupItem: any) => {
    return lineupItem.lineup.team_id === teamId;
  });

  const playersNotBattedInTheInnings = teamLineup.filter((player: any) => {
    return playerIdsWhoBattedInTheInnings.indexOf(player.id) === -1;
  });
  return playersNotBattedInTheInnings;
};

const MatchCenter = (props: { fixture: any }): JSX.Element => {
  console.log(props.fixture);
  const fixture = props.fixture.data;
  if (fixture.status === "NS") {
    return <div>Game not started yet...</div>;
  }
  const bp = useBreakpointIndex();
  // WIP: S1 and S2 team details

  // Util to get the opposite team info (toss lost team)
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

  const getTeamInfo = () => {
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

  // First useEffect to fetch both S1 and S2 team details
  useEffect(() => {
    /* 
    The below function does the following:
    1. Sets the first batting team info in s1Team
    2. Sets the second batting team info in the s2Team
    See method internals to understand the implementation logics
    */
    if (fixture.resource === "fixtures") {
      getTeamInfo();
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
          ? getPlayersDidNotBat(fixture.batting, s1TeamLineup, "S1", s1Team.id)
          : s1TeamLineup;

      // S2Team player did not bat
      const s2DidNotBat =
        fixture.scoreboards.filter(
          (scoreboardItem: any) =>
            scoreboardItem.scoreboard === "S2" &&
            scoreboardItem.type === "total"
        )?.length > 0
          ? getPlayersDidNotBat(fixture.batting, s2TeamLineup, "S2", s2Team.id)
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

  return (
    <SectionWrapper styles={{ paddingX: bp > 3 ? 9 : 4 }}>
      {s1Team && s2Team && (
        <Tabs forceRenderTabPanel defaultIndex={undefined}>
          <TabList>
            <Tab>{s1Team.name}</Tab>
            <Tab>{s2Team.name}</Tab>
          </TabList>
          <TabPanel>
            {/* First innings team stats */}
            <>
              <InningsTable
                innings={"S1"}
                fixture={fixture}
                teamName={s1Team.name}
              />
              <InningsAdditionalInfo
                extras={s1Extras}
                score={getScore(fixture.scoreboards, "S1")}
                playersDidNotBat={s1DidNotBat}
                fallOfWickets={s1FallOfWickets}
              />
              <BowlingTable fixture={fixture} innings={"S1"} />
              <FallOfWickets fallOfWickets={s1FallOfWickets} />
            </>
          </TabPanel>
          <TabPanel>{/* Second innings team stats */}</TabPanel>
        </Tabs>
      )}

      <p>Scorecard WIP</p>
      <div
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 2,
          background: colors.mint,
          marginBottom: 1,
        }}
      >
        <p sx={{ variant: "text.subheading3", color: colors.white }}>
          🏆 {fixture.note}
        </p>
      </div>
      {/* Innings scorecard starts below */}

      {/* Render top innings table */}
      {s1Team && s2Team ? (
        fixture.status === "2nd Innings" ? (
          <>
            <InningsTable
              innings={"S2"}
              fixture={fixture}
              teamName={s2Team.name}
            />
            <InningsAdditionalInfo
              extras={s2Extras}
              score={getScore(fixture.scoreboards, "S2")}
              playersDidNotBat={s2DidNotBat}
              fallOfWickets={s2FallOfWickets}
            />
          </>
        ) : (
          <>
            <InningsTable
              innings={"S1"}
              fixture={fixture}
              teamName={s1Team.name}
            />
            <InningsAdditionalInfo
              extras={s1Extras}
              score={getScore(fixture.scoreboards, "S1")}
              playersDidNotBat={s1DidNotBat}
              fallOfWickets={s1FallOfWickets}
            />
          </>
        )
      ) : (
        <>Innings scoreboard loading...</>
      )}

      {/* Above innings bowling stats. Dependent on the match status */}
      {fixture.status === "2nd Innings" ? (
        <BowlingTable fixture={fixture} innings={"S2"} />
      ) : (
        <BowlingTable fixture={fixture} innings={"S1"} />
      )}

      {/* Fall of wickets. Dependent on the match status */}
      {fixture.status === "2nd Innings" ? (
        <FallOfWickets fallOfWickets={s2FallOfWickets} />
      ) : (
        <FallOfWickets fallOfWickets={s1FallOfWickets} />
      )}

      {/* Render bottom innings table. Dependent on the match status. */}
      {s1Team && s2Team ? (
        fixture.status === "2nd Innings" ? (
          <>
            <InningsTable
              fixture={fixture}
              innings={"S1"}
              teamName={s1Team.name}
            />
            <InningsAdditionalInfo
              extras={s1Extras}
              score={getScore(fixture.scoreboards, "S1")}
              playersDidNotBat={s1DidNotBat}
              fallOfWickets={s1FallOfWickets}
            />
          </>
        ) : (
          <>
            <InningsTable
              fixture={fixture}
              innings={"S2"}
              teamName={s2Team.name}
            />
            <InningsAdditionalInfo
              extras={s2Extras}
              score={getScore(fixture.scoreboards, "S2")}
              playersDidNotBat={s2DidNotBat}
              fallOfWickets={s2FallOfWickets}
            />
          </>
        )
      ) : (
        <></>
      )}
      {/* Above innings bowling stats. Dependent on the match status */}
      {fixture.status === "2nd Innings" ? (
        <BowlingTable fixture={fixture} innings={"S1"} />
      ) : (
        <BowlingTable fixture={fixture} innings={"S2"} />
      )}

      {/* Fall of wickets. Dependent on the match status */}
      <div sx={{ display: "flex" }}>
        <div sx={{ flexBasis: "50%" }}>
          {fixture.status === "2nd Innings" ? (
            <FallOfWickets fallOfWickets={s1FallOfWickets} />
          ) : (
            <FallOfWickets fallOfWickets={s2FallOfWickets} />
          )}
        </div>
        <div>
          <p sx={{ variant: "text.subheading3", paddingY: 2, paddingX: 1 }}>
            Match stats
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const slug = context.params.slug;
    console.log(slug);
    const fixtureId = slug[0];
    const res = await fetch(
      `https://cricket.sportmonks.com/api/v2.0/fixtures/${fixtureId}?api_token=arQupbeQwcFvjafCxxqydm2XgMRbqRhWjUNJaINkNSG8n75Np9wNPG7aQu2f&include=visitorteam, localteam, league, venue, scoreboards, manofmatch, batting, batting.batsman, batting.batsmanout, batting.result, batting.bowler, batting.catchstump, batting.runoutby, odds.bookmaker, bowling, bowling.bowler, scoreboards.team,balls, balls.batsmanout, balls.batsmanone,balls.batsmantwo,balls.catchstump,balls.score,balls.runoutby, lineup, tosswon`
    );
    const fixture = await res.json();

    // Pass data to the page via props
    return { props: { fixture } };
  } catch (err) {
    console.log(err);
    return {};
  }
}

export default MatchCenter;
