/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import { getScore } from "../../Cards/FixtureCard";
import { Fragment } from "react";
import { Fixture as FixtureT } from "../../../types/sportmonks";
import { TeamInfo } from "../../../types/matchcenter";
import { ThemeUICSSObject } from "theme-ui";
import { useBreakpointIndex } from "@theme-ui/match-media";

const InningsTableHeader = (props: {
  fixture: FixtureT;
  teamInfo: TeamInfo;
  innings: string;
}) => {
  const { fixture, teamInfo, innings } = props;
  const teamName = teamInfo.name;
  const bp = useBreakpointIndex();
  const headerTextVariant = bp < 2 ? "text.subheading4" : "text.subheading3";

  const battingTableHeaderListItemStyles: ThemeUICSSObject = {
    variant: headerTextVariant,
    color: "rgba(12, 12, 12, 0.3)",
  };

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
            variant: headerTextVariant,
            color: colors.black,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {teamName} Batting
        </li>

        <li sx={{ variant: headerTextVariant, color: colors.black }}>
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
            ...battingTableHeaderListItemStyles,
          }}
        >
          Batters
        </li>

        <li
          sx={{
            flexBasis: "20%",
            ...battingTableHeaderListItemStyles,
          }}
        >
          R (B)
        </li>

        <li
          sx={{
            flexBasis: "13.333%",
            ...battingTableHeaderListItemStyles,
          }}
        >
          4s
        </li>

        <li
          sx={{
            flexBasis: "13.333%",
            ...battingTableHeaderListItemStyles,
          }}
        >
          6s
        </li>

        <li
          sx={{
            flexBasis: "13.333%",
            ...battingTableHeaderListItemStyles,
          }}
        >
          SR
        </li>
      </ul>
    </Fragment>
  );
};

export default InningsTableHeader;
