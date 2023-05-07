/** @jsxImportSource theme-ui */

import { ThemeUICSSObject } from "theme-ui";
import { PlayerBattingDetails, rowHeaderStyles } from ".";
import { colors } from "../../../styles/theme";
import { Ball as BallT, Batting as BattingT } from "../../../types/sportmonks";

type WicketCardProps = {
  ball: BallT;
  fullBattingList: BattingT[];
  recentBall: BallT;
};

const wicketCardContainerStyles: ThemeUICSSObject = {
  display: "flex",
  margin: [0, 1],
  marginY: [1],
  background: colors.red200,
  borderRadius: "10px",
};

const cardInfoStyles: ThemeUICSSObject = {
  display: "flex",
  flexBasis: ["10%", null, "10%"],
  flexWrap: "wrap",
  height: "fit-content",
  width: "fit-content",
  alignItems: "center",
};

const WicketCard = (props: WicketCardProps): JSX.Element => {
  const { ball, fullBattingList, recentBall } = props;

  return (
    <div sx={wicketCardContainerStyles}>
      <div sx={{ display: "flex", width: "100%", alignItems: "center" }}>
        <div sx={cardInfoStyles}>
          <p
            sx={{
              padding: 1,
              variant: "text.subheading2",
              color: colors.white,
            }}
          >
            Out
          </p>
        </div>

        <div
          sx={{
            display: "flex",
            flexDirection: "column",
            flexBasis: ["90%", null, "90%"],
            flexWrap: "wrap",
          }}
        >
          <ul
            sx={{
              ...rowHeaderStyles,
              background: "transparent",
              display: "flex",
              flexWrap: "wrap",
              width: "100%",
              "> li": {
                color: colors.white,
                variant: "text.subheading4",
              },
            }}
          >
            <li sx={{ flexBasis: ["45%", "30%"] }}>Batsman</li>
            <li sx={{ flexBasis: ["11%", "14%"] }}>R</li>
            <li sx={{ flexBasis: ["11%", "14%"] }}>B</li>
            <li sx={{ flexBasis: ["11%", "14%"] }}>4S</li>
            <li sx={{ flexBasis: ["11%", "14%"] }}>6S</li>
            <li sx={{ flexBasis: ["11%", "14%"] }}>SR</li>
          </ul>
          <PlayerBattingDetails
            batsman={ball.batsmanout}
            fullBattingList={fullBattingList}
            recentBall={recentBall}
            excludeWicketPlayer={false}
            styles={{
              ">li": {
                color: colors.white,
                variant: "text.body4",
              },
              ">li:first-of-type": {
                paddingRight: "5px",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WicketCard;
