import { getYear } from "date-fns";
import { FixtureStatus } from "../types/matchcenter";
import { Batting as BattingT, Player as PlayerT } from "../types/sportmonks";

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
