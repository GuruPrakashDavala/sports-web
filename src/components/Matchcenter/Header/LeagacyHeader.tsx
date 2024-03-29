/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../../styles/theme";
import { ColorTheme } from "../../../types/modifier";
import Pill from "../../Primitives/Pill";
import TeamInfo from "./TeamInfo";

type HeaderProps = {
  fixture: any;
  s1Team: any;
  s2Team: any;
  isLive: any;
};

const pillsWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  flexDirection: ["column", "row"],
  width: "fit-content",
};

const matchCardStyles: ThemeUICSSObject = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: [null, null, "space-evenly"],
  flexDirection: ["column", null, "row"],
  padding: ["5px", null, null, 4],
  marginTop: 2,
  alignItems: [null, null, "center"],
  gap: [2, null, 0],
};

const infoText: ThemeUICSSObject = {
  variant: "text.label3",
  paddingY: 1,
  color: colors.black,
};

// !Component not in use

const LeagacyHeader = (props: HeaderProps) => {
  const { fixture, s1Team, s2Team, isLive } = props;
  const isMatchFinished = fixture.status === "Finished";
  const bp = useBreakpointIndex();
  const firstInningsInPlay = fixture.status === "1st Innings";
  const secondInningsInPlay = fixture.status === "2nd Innings";
  const fixtureTitle =
    bp < 2
      ? `${s1Team.name} vs ${s2Team.name} - ${fixture.league.code} ${fixture.round}`
      : `${s1Team.name} vs ${s2Team.name} - ${fixture.league.code} ${fixture.round} ${fixture.stage.name} `;

  const matchNote = firstInningsInPlay
    ? `Live`
    : secondInningsInPlay
    ? `Live - ${s2Team.code} ${fixture.note}`
    : `Live`;
  return (
    <div>
      <div sx={pillsWrapperStyles}>
        <Pill label={fixtureTitle} theme={ColorTheme.LIGHT} />
      </div>

      <div
        sx={{
          background: colors.gray300,
          border: "1px solid",
          borderColor: "rgba(12, 12, 12, 0.17)",
          borderRadius: "5px",
        }}
      >
        <div sx={matchCardStyles}>
          <TeamInfo
            team={s1Team}
            innings={`S1`}
            fixture={fixture}
            inPlay={firstInningsInPlay}
          />

          <TeamInfo
            team={s2Team}
            innings={`S2`}
            fixture={fixture}
            inPlay={secondInningsInPlay}
          />
        </div>

        <div
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 3,
            paddingTop: 0,
          }}
        >
          {isLive && bp > 1 && (
            <div
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pill
                label={matchNote}
                theme={ColorTheme.DARK}
                styles={{
                  marginY: [1, 0],
                  marginX: [0, 1],
                  width: "fit-content",
                }}
              />
              {fixture.status === "1st Innings" && (
                <p
                  sx={infoText}
                >{`${fixture.tosswon.name} elected to ${fixture.elected} first`}</p>
              )}
              {fixture.status === "Innings Break" && (
                <p sx={infoText}>{`${fixture.status}`}</p>
              )}
            </div>
          )}

          {isMatchFinished && bp > 2 && (
            <Pill
              label={`${fixture.note}`}
              theme={ColorTheme.LIGHT}
              styles={{
                marginY: [1, 0],
                marginX: [0, 1],
                width: "fit-content",
                background: colors.green,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LeagacyHeader;
