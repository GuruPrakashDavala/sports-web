/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";

const rowWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  border: "1px solid",
  borderColor: colors.gray200,
  width: "100%",
};

const rowHeaderStyles: ThemeUICSSObject = {
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  paddingX: 2,
  paddingY: 2,
  background: colors.gray300,
  "> li": {
    variant: "text.subheading3",
  },
};

const Matchinfo = () => {
  return (
    <div sx={{ paddingY: 3 }}>
      <div sx={rowWrapperStyles}>
        <ul sx={rowHeaderStyles}>
          <li sx={{ flexBasis: ["100%"] }}>Match info</li>
        </ul>

        <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
          <li sx={{ flexBasis: "30%" }}>Match</li>
          <li sx={{ flexBasis: "70%" }}>
            NZ vs IND, 1st T20I, India tour of New Zealand, 2022
          </li>
        </ul>

        <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
          <li sx={{ flexBasis: "30%" }}>Date</li>
          <li sx={{ flexBasis: "70%" }}>Friday, November 18, 2022</li>
        </ul>

        <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
          <li sx={{ flexBasis: "30%" }}>Time</li>
          <li sx={{ flexBasis: "70%" }}>Time6:30 AM</li>
        </ul>

        <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
          <li sx={{ flexBasis: "30%" }}>Venue</li>
          <li sx={{ flexBasis: "70%" }}>Sky Stadium, Wellington</li>
        </ul>

        <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
          <li sx={{ flexBasis: "30%" }}>Umpires</li>
          <li sx={{ flexBasis: "70%" }}>Chris Brown, Wayne Knights</li>
        </ul>
      </div>
    </div>
  );
};

export default Matchinfo;
