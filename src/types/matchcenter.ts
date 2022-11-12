export type Extras =
  | {
      b: number;
      lb: number;
      wide: number;
      nb: number;
      p: number;
      total: number;
    }
  | undefined;

export enum FixtureStatus {
  NotStarted = "NS",
  Abandoned = "Aban.",
  FirstInnings = "1st Innings",
  SecondInnings = "2nd Innings",
  InningsBreak = "Innings Break",
  Interrupted = "Int.",
  Finished = "Finished",
}

export type TeamInfo = {
  name: string;
  code: string;
  image: string;
  id: number;
};
