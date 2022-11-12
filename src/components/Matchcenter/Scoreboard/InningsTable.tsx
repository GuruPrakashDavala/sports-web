/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { Fragment } from "react";
import { colors } from "../../../styles/theme";
import { TeamInfo } from "../../../types/matchcenter";
import { Fixture as FixtureT } from "../../../types/sportmonks";
import InningsTableHeader from "./InningsTableHeader";

type InningsTableProps = {
  fixture: FixtureT;
  teamInfo: TeamInfo;
  innings: string;
};

export const getWicketCatchStumpRunout = (
  wicketType: string,
  catchstump: string,
  bowlerName: string,
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

const InningsTable = (props: InningsTableProps) => {
  const { fixture, teamInfo, innings } = props;

  const isScoreboardAvailable = fixture.batting.filter(
    (batting) => batting.scoreboard === innings
  );

  const bp = useBreakpointIndex();

  if (isScoreboardAvailable.length === 0) {
    return <>Batting innings not available</>;
  }

  return (
    <Fragment>
      <InningsTableHeader
        fixture={fixture}
        teamInfo={teamInfo}
        innings={innings}
      />
      {fixture.batting.map((batting, index: number) => {
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
            key={index}
            sx={{
              display: "flex",
              padding: 1,
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid",
              borderColor: "rgba(12, 12, 12, 0.17)",
              gap: 1,
            }}
          >
            <li
              sx={{
                flexBasis: "40%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p sx={{ variant: "text.subheading3" }}>{batsmanName}</p>
              <p
                sx={{
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
            <li sx={{ flexBasis: "15%" }}>
              {batting.score} {` (${batting.ball})`}
            </li>
            <li sx={{ flexBasis: "15%" }}> {batting.four_x}</li>
            <li sx={{ flexBasis: "15%" }}> {batting.six_x}</li>
            <li sx={{ flexBasis: "15%" }}> {batting.rate}</li>
          </ul>
        ) : (
          <></>
        );
      })}
    </Fragment>
  );
};

export default InningsTable;
