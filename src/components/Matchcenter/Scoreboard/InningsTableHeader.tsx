/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import { getScore } from "../../Cards/FixtureCard";
import { Fragment } from "react";

const InningsTableHeader = (props: {
  fixture: any;
  teamInfo: any;
  innings: any;
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
          <img
            src={teamInfo.image}
            sx={{ height: "35px", marginRight: 1, borderRadius: "20px" }}
          />
          {teamName} Batting
        </li>

        <li sx={{ variant: "text.subheading3", color: colors.black }}>
          {getScore(fixture.scoreboards, innings)}
        </li>
      </ul>

      <ul
        sx={{
          display: "flex",
          background: colors.gray300,
          paddingX: 1,
          paddingY: 1,
          // borderBottom: "1px solid",
          // borderColor: "rgba(12, 12, 12, 0.17)",
        }}
      >
        <li
          sx={{
            flexBasis: "30%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          Batters
        </li>
        <li
          sx={{
            flexBasis: "17.5%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          R (B)
        </li>
        <li
          sx={{
            flexBasis: "17.5%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          4s
        </li>
        <li
          sx={{
            flexBasis: "17.5%",
            variant: "text.subheading3",
            color: "rgba(12, 12, 12, 0.3)",
          }}
        >
          6s
        </li>
        <li
          sx={{
            flexBasis: "17.5%",
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
