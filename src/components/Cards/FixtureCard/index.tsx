/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { format } from "date-fns";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import Link from "../../Primitives/Link";

export const getScore = (scoreboards: any, innings: any) => {
  const fullScore = scoreboards.map((item: any) => {
    // the below output format is - 159/5 (20 ov)
    return item.scoreboard === innings && item.type == "total"
      ? `${item.total}/${item.wickets} (${item.overs} ov)`
      : ``;
  });
  return fullScore;
};

export const getTeamDetails = (scoreboards: any, innings: any) => {
  // Only returns the team details by seaching through the scoreboards

  // If match hasn't started we return the local
  // if (fixture.status === "NS") {
  //   if (innings === "S1") {
  //     return {
  //       name: fixture.localteam.name,
  //       code: fixture.localteam.code,
  //       image: fixture.localteam.image_path,
  //       id: fixture.localteam.id,
  //     };
  //   } else {
  //   }
  // }

  const scoreboard = scoreboards.find((item: any) =>
    item.scoreboard === innings ? item : null
  );
  const teamDetails = scoreboard
    ? {
        name: scoreboard.team.name,
        code: scoreboard.team.code,
        image: scoreboard.team.image_path,
        id: scoreboard.team_id,
      }
    : {};
  return teamDetails;
};

const FixtureCard = (props: {
  fixture: any;
  styles?: ThemeUICSSObject;
}): JSX.Element => {
  const fixture = props.fixture;
  const styles = props.styles;
  const bp = useBreakpointIndex();

  const s1TeamDetails =
    fixture.status === "NS"
      ? {
          name: fixture.localteam.name,
          code: fixture.localteam.code,
          image: fixture.localteam.image_path,
          id: fixture.localteam.id,
        }
      : getTeamDetails(fixture.scoreboards, "S1");

  const s2TeamDetails =
    fixture.status === "NS"
      ? {
          name: fixture.visitorteam.name,
          code: fixture.visitorteam.code,
          image: fixture.visitorteam.image_path,
          id: fixture.visitorteam.id,
        }
      : fixture.status === "1st Innings" || fixture.status === "Innings Break"
      ? (() => {
          const s2Team = [fixture.localteam, fixture.visitorteam]
            .filter((team) => s1TeamDetails.code !== team.code)
            .map((team, index) => {
              return {
                name: team.name,
                code: team.code,
                image: team.image_path,
                id: team.id,
              };
            });

          return s2Team[0];
        })()
      : getTeamDetails(fixture.scoreboards, "S2");

  const s1TeamName = bp > 3 ? s1TeamDetails.name : s1TeamDetails.code;
  const s1TeamImage = s1TeamDetails.image;
  const s2TeamName = bp > 3 ? s2TeamDetails.name : s2TeamDetails.code;
  const s2TeamImage = s2TeamDetails.image;
  return (
    <div
      sx={{
        display: "flex",
        padding: 1,
        height: "100%",
        width: "100%",
        cursor: "pointer",
        ...styles,
      }}
    >
      <div
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          padding: 2,
          border: "1px solid",
          borderColor: colors.gray200,
          width: "100%",
        }}
      >
        {/* Heading */}
        <div
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* {fixture.status !== "NS" && fixture.status !== "Finished" && (
            <div
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingY: 1,
                paddingX: 2,
                backgroundColor: colors.red150,
                color: colors.white,
                borderRadius: "25px",
                variant: "text.subheading4",
                widht: "fit-content",
              }}
            >
              Live
            </div>
          )} */}
          <div sx={{ flexBasis: "70%" }}>
            <div sx={{ variant: "text.subheading3", paddingY: 1 }}>
              {bp > 3 ? fixture.league.name : fixture.league.code}
              {" - "}
              {fixture.round}
            </div>
            {/* Live blinking badge */}

            {fixture.stage && fixture.season && (
              <p sx={{ variant: "text.label3", color: colors.gray100 }}>
                {fixture.stage.name}, {fixture.season.code}
              </p>
            )}

            {/* <p sx={{ variant: "text.label3", color: colors.gray100 }}>
              {fixture.round} -{" "}
              {fixture.venue
                ? `${fixture.venue.name}, ${
                    fixture.venue.country ? fixture.venue.country.name : ""
                  }`
                : "TBC"}
            </p> */}
            <p sx={{ variant: "text.label3", color: colors.gray100 }}>
              {format(new Date(fixture.starting_at), "iii d MMM")} -
              {format(new Date(fixture.starting_at), " p")}
            </p>
          </div>

          <div
            sx={{
              display: "flex",
              justifyContent: "right",
              flexBasis: "30%",
              marginLeft: "auto",
              alignItems: "center",
            }}
          >
            {/* <img
              src="/assets/prime.png"
              sx={{ height: bp > 1 ? "24px" : "20px" }}
            />
            <img
              src="/assets/starsports_2.webp"
              sx={{ height: bp > 1 ? "38px" : "30px" }}
            />
            <img
              src="/assets/starsports_1.webp"
              sx={{ height: bp > 1 ? "38px" : "30px" }}
            /> */}
            <img
              src={fixture.league.image_path}
              sx={{ height: bp > 1 ? "44px" : "28px" }}
            />
          </div>
        </div>

        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingY: 2,
          }}
        >
          <div
            sx={{
              display: "flex",
              variant: "text.heading4",
              alignItems: "center",
            }}
          >
            <img src={s1TeamImage} sx={{ height: "44px", width: "auto" }} />
            <p sx={{ marginLeft: 2 }}>{s1TeamName}</p>
          </div>
          {/* score for s1 innings */}
          <div
            sx={{
              display: "flex",
              variant: "text.heading4",
              alignItems: "center",
            }}
          >
            <p>{getScore(fixture.scoreboards, "S1")}</p>
          </div>
        </div>
        <div
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            paddingY: 2,
          }}
        >
          <div
            sx={{
              display: "flex",
              variant: "text.heading4",
              alignItems: "center",
            }}
          >
            <img src={s2TeamImage} sx={{ height: "44px", width: "auto" }} />
            <p sx={{ marginLeft: 2 }}>{s2TeamName}</p>
          </div>

          {/* score for s2 innings */}
          <div
            sx={{
              display: "flex",
              variant: "text.heading4",
              alignItems: "center",
            }}
          >
            <p>{getScore(fixture.scoreboards, "S2")}</p>
          </div>
        </div>
        {fixture.note.length > 0 ? (
          <p sx={{ variant: "text.label3", paddingY: 1, color: colors.red300 }}>
            {/* Innings break note should be handled appropriately */}
            {fixture.status === "Innings Break" ? fixture.note : fixture.note}
          </p>
        ) : fixture.toss_won_team_id ? (
          <p
            sx={{ variant: "text.label3", paddingY: 1, color: colors.red300 }}
          >{`${fixture.tosswon.name} elected to ${fixture.elected} first`}</p>
        ) : (
          <p sx={{ variant: "text.label3", paddingY: 1, color: colors.red300 }}>
            {"Match scheduled for "}
            {format(new Date(fixture.starting_at), "iii d MMM")} -
            {format(new Date(fixture.starting_at), " p")}
          </p>
        )}

        <Link
          href={`/matchcenter/${fixture.id}/ind-vs-rsa-2022`}
          styles={{
            padding: 2,
            background: colors.black,
            marginTop: "auto",
          }}
        >
          <p sx={{ variant: "text.subheading4", color: colors.white }}>
            View scorecard
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FixtureCard;
