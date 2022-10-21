/** @jsxImportSource theme-ui */

import { colors } from "../../styles/theme";
import { getScore } from "../Cards/FixtureCard";

const InningsTableHeader = (props: {
  fixture: any;
  teamName: any;
  innings: any;
}) => {
  const { fixture, teamName, innings } = props;
  return (
    <>
      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: colors.gray300,
          padding: 1,
        }}
      >
        <p sx={{ variant: "text.subheading3" }}>{teamName} </p>

        <p sx={{ variant: "text.subheading3" }}>
          {getScore(fixture.scoreboards, innings)}
        </p>
      </div>

      <div
        sx={{
          display: "flex",
          background: colors.gray300,
          padding: 1,
        }}
      >
        <p sx={{ flexBasis: "16.66%" }}>Batter</p>
        <p sx={{ flexBasis: "16.66%" }}>R</p>
        <p sx={{ flexBasis: "16.66%" }}>B</p>
        <p sx={{ flexBasis: "16.66%" }}>4s</p>
        <p sx={{ flexBasis: "16.66%" }}>6s</p>
        <p sx={{ flexBasis: "16.66%" }}>SR</p>
      </div>
    </>
  );
};

export default InningsTableHeader;
