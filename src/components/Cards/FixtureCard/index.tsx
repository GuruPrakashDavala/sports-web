/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { format } from "date-fns";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorTheme } from "../../../types/modifier";
import LivePulse from "../../Icons/LivePulse";
import Link from "../../Primitives/Link";
import Pill from "../../Primitives/Pill";

export const getScore = (scoreboards: any, innings: any) => {
  const fullScore = scoreboards
    .filter((item: any) => item.scoreboard === innings && item.type === "total")
    .map((item: any) => {
      return `${item.total}-${item.wickets} (${item.overs} ov)`;
    });
  return fullScore[0] ? fullScore[0] : "Yet to bat";
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
    fixture.runs.length === 0
      ? {
          name: fixture.localteam.name,
          code: fixture.localteam.code,
          image: fixture.localteam.image_path,
          id: fixture.localteam.id,
        }
      : getTeamDetails(fixture.scoreboards, "S1");

  const s2TeamDetails =
    fixture.runs.length === 0
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
  const isLive =
    fixture.status === "1st Innings" ||
    fixture.status === "2nd Innings" ||
    fixture.status === "Innings Break";
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
          <div sx={{ flexBasis: "70%" }}>
            <div
              sx={{
                variant: "text.subheading3",
                paddingTop: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {bp > 3 ? fixture.league.name : fixture.league.code}
              {" - "}
              {fixture.round}
            </div>

            {/* {fixture.stage && fixture.season && (
              <p sx={{ variant: "text.label3", color: colors.gray100 }}>
                {fixture.stage.name}, {fixture.season.code}
              </p>
            )} */}

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
            {isLive && (
              <Pill
                label={`Live`}
                theme={ColorTheme.DARK}
                styles={{ marginY: 1 }}
              />
              // <LivePulse styles={{ height: "10px", width: "10px" }} />
            )}
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
          <p sx={{ variant: "text.label3", paddingY: 1, color: colors.black }}>
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
