/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { colors } from "../../../styles/theme";

const FallofWickets = (props: { fallOfWickets: any }) => {
  const { fallOfWickets } = props;
  console.log(fallOfWickets);

  return (
    <Fragment>
      {fallOfWickets && (
        <>
          <p sx={{ variant: "text.subheading3", paddingY: 2, paddingX: 1 }}>
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
          {fallOfWickets.map((batting: any, index: number) => {
            return (
              <ul
                key={index}
                sx={{
                  display: "flex",
                  padding: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom: "1px solid",
                  borderColor: "rgba(12, 12, 12, 0.17)",
                }}
              >
                <li sx={{ flexBasis: "50%" }}>{batting.batsman.lastname}</li>
                <li sx={{ flexBasis: "25%" }}>
                  {batting.fow_score}-{index + 1}
                </li>
                <li sx={{ flexBasis: "25%" }}>{batting.fow_balls}</li>
              </ul>
            );
          })}
        </>
      )}
    </Fragment>
  );
};

export default FallofWickets;
