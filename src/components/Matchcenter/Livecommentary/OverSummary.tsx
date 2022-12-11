/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { colors } from "../../../styles/theme";
import { Ball as BallT } from "../../../types/sportmonks";

type SummaryBall = {
  ball: number;
  run: number;
  isWicket: boolean;
  wide: boolean;
  noball: number;
  noballRuns: number;
  leg_bye: number;
  bye: number;
  six: boolean;
  four: boolean;
};

export type OversSummary = {
  over: number;
  balls?: SummaryBall[];
  teamScore: {
    score: number;
    wickets: number;
  };
}[];

const getBallType = (ball: SummaryBall): string | number => {
  const type = ball.isWicket
    ? `W`
    : ball.six
    ? ball.run
    : ball.four
    ? ball.run
    : ball.bye
    ? `b ${ball.bye}`
    : ball.leg_bye
    ? `lb ${ball.leg_bye}`
    : ball.noball
    ? `nb ${ball.noballRuns}`
    : ball.wide
    ? `wd ${ball.run}`
    : ball.run;
  return type;
};

const OverSummary = (props: {
  overNumber: number;
  innings: string;
  ball: BallT;
  inningsOversSummary?: OversSummary;
}): JSX.Element => {
  const { overNumber, innings, ball, inningsOversSummary } = props;
  if (!inningsOversSummary) {
    return <></>;
  }

  // Over summary for the given over
  const overSummary = inningsOversSummary.find(
    (overSummary) => overSummary.over === overNumber
  );

  if (!overSummary) {
    return <></>;
  }

  const overTotal = overSummary.balls?.reduce((accumulator, obj) => {
    return accumulator + obj.run;
  }, 0);

  return (
    <Fragment>
      <div
        sx={{
          display: "flex",
          flexWrap: "wrap",
          padding: 1,
          borderRadius: "10px",
          background: "beige",
          gap: [null, 3, null, 5],
          marginX: [0, 1],
          marginY: 1,
          justifyContent: ["space-evenly"],
          border: "1px solid",
          borderColor: colors.gray200,
        }}
      >
        <div
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p sx={{ variant: "text.subheading3" }}>Ov</p>
          <p sx={{ variant: "text.subheading2" }}> {overNumber}</p>
        </div>

        <div
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: ["60%", "50%"],
          }}
        >
          <p>Runs scored: {overTotal}</p>

          <div sx={{ display: "flex", flexWrap: "wrap", gap: ["5px", 1] }}>
            {overSummary.balls?.map((ball, index) => {
              const ballType = getBallType(ball);
              const isWicket = ballType === `W`;
              return (
                <span
                  key={index}
                  sx={{
                    border: "1px solid",
                    borderColor: colors.gray200,
                    padding: "5px",
                    variant: "text.subheading4",
                    background: isWicket ? colors.red150 : undefined,
                    color: isWicket ? colors.white : undefined,
                  }}
                >
                  {ballType}
                </span>
              );
            })}
          </div>
        </div>

        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <div sx={{ variant: "text.subheading3" }}>{ball.team.code}:</div> */}

          <div
            sx={{
              padding: 1,
              backgroundColor: colors.gray300,
              border: "1px solid",
              borderColor: colors.gray200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p sx={{ variant: "text.subheading2" }}>
              {overSummary?.teamScore.score}-{overSummary?.teamScore.wickets}
            </p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OverSummary;
