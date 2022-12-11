/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { getYear } from "date-fns";
import { FixtureStatus } from "../types/matchcenter";
import {
  Ball as BallT,
  Batting as BattingT,
  Player as PlayerT,
  Scores as ScoresT,
} from "../types/sportmonks";
import BallInfoCircle from "../components/Matchcenter/Livecommentary/utils/BallInfoCircle";
import { colors } from "../styles/theme";
import { useBreakpointIndex } from "@theme-ui/match-media";

export const now = new Date();

export const mdTabLists = [
  { id: "0", name: "match info" },
  { id: "1", name: "live commentary" },
  { id: "2", name: "scorecard" },
  // { id: "3", name: "trending" },
];

export const smTabLists = [
  { id: "0", name: "match info" },
  { id: "1", name: "commentary" },
  { id: "2", name: "scorecard" },
];

export const fixtureBaseFields = [
  "visitorteam",
  "localteam",
  "league",
  "venue",
  "scoreboards",
  "manofmatch",
  "batting",
  "batting.batsman",
  "batting.batsmanout",
  "batting.result",
  "batting.bowler",
  "batting.catchstump",
  "batting.runoutby",
  "odds.bookmaker",
  "odds",
  "odds.market",
  "bowling",
  "bowling.bowler",
  "scoreboards.team",
  "lineup",
  "tosswon",
  "runs",
  "stage",
  "runs.team",
  "firstumpire",
  "secondumpire",
];

export const fixtureBallFields = [
  "balls",
  "balls.batsmanout",
  "balls.batsmanone",
  "balls.batsmantwo",
  "balls.catchstump",
  "balls.score",
  "balls.runoutby",
];

// lineup array contains team players (player resource)
export const getTeamLineup = (lineup: PlayerT[], teamId: number) => {
  const teamLineup = lineup.filter((lineupItem) => {
    return lineupItem.lineup?.team_id === teamId;
  });
  return teamLineup;
};

export const getPlayersDidNotBat = (
  fixtureBatting: BattingT[],
  lineup: PlayerT[],
  innings: string
) => {
  // fixtureBatting - contains the battings of both teams
  // lineup - contains lineup of specific team (11 players)
  // innings - Enum: S1 or S2
  // teamId - number

  // The below filters the players who batted in the specified innings. Check innings param for innings code
  const playerIdsWhoBattedInTheInnings = fixtureBatting
    .filter((batting) => {
      return batting.scoreboard === innings;
    })
    .map((item) => item.player_id);

  const playersDidNotBatInTheInnings = lineup.filter((player) => {
    return playerIdsWhoBattedInTheInnings.indexOf(player.id) === -1;
  });

  return playersDidNotBatInTheInnings;
};

export const getRouteUrl = (
  fixtureId: number,
  s1TeamCode: string,
  s2TeamCode: string,
  leagueCode: string,
  matchDate: string
) => {
  const baseUrl = `/matchcenter`;
  // constructed url would look like - /matchcenter/42776/wct20-ind-vs-rsa-2022/
  const year = getYear(new Date(matchDate));
  const routeUrl = `${baseUrl}/${fixtureId}/${leagueCode}-${s1TeamCode}-vs-${s2TeamCode}-${year}`;
  return routeUrl;
};

export const isMatchLive = (status: string) => {
  const isLive =
    status === FixtureStatus.FirstInnings ||
    status === FixtureStatus.SecondInnings ||
    status === FixtureStatus.InningsBreak ||
    status === FixtureStatus.Interrupted ||
    status === FixtureStatus.Delayed;

  return isLive;
};

export const isMatchFinished = (status: string) => {
  const isFinished =
    status === FixtureStatus.Finished ||
    status === FixtureStatus.Abandoned ||
    status === FixtureStatus.Cancelled;

  return isFinished;
};

// Livescore util functions and components

// Util functions

export const getSingleOverScoresBallbyBall = (
  over: number,
  innings: string,
  balls: BallT[]
) => {
  const value = Number((over % 1).toFixed(1));
  if (value === 0.1) {
    const overNumber = Math.round(over);
    const ballsInAnOver = [
      overNumber + 0.1,
      overNumber + 0.2,
      overNumber + 0.3,
      overNumber + 0.4,
      overNumber + 0.5,
      overNumber + 0.6,
    ];
    const overSummary = balls
      .filter(
        (ball) =>
          ballsInAnOver.includes(ball.ball) && ball.scoreboard === innings
      )
      .map((ball) => {
        return {
          ball: ball.ball,
          run: ball.score.runs,
          isWicket: ball.score.is_wicket,
          wide: !ball.score.ball,
          noball: ball.score.noball,
          noballRuns: ball.score.noball_runs,
          leg_bye: ball.score.leg_bye,
          bye: ball.score.bye,
          six: ball.score.six,
          four: ball.score.four,
        };
      });
    return overSummary;
  }
};

export const getTeamScore = (over: number, innings: string, balls: BallT[]) => {
  let score = 0;
  let wickets = 0;
  const overNumber = over;
  balls.forEach((ball) => {
    if (ball.scoreboard === innings) {
      if (ball.ball < overNumber) {
        score += ball.score.runs;
      }

      if (ball.ball < overNumber && ball.score.leg_bye) {
        score += ball.score.leg_bye;
      }

      if (ball.ball < overNumber && ball.score.bye) {
        score += ball.score.bye;
      }

      if (ball.ball < overNumber && ball.score.is_wicket) {
        wickets += 1;
      }
    }
  });
  return { score, wickets };
};

export const getOversSummary = (innings: string, balls: BallT[]) => {
  const oversSummary = balls
    .filter((ball) => {
      const isFirstBallInFreshOver = Number((ball.ball % 1).toFixed(1));
      if (isFirstBallInFreshOver === 0.1 && ball.scoreboard === innings) {
        return ball;
      }
    })
    .map((ball) => {
      const overSummary = getSingleOverScoresBallbyBall(
        ball.ball,
        innings,
        balls
      );
      const over = Math.round(ball.ball) + 1;
      return {
        over,
        balls: overSummary,
        teamScore: getTeamScore(over, innings, balls),
      };
    });

  return oversSummary;
};

export const getWicketType = (type: string): string => {
  const wicketType = type.includes("Run Out") ? "Run Out" : type;
  return wicketType;
};

export const getWicketCommentary = (
  ball: BallT,
  wicketType: string
): string => {
  const type = getWicketType(wicketType);
  switch (type) {
    case "Catch Out": {
      return `Caught by ${ball.catchstump.fullname}. ${ball.batsmanout.fullname} out!`;
    }
    case "Clean Bowled": {
      return `Clean Bowled. ${ball.batsmanout.fullname} out!`;
    }
    case "LBW OUT": {
      return `LBW. ${ball.batsmanout.fullname} out!`;
    }
    case "Stump Out": {
      return `Stumped. ${ball.batsmanout.fullname} out!`;
    }
    case "Run Out": {
      const runoutBy = ball.runoutby
        ? `(${ball.runoutby.fullname} / ${ball.catchstump.fullname})`
        : ball.catchstump
        ? `${ball.catchstump.fullname}`
        : ``;
      return `Runout by ${runoutBy}. ${ball.batsmanout.fullname} out!`;
    }
    default:
      return ``;
  }
};

// Util components

export const InfoCircle = (props: {
  type: string | number;
  runs?: number;
}): JSX.Element => {
  const { type, runs } = props;
  switch (type) {
    case "six":
      return <BallInfoCircle ball={`6`} color={colors.green} />;

    case "four":
      return <BallInfoCircle ball={`4`} color={colors.yellow300} />;

    case "bye":
      return <BallInfoCircle ball={`b`} color={colors.black} runs={runs} />;

    case "leg bye":
      return <BallInfoCircle ball={`lb`} color={colors.black} runs={runs} />;

    case "no ball":
      return <BallInfoCircle ball={`nb`} color={colors.black} runs={runs} />;

    case "wide":
      return <BallInfoCircle ball={`wd`} color={colors.black} runs={runs} />;

    case "wicket":
      return <BallInfoCircle ball={`W`} color={colors.red150} />;

    default:
      return <BallInfoCircle ball={type} color={colors.gray200} />;
  }
};

export const NormalCommentary = (props: { ball: BallT }): JSX.Element => {
  const { ball } = props;
  const bp = useBreakpointIndex();
  return (
    <Fragment>
      <p sx={{ display: "inline", variant: bp < 1 ? "text.body4" : undefined }}>
        {`${ball.ball} - ${ball.bowler.fullname} to ${ball.batsman.fullname}.`}
        &nbsp;
      </p>

      <p
        sx={{
          display: "inline",
          variant:
            ball.score.six || ball.score.four
              ? "text.subheading3"
              : bp < 1
              ? "text.body4"
              : undefined,
        }}
      >
        {ball.score.name}.
      </p>
    </Fragment>
  );
};

export const getBallInfoCircle = (score: ScoresT): JSX.Element => {
  const type = score.six
    ? `six`
    : score.four
    ? `four`
    : score.bye > 0
    ? `bye`
    : score.leg_bye > 0
    ? `leg bye`
    : score.noball > 0
    ? `no ball`
    : !score.ball
    ? `wide`
    : score.runs;
  return <InfoCircle type={type} runs={score.runs} />;
};