/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { format } from "date-fns";
import { Fragment } from "react";
import { colors } from "../../../styles/theme";
import { TeamInfo as TeamInfoT } from "../../../types/matchcenter";
import { Fixture as FixtureT } from "../../../types/sportmonks";
import { getScore } from "../../Cards/FixtureCard";
import CalendarIcon from "../../Icons/CalendarIcon";
import StadiumIcon from "../../Icons/Stadium";

type HeaderProps = {
  fixture: FixtureT;
  s1Team: TeamInfoT;
  s2Team: TeamInfoT;
  isLive: boolean;
};

const Header = (props: HeaderProps) => {
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

  const matchStartingDate = new Date(fixture.starting_at);
  return (
    <div
      sx={{
        // background: `radial-gradient(circle, ${colors.red150} 0,${colors.red300} 100%)`,
        background: `radial-gradient(circle, #343353 0, #010028 100%)`,
        color: colors.white,
        paddingY: 2,
      }}
    >
      {/* Title - league and stage name */}
      <div sx={{ display: "flex", paddingX: 1, alignItems: "center" }}>
        <div
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            width: "100%",
            paddingY: "5px",
          }}
        >
          <div
            sx={{
              display: "flex",
              background: colors.white,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "99%",
              marginRight: "5px",
            }}
          >
            <img
              src={fixture.league.image_path}
              sx={{
                display: "block",
                width: ["34px"],
                height: ["34px"],
                maxWidth: "100%",
                verticalAlign: "middle",
                borderRadius: "99%",
              }}
            />
          </div>

          <div
            sx={{
              display: "flex",
              marginLeft: "5px",
              flexDirection: ["column", "row"],
            }}
          >
            <div
              sx={{
                color: colors.white,
                variant: bp > 1 ? "text.heading4" : "text.label1",
              }}
            >
              {fixture.league.code}
            </div>

            <div
              sx={{
                display: "flex",
                marginLeft: [0, 1],
                opacity: "0.6",
                color: colors.white,
                variant: bp > 1 ? "text.heading4" : "text.label1",
              }}
            >
              {fixture.stage.name}
            </div>
          </div>
        </div>
      </div>

      {/* Body - team 1 and team 2 */}
      <div
        sx={{
          display: "flex",
          paddingX: 1,
          alignItems: "center",
          flexDirection: "column",
          borderBottom: "1.5px solid",
          borderColor: "rgba(229,231,235, .4)",
          paddingBottom: 1,
        }}
      >
        <div
          sx={{
            display: "grid",
            paddingTop: [3, 4],
            paddingBottom: [1, 2],
            justifyContent: "center",
            gridTemplateColumns: "repeat(12,minmax(0,1fr))",
          }}
        >
          <div
            sx={{
              display: "flex",
              justifySelf: "end",
              alignItems: "center",
              flexDirection: "row",
              gridColumn: "span 5/span 5",
              color: colors.white,
            }}
          >
            <div
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                sx={{
                  variant: bp > 1 ? "text.subheading3" : "text.subheading4",
                }}
              >
                {s1Team.name}
              </span>
              <span
                sx={{
                  variant: bp > 1 ? "text.subheading3" : "text.subheading4",
                }}
              >
                {getScore(fixture.scoreboards, "S1")}
              </span>
            </div>

            <div
              sx={{
                flexShrink: 0,
                marginLeft: 1,
                position: "relative",
                background: colors.white,
              }}
            >
              <img
                src={s1Team.image}
                sx={{
                  display: "block",
                  width: ["35px", "45px"],
                  height: ["35px", "45px"],
                  verticalAlign: "center",
                }}
              />
            </div>
          </div>

          <div
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gridColumn: "span 2/span 2",
              marginLeft: [2, 3],
            }}
          >
            {!isMatchFinished && (
              <Fragment>
                <div
                  sx={{
                    display: "flex",
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  <div sx={{ variant: "text.label2" }}>{fixture.status}</div>
                </div>
                <div
                  sx={{
                    background: "#010028", // design system colour
                    borderRadius: "999px",
                    marginY: "5px",
                    paddingX: [1, 3],
                  }}
                >
                  <div
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      paddingY: "5px",
                      variant: bp > 1 ? "text.subheading2" : "text.label1",
                    }}
                  >
                    <span>{format(matchStartingDate, "kk:mm")}</span>
                  </div>
                </div>
              </Fragment>
            )}
          </div>

          <div
            sx={{
              display: "flex",
              alignItems: "center",
              justifySelf: "start",
              flexDirection: "row",
              gridColumn: "span 5/span 5",
              marginLeft: [2, 3],
            }}
          >
            <div
              sx={{
                order: "2",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                sx={{
                  variant: bp > 1 ? "text.subheading3" : "text.subheading4",
                }}
              >
                {s2Team.name}
              </span>
              <span
                sx={{
                  variant: bp > 1 ? "text.subheading3" : "text.subheading4",
                }}
              >
                {getScore(fixture.scoreboards, "S2")}
              </span>
            </div>

            <div
              sx={{
                flexShrink: 0,
                marginRight: "0.5rem",
                position: "relative",
                background: colors.white,
              }}
            >
              <img
                src={s2Team.image}
                sx={{
                  display: "block",
                  width: ["35px", "45px"],
                  height: ["35px", "45px"],
                  verticalAlign: "center",
                }}
              />
            </div>
          </div>
        </div>

        {isMatchFinished && (
          <div
            sx={{
              background: "#010028",
              borderRadius: "999px",
              marginBottom: "5px",
              marginTop: [2, 3],
              paddingX: [1, 3],
            }}
          >
            <div
              sx={{
                display: "flex",
                alignItems: "center",
                paddingY: 1,
                paddingX: "5px",
                variant: bp > 1 ? "text.subheading4" : "text.label2",
              }}
            >
              <span sx={{ opacity: "0.9" }}>{fixture.note}</span>
            </div>
          </div>
        )}
      </div>

      <div
        sx={{
          opacity: "0.6",
          display: "flex",
          justifyContent: "space-around",
          paddingTop: [2],
          paddingX: 1,
        }}
      >
        <div sx={{ display: "flex", alignItems: "center" }}>
          <CalendarIcon styles={{ width: "24px", height: "24px" }} />
          <div
            sx={{
              marginX: 1,
              variant: bp > 1 ? "text.heading4" : "text.label2",
            }}
          >
            {format(matchStartingDate, "iii d MMM - p OOOO")}
          </div>
        </div>

        <div sx={{ display: "flex", alignItems: "center" }}>
          <StadiumIcon styles={{ width: "24px", height: "24px" }} />
          <div
            sx={{
              marginX: 1,
              variant: bp > 1 ? "text.heading4" : "text.label2",
            }}
          >
            {fixture.venue.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
