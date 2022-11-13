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
  ThirdInnings = "3rd Innings",
  FourthInnings = "4th Innings",
  StumpDayOne = "Stump Day 1",
  StumpDayTwo = "Stump Day 2",
  StumpDayThree = "Stump Day 3",
  StumpDayFour = "Stump Day 4",
  TeaBreak = "Tea Break",
  Lunch = "Lunch",
  Dinner = "Dinner",
  Postponed = "Postp.",
  Delayed = "Delayed",
  Cancelled = "Cancl.",
}

export type TeamInfo = {
  name: string;
  code: string;
  image: string;
  id: number;
};
