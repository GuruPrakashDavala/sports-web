/** @jsxImportSource theme-ui */

import { format } from "date-fns";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { Fixture as FixtureT } from "../../../types/sportmonks";
import Lineup from "../Util/Lineup";

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

const Matchinfo = (props: { fixture: FixtureT }) => {
  const {
    localteam,
    visitorteam,
    starting_at,
    stage,
    secondumpire,
    firstumpire,
    venue,
    round,
    tosswon,
    elected,
    lineup,
  } = props.fixture;
  const matchStartsAt = new Date(starting_at);
  // const bp = useBreakpointIndex();

  // console.log(bp);

  // const { data } = useArticles({ pageNumber: 1 });

  // const articles = data ? data.data : undefined;

  return (
    <div sx={{ paddingY: 3 }}>
      {tosswon && elected && (
        <p
          sx={{ paddingBottom: 1, color: colors.green }}
        >{`${tosswon.name} elected to ${elected} first`}</p>
      )}

      <div sx={rowWrapperStyles}>
        <ul sx={rowHeaderStyles}>
          <li sx={{ flexBasis: ["100%"] }}>Match info</li>
        </ul>

        <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
          <li sx={{ flexBasis: "30%" }}>Match</li>
          <li sx={{ flexBasis: "70%" }}>
            {localteam.code} vs {visitorteam.code}, {round}, {stage.name},{" "}
            {format(matchStartsAt, "yyyy")}
          </li>
        </ul>

        <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
          <li sx={{ flexBasis: "30%" }}>Date</li>
          <li sx={{ flexBasis: "70%" }}>
            {format(matchStartsAt, "cccc, LLLL d, yyyy")}
          </li>
        </ul>

        <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
          <li sx={{ flexBasis: "30%" }}>Time</li>
          <li sx={{ flexBasis: "70%" }}> {format(matchStartsAt, "p OOOO")}</li>
        </ul>

        {venue && (
          <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
            <li sx={{ flexBasis: "30%" }}>Venue</li>
            <li sx={{ flexBasis: "70%" }}>
              {venue.name}, {venue.city}
            </li>
          </ul>
        )}

        {firstumpire && secondumpire && (
          <ul sx={{ display: "flex", paddingY: 2, paddingX: 1, width: "100%" }}>
            <li sx={{ flexBasis: "30%" }}>Umpires</li>
            <li sx={{ flexBasis: "70%" }}>
              {firstumpire.fullname}, {secondumpire.fullname}
            </li>
          </ul>
        )}
      </div>

      {/* {bp < 2 && articles ? (
        <RelatedArticles styles={{ paddingX: 0 }} recentArticles={articles} />
      ) : (
        <></>
      )} */}

      {localteam && visitorteam && lineup && lineup.length > 0 && (
        <Lineup
          localteam={localteam}
          visitorteam={visitorteam}
          lineup={lineup}
        />
      )}
    </div>
  );
};

export default Matchinfo;
