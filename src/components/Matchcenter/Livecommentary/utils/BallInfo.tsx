/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { Ball as BallT } from "../../../../types/sportmonks";
import { ThemeUICSSObject } from "theme-ui";
import { useBreakpointIndex } from "@theme-ui/match-media";
import { colors } from "../../../../styles/theme";
import BallInfoCircle from "./BallInfoCircle";
import {
  getBallInfoCircle,
  getWicketCommentary,
  NormalCommentary,
} from "../../../../utils/matchcenter";

const BallInfo = (props: { ball: BallT; isWicket?: boolean }): JSX.Element => {
  const { ball, isWicket = false } = props;
  const bp = useBreakpointIndex();
  const ballInfoContainerStyles: ThemeUICSSObject = {
    display: "flex",
    alignItems: "center",
    padding: [1, 2],
    marginY: 1,
    marginX: [0, 1],
    background: colors.gray300,
    borderRadius: "10px",
  };

  return (
    <div key={ball.id} sx={ballInfoContainerStyles}>
      {isWicket ? (
        <Fragment>
          <BallInfoCircle ball={`W`} color={colors.red100} />
          <span sx={{ paddingX: 1 }}>
            <p
              sx={{
                display: "inline",
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              {ball.ball} - {ball.bowler.fullname} to {ball.batsman.fullname}.{" "}
            </p>

            <p
              sx={{
                display: "inline",
                variant: bp < 1 ? "text.body4" : undefined,
              }}
            >
              That&apos;s a wicket. &nbsp;
            </p>

            <p
              sx={{
                display: "inline",
                variant: bp < 1 ? "text.subheading4" : "text.subheading3",
              }}
            >
              {getWicketCommentary(ball, ball.score.name)}
            </p>
          </span>
        </Fragment>
      ) : (
        <Fragment>
          {getBallInfoCircle(ball.score)}
          <div sx={{ paddingX: 1 }}>
            <NormalCommentary ball={ball} />
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default BallInfo;
