/** @jsxImportSource theme-ui */

import { colors } from "../../../styles/theme";
import { Fragment } from "react";
import { Extras } from "../../../types/matchcenter";
import { Player as PlayerT } from "../../../types/sportmonks";

const InningsAdditionalInfo = (props: {
  extras: Extras;
  score: string;
  playersDidNotBat?: PlayerT[];
}) => {
  const { extras, score, playersDidNotBat } = props;
  return (
    <Fragment>
      {extras && score && (
        <ul
          sx={{
            backgroundColor: colors.gray300,
            padding: 1,
            mt: 1,
            display: "flex",
            justifyContent: [null, "space-between"],
            alignItems: [null, "center"],
            flexDirection: ["column", "row"],
            gap: [1, 0],
          }}
        >
          <ul
            sx={{
              display: "flex",
              color: colors.black,
            }}
          >
            <li>Extras: {`${extras.total ? `${extras.total}` : "0"}`}</li>
            &nbsp;(
            <li>b {`${extras.b ? extras.b : "0"}`}</li>,&nbsp;
            <li>lb {extras.lb ? extras.lb : "0"}</li>,&nbsp;
            <li>nb {extras.nb ? extras.nb : "0"}</li>,&nbsp;
            <li>w {extras.wide ? extras.wide : "0"}</li>,&nbsp;
            <li>p {extras.p ? extras.p : "0"}</li>)
          </ul>

          <p
            sx={{
              color: colors.black,
              variant: "text.subheading3",
            }}
          >
            Total: {score}
          </p>
        </ul>
      )}

      {playersDidNotBat && (
        <div
          sx={{
            backgroundColor: colors.gray300,
            color: colors.black,
            padding: 1,
            mt: 1,
            display: "flex",
            width: "100%",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <p sx={{ variant: "text.subheading3" }}>Did not Bat:&nbsp;</p>
          {playersDidNotBat.map((player, index) => (
            <p key={player.id} sx={{ variant: "text.heading4" }}>
              {player.lastname}
              {`${index !== playersDidNotBat.length - 1 ? `,` : ``}`}&nbsp;
            </p>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default InningsAdditionalInfo;
