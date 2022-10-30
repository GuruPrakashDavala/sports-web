/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { Fragment } from "react";
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
  padding: [1, null, null, 4],
  background: colors.gray300,
  border: "1px solid",
  borderColor: "rgba(12, 12, 12, 0.17)",
  borderTopLeftRadius: "5px",
  borderTopRightRadius: "5px",
  marginY: 2,
  alignItems: "center",
};

const Header = (props: HeaderProps) => {
  const { fixture, s1Team, s2Team, isLive } = props;
  const isMatchFinished = fixture.status === "Finished";
  const bp = useBreakpointIndex();
  const firstInningsInPlay = fixture.status === "1st Innings";
  const secondInningsInPlay = fixture.status === "2nd Innings";
  const matchNote = firstInningsInPlay
    ? `Live`
    : secondInningsInPlay
    ? `Live - ${s2Team.code} ${fixture.note}`
    : `Live`;
  return (
    <Fragment>
      <div sx={pillsWrapperStyles}>
        <Pill
          label={`${s1Team.name} vs ${s2Team.name} - ${fixture.league.code} ${fixture.round} ${fixture.stage.name} `}
          theme={ColorTheme.LIGHT}
        />
      </div>

      <div sx={matchCardStyles}>
        <TeamInfo
          team={s1Team}
          innings={`S1`}
          fixture={fixture}
          inPlay={firstInningsInPlay}
        />

        {isLive && (
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
              // TODO: Message should be gramatically correct. Handle message properly
              <p
                sx={{
                  variant: "text.label3",
                  paddingY: 1,
                  color: colors.black,
                }}
              >{`${fixture.tosswon.name} elected to ${fixture.elected} first`}</p>
            )}
          </div>
        )}
        {isMatchFinished && (
          <div>
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
          </div>
        )}

        <TeamInfo
          team={s2Team}
          innings={`S2`}
          fixture={fixture}
          inPlay={secondInningsInPlay}
        />
      </div>
    </Fragment>
  );
};

export default Header;
