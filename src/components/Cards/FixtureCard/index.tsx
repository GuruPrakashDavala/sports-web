/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { format } from "date-fns";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { FixtureStatus } from "../../../types/matchcenter";
import { ColorTheme } from "../../../types/modifier";
import {
  Fixture as FixtureT,
  Scoreboard as ScoreboardT,
} from "../../../types/sportmonks";
import { isMatchLive } from "../../../utils/matchcenter";
import Link from "../../Primitives/Link";
import Pill from "../../Primitives/Pill";

export const getScore = (
  scoreboards: [] | ScoreboardT[],
  innings: string,
  fixtureStatus: string
) => {
  const fullScore = scoreboards
    .filter((item) => item.scoreboard === innings && item.type === "total")
    .map((item) => {
      return `${item.total}-${item.wickets} (${item.overs} ov)`;
    });

  return fullScore[0]
    ? fullScore[0]
    : fixtureStatus === FixtureStatus.FirstInnings ||
      fixtureStatus === FixtureStatus.InningsBreak ||
      fixtureStatus === FixtureStatus.SecondInnings
    ? "Yet to bat"
    : fixtureStatus;
};

// Only returns the team details by searching through the scoreboards
export const getTeamDetails = (scoreboards: ScoreboardT[], innings: string) => {
  const scoreboard = scoreboards.find((item) =>
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
  fixture: FixtureT;
  styles?: ThemeUICSSObject;
}): JSX.Element => {
  const { fixture, styles = {} } = props;
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
            .map((team) => {
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
  const fixtureStartingDate = new Date(fixture.starting_at);

  const isLive = isMatchLive(fixture.status);

  const seoUrl = `${fixture.visitorteam.code}-vs-${
    fixture.localteam.code
  }-${format(fixtureStartingDate, "dd-y")}`;
  const showMatchcenterCta = true;

  return (
    <div
      sx={{
        display: "flex",
        padding: 1,
        height: "100%",
        width: "100%",
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

            {/* <p sx={{ variant: "text.label3", color: colors.gray100 }}>
              {fixture.stage.name}
            </p> */}

            <p sx={{ variant: "text.label3", color: colors.gray100 }}>
              {format(fixtureStartingDate, "iii d MMM - p OOOO")}
            </p>

            {isLive && (
              <Pill
                label={`Live`}
                theme={ColorTheme.DARK}
                styles={{ marginY: 1 }}
              />
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
              sx={{
                height: ["32px", "44px"],
                width: ["32px", "44px"],
              }}
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
            <img
              src={s1TeamImage}
              sx={{ height: ["32px", "44px"], width: ["32px", "44px"] }}
            />
            <p sx={{ marginLeft: 2 }}>{s1TeamName}</p>
          </div>

          {/* score for s1 innings */}
          {fixture.status !== FixtureStatus.NotStarted && (
            <div
              sx={{
                display: "flex",
                variant: "text.heading4",
                alignItems: "center",
              }}
            >
              <p>{getScore(fixture.scoreboards, "S1", fixture.status)}</p>
            </div>
          )}
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
            <img
              src={s2TeamImage}
              sx={{ height: ["32px", "44px"], width: ["32px", "44px"] }}
            />
            <p sx={{ marginLeft: 2 }}>{s2TeamName}</p>
          </div>

          {/* score for s2 innings */}
          {fixture.status !== FixtureStatus.NotStarted && (
            <div
              sx={{
                display: "flex",
                variant: "text.heading4",
                alignItems: "center",
              }}
            >
              <p>{getScore(fixture.scoreboards, "S2", fixture.status)}</p>
            </div>
          )}
        </div>

        {fixture.note.length > 0 ? (
          <p sx={{ variant: "text.label3", paddingY: 1, color: colors.green }}>
            {/* Innings break note should be handled appropriately */}
            {fixture.status === "Innings Break" ? fixture.note : fixture.note}
          </p>
        ) : fixture.toss_won_team_id ? (
          <p
            sx={{ variant: "text.label3", paddingY: 1, color: colors.red300 }}
          >{`${fixture.tosswon?.name} elected to ${fixture.elected} first`}</p>
        ) : (
          <p sx={{ variant: "text.label3", paddingY: 1 }}>
            {"Match starts at "}
            {format(fixtureStartingDate, "iii d MMM - p")}
          </p>
        )}

        {showMatchcenterCta && (
          <Link
            href={`/matchcenter/${fixture.id}/${seoUrl}`}
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
        )}
      </div>
    </div>
  );
};

export default FixtureCard;
