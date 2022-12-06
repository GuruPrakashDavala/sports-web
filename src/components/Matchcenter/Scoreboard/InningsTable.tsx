/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { Fragment } from "react";
import { ThemeUICSSObject } from "theme-ui";
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
): string => {
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
    : wicketType.includes("Hit Wicket")
    ? `${wicketType} b ${bowlerName}`
    : ``; // some other out here
  return wicketPlayerNames;
};

const battingInningsTableRowStyles: ThemeUICSSObject = {
  display: "flex",
  padding: 1,
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid",
  borderColor: colors.gray200,
};

const InningsTable = (props: InningsTableProps) => {
  const { fixture, teamInfo, innings } = props;

  const isScoreboardAvailable = fixture.batting.filter(
    (batting) => batting.scoreboard === innings
  );

  const bp = useBreakpointIndex();

  if (isScoreboardAvailable.length === 0) {
    return <Fragment>Batting innings not available</Fragment>;
  }

  return (
    <Fragment>
      <InningsTableHeader
        fixture={fixture}
        teamInfo={teamInfo}
        innings={innings}
      />
      {fixture.batting.map((batting) => {
        const batsmanName =
          bp > 3 ? batting.batsman.fullname : batting.batsman.lastname;
        const isBatsmanOut = batting.result.is_wicket;
        const result = batting.result.name;
        const bowlerName = batting.bowler ? batting.bowler.fullname : "";
        const catchstump = batting.catchstump
          ? batting.catchstump.lastname
          : "";
        const runoutBy = batting.runoutby ? batting.runoutby.lastname : "";

        return batting.scoreboard === innings ? (
          <ul key={batting.id} sx={battingInningsTableRowStyles}>
            <li
              sx={{
                flexBasis: "40%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                sx={{
                  variant: bp === 0 ? "text.subheading4" : "text.subheading3",
                }}
              >
                {batsmanName}
              </p>
              <p
                sx={{
                  paddingTop: [null, "5px"],
                  color: colors.gray100,
                  variant: "text.body4",
                  width: "85%",
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

            <li sx={{ flexBasis: "20%" }}>
              <p sx={{ variant: "text.body4" }}>
                {batting.score} {` (${batting.ball})`}
              </p>
            </li>

            <li sx={{ flexBasis: "13.333%" }}>
              <p sx={{ variant: "text.body4" }}> {batting.four_x}</p>
            </li>

            <li sx={{ flexBasis: "13.333%" }}>
              <p sx={{ variant: "text.body4" }}>{batting.six_x}</p>
            </li>

            <li sx={{ flexBasis: "13.333%" }}>
              <p sx={{ variant: "text.body4" }}>{batting.rate}</p>{" "}
            </li>
          </ul>
        ) : (
          <Fragment key={batting.id}></Fragment>
        );
      })}
    </Fragment>
  );
};

export default InningsTable;
