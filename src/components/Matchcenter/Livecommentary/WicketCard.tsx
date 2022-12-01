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
  background: colors.red200,
  borderRadius: "10px",
};

const wicketCardWrapperStyles: ThemeUICSSObject = {
  display: "flex",
  justifyContent: ["flex-start", null],
  flexWrap: "wrap",
  width: "100%",
  alignItems: "center",
};

const cardInfoStyles: ThemeUICSSObject = {
  display: "flex",
  height: "fit-content",
  width: "fit-content",
  alignItems: "center",
  borderRadius: "10px",
};

const WicketCard = (props: WicketCardProps) => {
  const { ball, fullBattingList, recentBall } = props;

  return (
    <div sx={wicketCardContainerStyles}>
      <div sx={{ display: "flex", width: "100%" }}>
        <div sx={wicketCardWrapperStyles}>
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
              flexBasis: "70%",
            }}
          >
            <ul
              sx={{
                ...rowHeaderStyles,
                background: "transparent",
                display: "flex",
                "> li": {
                  color: colors.white,
                  variant: "text.subheading3",
                },
              }}
            >
              <li sx={{ flexBasis: ["35%", "30%"] }}>Batsman</li>
              <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
                {/* {bp > 1 ? `Runs` : `R`} */} R
              </li>
              <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>
                {/* {bp > 1 ? `Balls` : `B`} */} B
              </li>
              <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>4S</li>
              <li sx={{ flexBasis: ["16.25%", "17.5%"] }}>6S</li>
            </ul>
            <PlayerBattingDetails
              batsman={ball.batsmanout}
              fullBattingList={fullBattingList}
              recentBall={recentBall}
              excludeWicketPlayer={false}
              styles={{
                ">li": {
                  color: colors.white,
                  variant: "text.heading4",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WicketCard;
