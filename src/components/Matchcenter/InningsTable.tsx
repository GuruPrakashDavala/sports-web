/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import InningsTableHeader from "./InningsTableHeader";

type InningsTableProps = {
  fixture: any;
  teamName: any;
  innings?: any;
};

const InningsTable = (props: InningsTableProps) => {
  const { fixture, teamName, innings } = props;
  console.log(props);
  //const teamName = "teamName";
  return (
    <Fragment>
      <InningsTableHeader
        fixture={fixture}
        teamName={teamName}
        innings={innings}
      />
      {fixture.batting.map((batting: any, index: number) => {
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
      })}
    </Fragment>
  );
};

export default InningsTable;
