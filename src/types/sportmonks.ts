import { FixtureStatus } from "./matchcenter";

export type Fixture = {
  resource: string;
  id: number;
  league_id: number;
  season_id: number;
  round: string;
  localteam_id: number;
  visitorteam_id: number;
  starting_at: string | Date;
  type: string;
  live: boolean;
  status: string;
  last_period: any;
  note: string;
  venue_id: number;
  toss_won_team_id: number;
  winner_team_id: number;
  draw_noresult: null | boolean;
  first_umpire_id: null | number;
  second_umpire_id: null | number;
  tv_umpire_id: null | number;
  referee_id: null | number;
  man_of_match_id: null | number;
  man_of_series_id: null | number;
  total_overs_played: null | number;
  elected: null | string;
  super_over: null | boolean;
  follow_on: null | boolean;
  localteam_dl_data: any;
  visitorteam_dl_data: any;
  rpc_overs: null | string;
  rpc_target: null | string;
  weather_report: null | Array<any>;
  league: League;
  localteam: Team;
  visitorteam: Team;
  batting: [] | Batting[];
  bowling: [] | Bowling[];
  runs: [] | Runs[];
  scoreboards: [] | Scoreboard[];
  lineup: [] | Player[];
  balls: [] | Ball[];
  manofmatch: null | Player;
  tosswon: null | Team;
  venue: any;
  odds: Array<any>;
  stage: Stage;
};

type League = {
  resource: string;
  id: number;
  season_id: number;
  country_id: number;
  name: string;
  code: string;
  image_path: string;
  type: string;
  updated_at: string | Date;
};

export type Team = {
  resource: string;
  id: number;
  name: string;
  code: string;
  image_path: string;
  country_id: string;
  national_team: boolean;
  updated_at: string | Date;
};

export type Batting = {
  resource: string;
  id: number;
  sort: string;
  fixture_id: number;
  team_id: number;
  active: boolean;
  scoreboard: string;
  player_id: number;
  ball: number;
  score_id: number;
  score: number;
  four_x: number;
  six_x: number;
  catch_stump_player_id: number;
  runout_by_id: null | number;
  batsmanout_id: null | number;
  bowling_player_id: number;
  fow_score: number;
  fow_balls: number;
  rate: number;
  updated_at: string | Date;
  batsman: Player;
  bowler: Player;
  catchstump: Player;
  batsmanout: null | string;
  runoutby: null | string;
  result: Scores;
};

export type Bowling = {
  resource: "bowlings";
  id: number;
  sort: number;
  fixture_id: number;
  team_id: number;
  active: boolean;
  scoreboard: string;
  player_id: number;
  overs: number;
  medians: number;
  runs: number;
  wickets: number;
  wide: number;
  noball: number;
  rate: number;
  updated_at: string | Date;
  bowler: Player;
};

export type Player = {
  resource: string;
  id: number;
  country_id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  image_path: string;
  dateofbirth: string | Date;
  gender: string;
  battingstyle: string;
  bowlingstyle: null;
  position: Position;
  updated_at: string | Date;
  lineup?: undefined | null | Lineup;
};

export type Lineup = {
  team_id: number;
  captain: boolean;
  wicketkeeper: boolean;
  substitution: boolean;
};

type Position = {
  resource: string;
  id: number;
  name: string;
};

export type Scores = {
  resource: "scores";
  id: number;
  name: string;
  runs: number;
  four: boolean;
  six: boolean;
  bye: number;
  leg_bye: number;
  noball: number;
  noball_runs: number;
  is_wicket: boolean;
  ball: boolean;
  out: boolean;
};

type Stage = {
  resource: "stages";
  id: number;
  league_id: number;
  season_id: number;
  name: string;
  code: string;
  type: string;
  standings: boolean;
  updated_at: string | Date;
};

export type Ball = {
  resource: "balls";
  id: number;
  fixture_id: number;
  team_id: number;
  ball: number;
  scoreboard: string;
  batsman_one_on_creeze_id: number;
  batsman_two_on_creeze_id: number;
  batsman_id: number;
  bowler_id: number;
  batsmanout_id: null | number;
  catchstump_id: null | number;
  runout_by_id: null | number;
  score_id: number | null;
  batsman: Player;
  bowler: Player;
  batsmanone: Player;
  batsmantwo: Player;
  batsmanout: any;
  catchstump: any;
  runoutby: any;
  score: Scores;
  team: Team;
  updated_at: string | Date;
};

export type Scoreboard = {
  resource: "scoreboards";
  id: number;
  fixture_id: number;
  team_id: number;
  type: string;
  scoreboard: string;
  wide: number;
  noball_runs: number;
  noball_balls: number;
  bye: number;
  leg_bye: number;
  penalty: number;
  total: number;
  overs: number;
  wickets: number;
  updated_at: string | Date;
  team: Team;
};

type Runs = {
  resource: "runs";
  id: number;
  fixture_id: number;
  team_id: number;
  inning: number;
  score: number;
  wickets: number;
  overs: number;
  pp1: string;
  pp2: null;
  pp3: null;
  updated_at: string | Date;
  team: null | Team;
};
