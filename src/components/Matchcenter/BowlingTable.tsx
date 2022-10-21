/** @jsxImportSource theme-ui */

import BowlingTableHeader from "./BowlingTableHeader";

type InningsTableProps = {
  fixture: any;
  innings: any;
};

const BowlingTable = (props: InningsTableProps) => {
  const { fixture, innings } = props;
  return (
    <div>
      <BowlingTableHeader />
      {fixture.bowling.map((bowling: any, index: number) => {
        return bowling.scoreboard === innings ? (
          <div sx={{ display: "flex", padding: 1 }}>
            <p sx={{ flexBasis: "16.66%" }}>{bowling.bowler.lastname}</p>
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
      })}
    </div>
  );
};

export default BowlingTable;
