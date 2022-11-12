/** @jsxImportSource theme-ui */

import { Fixture as FixtureT } from "../../../types/sportmonks";
import BowlingTableHeader from "./BowlingTableHeader";

type InningsTableProps = {
  fixture: FixtureT;
  innings: string;
};

const BowlingTable = (props: InningsTableProps) => {
  const { fixture, innings } = props;

  const isBowlingStatsAvailable = fixture.bowling.filter(
    (bowling) => bowling.scoreboard === innings
  );

  if (isBowlingStatsAvailable.length === 0) {
    return null;
  }

  return (
    <div sx={{ paddingY: 1 }}>
      <BowlingTableHeader />
      {fixture.bowling.map((bowling) => {
        return bowling.scoreboard === innings ? (
          <ul
            sx={{
              display: "flex",
              padding: 1,
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid",
              borderColor: "rgba(12, 12, 12, 0.17)",
            }}
          >
            <li
              sx={{
                flexBasis: "20%",
                variant: "text.subheading3",
                paddingY: 1,
              }}
            >
              {bowling.bowler.lastname}
            </li>
            <li sx={{ flexBasis: "11.42%", paddingY: 1 }}> {bowling.overs}</li>
            <li sx={{ flexBasis: "11.42%", paddingY: 1 }}>{bowling.medians}</li>
            <li sx={{ flexBasis: "11.42%", paddingY: 1 }}> {bowling.runs}</li>
            <li sx={{ flexBasis: "11.42%", paddingY: 1 }}>{bowling.wickets}</li>
            <li sx={{ flexBasis: "11.42%", paddingY: 1 }}> {bowling.noball}</li>
            <li sx={{ flexBasis: "11.42%", paddingY: 1 }}> {bowling.wide}</li>
            <li sx={{ flexBasis: "11.42%", paddingY: 1 }}> {bowling.rate}</li>
          </ul>
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default BowlingTable;
