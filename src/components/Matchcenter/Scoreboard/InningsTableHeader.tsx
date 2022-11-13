/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import { getScore } from "../../Cards/FixtureCard";
import { Fragment } from "react";
import { Fixture as FixtureT } from "../../../types/sportmonks";
import { TeamInfo } from "../../../types/matchcenter";

const InningsTableHeader = (props: {
  fixture: FixtureT;
  teamInfo: TeamInfo;
  innings: string;
}) => {
  const { fixture, teamInfo, innings } = props;
  const teamName = teamInfo.name;
  return (
    <Fragment>
      <ul
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: colors.gray200,
          paddingX: 1,
          paddingY: 2,
        }}
      >
        <li
          sx={{
            variant: "text.subheading3",
            color: colors.black,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {teamName} Batting
        </li>

        <li sx={{ variant: "text.subheading3", color: colors.black }}>
          {getScore(fixture.scoreboards, innings, fixture.status)}
        </li>
      </ul>

      <ul
        sx={{
          display: "flex",
          background: colors.gray300,
          paddingX: 1,
          paddingY: 1,
        }}
      >
        <li
          sx={{
            flexBasis: "40%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          Batters
        </li>
        <li
          sx={{
            flexBasis: "20%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          R (B)
        </li>
        <li
          sx={{
            flexBasis: "13.333%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          4s
        </li>
        <li
          sx={{
            flexBasis: "13.333%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          6s
        </li>
        <li
          sx={{
            flexBasis: "13.333%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          SR
        </li>
      </ul>
    </Fragment>
  );
};

export default InningsTableHeader;
