/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { differenceInHours, format } from "date-fns";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { FixtureStatus } from "../../../types/matchcenter";
import { ColorTheme, ColorThemeFrontend } from "../../../types/modifier";
import {
  Fixture as FixtureT,
  Scoreboard as ScoreboardT,
} from "../../../types/sportmonks";
import {
  isMatchLive,
  isMatchFinished,
  getS1AndS2TeamInfo,
} from "../../../utils/matchcenter";
import Pill from "../../Primitives/Pill";
import CTAButton from "../../Primitives/LinkButton";
import { MATCHCENTER_PAGE_BASE_URL } from "../../../utils/pages";
import Countdown from "../../Countdown";

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

const FixtureCard = (props: {
  fixture: FixtureT;
  includeStageName?: boolean;
  styles?: ThemeUICSSObject;
}): JSX.Element => {
  const { fixture, includeStageName, styles = {} } = props;
  const bp = useBreakpointIndex();
  const teamDetails = getS1AndS2TeamInfo(fixture);
  const s1TeamDetails = teamDetails.s1Team;
  const s2TeamDetails = teamDetails.s2Team;
  const s1TeamName = bp > 3 ? s1TeamDetails.name : s1TeamDetails.code;
  const s2TeamName = bp > 3 ? s2TeamDetails.name : s2TeamDetails.code;

  const fixtureStartingDate = new Date(fixture.starting_at);
  const isLive = isMatchLive(fixture.status);
  const isMatchOver = isMatchFinished(fixture.status);
  const matchStartsInHours = differenceInHours(fixtureStartingDate, new Date());

  const seoURL = `${fixture.visitorteam.code}-vs-${
    fixture.localteam.code
  }-${format(fixtureStartingDate, "dd-y")}`;
  const showCTA = true;
  const ctaLabel = isMatchOver
    ? `View scorecard`
    : isLive
    ? `Follow live scores`
    : `View match facts`;

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

            {includeStageName && (
              <p sx={{ variant: "text.label3", color: colors.gray100 }}>
                {fixture.stage.name}
              </p>
            )}

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
              src={s1TeamDetails.image}
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
              src={s2TeamDetails.image}
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
          <p
            sx={{
              variant: "text.label3",
              paddingY: 1,
              color: isLive ? colors.red300 : colors.green,
            }}
          >
            {/* Innings break note should be handled appropriately */}
            {fixture.status === "Innings Break" ? fixture.note : fixture.note}
          </p>
        ) : fixture.toss_won_team_id ? (
          <p
            sx={{ variant: "text.label3", paddingY: 1, color: colors.red300 }}
          >{`${fixture.tosswon?.name} elected to ${fixture.elected} first`}</p>
        ) : (
          <Fragment>
            {matchStartsInHours < 48 ? (
              <Countdown date={fixtureStartingDate} />
            ) : (
              <p sx={{ variant: "text.label3", paddingY: 1 }}>
                {"Match starts at "}
                {format(fixtureStartingDate, "iii d MMM - p")}
              </p>
            )}
          </Fragment>
        )}

        {showCTA && (
          <CTAButton
            href={`/${MATCHCENTER_PAGE_BASE_URL}/${fixture.id}/${seoURL}`}
            ctaLabel={ctaLabel}
            variant={isLive ? ColorThemeFrontend.RED : ColorThemeFrontend.BLACK}
          ></CTAButton>
        )}
      </div>
    </div>
  );
};

export default FixtureCard;
