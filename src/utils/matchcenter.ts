import { getYear } from "date-fns";
import { Batting as BattingT, Player as PlayerT } from "../types/sportmonks";

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
