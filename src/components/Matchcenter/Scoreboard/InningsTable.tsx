/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { Fragment } from "react";
import { colors } from "../../../styles/theme";
import InningsTableHeader from "./InningsTableHeader";

type InningsTableProps = {
  fixture: any;
  teamInfo: any;
  innings?: any;
};

export const getWicketCatchStumpRunout = (
  wicketType: any,
  catchstump: any,
  bowlerName: any,
  runoutBy: any
) => {
  const wicketPlayerNames = wicketType.includes("Catch Out")
    ? `c ${catchstump} b ${bowlerName}`
    : wicketType === "Clean Bowled"
    ? `b ${bowlerName}`
    : wicketType === "LBW OUT"
    ? `lbw ${bowlerName}`
    : wicketType.includes("Run Out")
    ? catchstump && runoutBy
      ? `run out (${catchstump} / ${runoutBy})`
      : catchstump
      ? `run out (${catchstump})`
      : runoutBy
      ? `run out (${runoutBy})`
      : `run out`
    : wicketType === "Stump Out"
    ? `st ${catchstump} b ${bowlerName}`
    : ``; // some other out here
  return wicketPlayerNames;
};

const getLabel = (bp: any, sm: any, lg: any) => {};

const InningsTable = (props: InningsTableProps) => {
  const { fixture, teamInfo, innings } = props;
  const isScoreboardAvailable = fixture.batting.filter(
    (batting: any, index: number) => batting.scoreboard === innings
  );
  if (isScoreboardAvailable.length === 0) {
    return <>Batting innings not available</>;
  }
  const bp = useBreakpointIndex();
  return (
    <Fragment>
      <InningsTableHeader
        fixture={fixture}
        teamInfo={teamInfo}
        innings={innings}
      />
      {fixture.batting.map((batting: any, index: number) => {
        const batsmanName =
          bp > 3 ? batting.batsman.fullname : batting.batsman.lastname;
        const isBatsmanOut = batting.result.is_wicket;
        const result = batting.result.name;
        const bowlerName = batting.bowler ? batting.bowler.lastname : "";
        const catchstump = batting.catchstump
          ? batting.catchstump.lastname
          : "";
        const runoutBy = batting.runoutby ? batting.runoutby.lastname : "";
        return batting.scoreboard === innings ? (
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
                flexBasis: "30%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p sx={{ variant: "text.subheading3" }}>{batsmanName}</p>
              <p
                sx={{
                  // variant: "text.label1",
                  paddingTop: 1,
                  color: colors.gray100,
                }}
              >
                {isBatsmanOut
                  ? getWicketCatchStumpRunout(
                      result,
                      catchstump,
                      bowlerName,
                      runoutBy
                    )
                  : `Not out`}
              </p>
            </li>
            <li sx={{ flexBasis: "17.5%" }}>
              {batting.score} {` (${batting.ball})`}
            </li>
            <li sx={{ flexBasis: "17.5%" }}> {batting.four_x}</li>
            <li sx={{ flexBasis: "17.5%" }}> {batting.six_x}</li>
            <li sx={{ flexBasis: "17.5%" }}> {batting.rate}</li>
          </ul>
        ) : (
          <></>
        );
      })}
    </Fragment>
  );
};

export default InningsTable;
