/** @jsxImportSource theme-ui */

import { useBreakpointIndex } from "@theme-ui/match-media";
import { Fragment } from "react";
import { colors } from "../../../styles/theme";
import { Batting as BattingT } from "../../../types/sportmonks";

type FallOfWicketsProps = {
  fallOfWickets?: BattingT[];
};

const FallofWickets = (props: FallOfWicketsProps) => {
  const { fallOfWickets } = props;
  const bp = useBreakpointIndex();

  if (!fallOfWickets || fallOfWickets.length === 0) {
    return null;
  }

  return (
    <Fragment>
      {fallOfWickets && (
        <Fragment>
          <p
            sx={{
              variant: "text.subheading3",
              paddingBottom: 2,
              paddingTop: 1,
              paddingX: "5px",
            }}
          >
            Fall of wickets
          </p>

          <ul
            sx={{
              display: "flex",
              background: colors.gray300,
              padding: 1,
            }}
          >
            <li sx={{ flexBasis: "50%", variant: "text.subheading3" }}>
              Batsman
            </li>
            <li sx={{ flexBasis: "25%", variant: "text.subheading3" }}>
              Team score
            </li>
            <li sx={{ flexBasis: "25%", variant: "text.subheading3" }}>Over</li>
          </ul>

          {fallOfWickets.map((batting, index: number) => {
            return (
              <ul
                key={batting.id}
                sx={{
                  display: "flex",
                  padding: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid",
                  borderColor: "rgba(12, 12, 12, 0.17)",
                }}
              >
                <li
                  sx={{
                    flexBasis: "50%",
                    variant: bp < 1 ? "text.body4" : undefined,
                  }}
                >
                  {bp < 1 ? batting.batsman.lastname : batting.batsman.fullname}
                </li>
                <li sx={{ flexBasis: "25%", variant: "text.body4" }}>
                  {batting.fow_score}-{index + 1}
                </li>
                <li sx={{ flexBasis: "25%", variant: "text.body4" }}>
                  {batting.fow_balls}
                </li>
              </ul>
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
};

export default FallofWickets;
