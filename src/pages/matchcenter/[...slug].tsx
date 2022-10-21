/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { getScore } from "../../components/Cards/FixtureCard";
import SectionWrapper from "../../components/Wrappers/SectionWrapper";
import { colors } from "../../styles/theme";
import { useState, useEffect } from "react";
import InningsTable from "../../components/Matchcenter/InningsTable";
import BowlingTable from "../../components/Matchcenter/BowlingTable";
import InningsTableHeader from "../../components/Matchcenter/InningsTableHeader";
import InningsAdditionalInfo from "../../components/Matchcenter/InningsAdditionalInfo";

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
    .filter((battingItem: any) => {
      return battingItem.scoreboard === innings;
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

  // divide this into sub components
  const getInningsTable = (innings: any): JSX.Element => {
    return fixture.batting.map((batting: any, index: number) => {
      return batting.scoreboard === innings ? (
        <div sx={{ display: "flex", padding: 1 }}>
          <p sx={{ flexBasis: "16.66%" }}> {batting.batsman.fullname}</p>
          <p sx={{ flexBasis: "16.66%" }}> {batting.score}</p>
          <p sx={{ flexBasis: "16.66%" }}> {batting.ball}</p>
          <p sx={{ flexBasis: "16.66%" }}> {batting.four_x}</p>
          <p sx={{ flexBasis: "16.66%" }}> {batting.six_x}</p>
          <p sx={{ flexBasis: "16.66%" }}> {batting.rate}</p>
        </div>
      ) : (
        <></>
      );
    });
  };

  const getBowlingTable = (innings: any): JSX.Element => {
    return fixture.bowling.map((bowling: any, index: number) => {
      return bowling.scoreboard === innings ? (
        <div sx={{ display: "flex", padding: 1 }}>
          <div
            sx={{
              flexBasis: "16.66%",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <img
              src={bowling.bowler.image_path}
              sx={{ height: "50px", borderRadius: "50%" }}
            /> */}
            <p sx={{}}>{bowling.bowler.fullname}</p>
          </div>
          <p sx={{ flexBasis: "16.66%" }}> {bowling.overs}</p>
          <p sx={{ flexBasis: "16.66%" }}> {bowling.medians}</p>
          <p sx={{ flexBasis: "16.66%" }}> {bowling.runs}</p>
          <p sx={{ flexBasis: "16.66%" }}> {bowling.wickets}</p>
          <p sx={{ flexBasis: "16.66%" }}> {bowling.noball}</p>
          <p sx={{ flexBasis: "16.66%" }}> {bowling.wide}</p>
          <p sx={{ flexBasis: "16.66%" }}> {bowling.rate}</p>
        </div>
      ) : (
        <></>
      );
    });
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

      setS1DidNotBat(s1DidNotBat);
      setS2DidNotBat(s2DidNotBat);
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

  return (
    <SectionWrapper styles={{ paddingX: 9 }}>
      <p>Scorecard WIP</p>
      <div sx={{ display: "flex", justifyContent: "center" }}>
        <p>{fixture.note}</p>
      </div>
      {/* Table starts below */}
      {/* <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: colors.gray300,
          padding: 1,
        }}
      >
        <p sx={{ variant: "text.subheading3" }}>{s1Team?.name} </p>

        <p sx={{ variant: "text.subheading3" }}>
          {fixture.status === "2nd Innings"
            ? getScore(fixture.scoreboards, "S2")
            : getScore(fixture.scoreboards, "S1")}
        </p>
      </div> */}

      {/* render top scoreboard table */}
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
            />
          </>
        )
      ) : (
        <></>
      )}

      {/* Start of innings additional info */}

      <>
        {/* <div
          sx={{
            backgroundColor: colors.black,
            color: colors.white,
            padding: 1,
            mt: 1,
          }}
        >
          Extras
        </div> */}
        {/* <div
          sx={{
            backgroundColor: colors.black,
            color: colors.white,
            padding: 1,
            mt: 1,
          }}
        >
          Total
        </div> */}
        {/* <div
        sx={{
          backgroundColor: colors.black,
          color: colors.white,
          padding: 1,
          mt: 1,
        }}
      >
        {s1DidNotBat &&
          s1DidNotBat.map((item: any) => {
            return <p>{item.lastname}</p>;
          })}
      </div> */}

        {/* <div
        sx={{
          backgroundColor: colors.black,
          color: colors.white,
          padding: 1,
          mt: 1,
        }}
      >
        Fall of wickets
      </div> */}
      </>

      {/* End of innings additional info */}

      {/* Innings 1 bowling stats - render based on 2nd innings or other status */}
      {fixture.status === "2nd Innings" ? (
        <BowlingTable fixture={fixture} innings={"S2"} />
      ) : (
        <BowlingTable fixture={fixture} innings={"S1"} />
      )}

      {/* render bottom scoreboard table */}
      {s1Team && s2Team ? (
        fixture.status === "2nd Innings" ? (
          <InningsTable
            fixture={fixture}
            innings={"S1"}
            teamName={s1Team.name}
          />
        ) : (
          <InningsTable
            fixture={fixture}
            innings={"S2"}
            teamName={s2Team.name}
          />
        )
      ) : (
        <></>
      )}

      {fixture.status === "2nd Innings" ? (
        <BowlingTable fixture={fixture} innings={"S1"} />
      ) : (
        <BowlingTable fixture={fixture} innings={"S2"} />
      )}
    </SectionWrapper>
  );
};

export async function getServerSideProps(context: any) {
  // Fetch data from external API
  try {
    const slug = context.params.slug;
    console.log(slug);
    const fixtureId = slug[0];
    const res = await fetch(
      `https://cricket.sportmonks.com/api/v2.0/fixtures/${fixtureId}?api_token=arQupbeQwcFvjafCxxqydm2XgMRbqRhWjUNJaINkNSG8n75Np9wNPG7aQu2f&include=visitorteam, localteam, league, venue, scoreboards, manofmatch, batting, batting.batsman, batting.batsmanout, batting.result, batting.bowler, batting.catchstump, batting.runoutby, odds.bookmaker, bowling, bowling.bowler, scoreboards.team,balls, lineup, tosswon`
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
