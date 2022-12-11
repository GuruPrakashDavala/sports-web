/** @jsxImportSource theme-ui */

import { Fragment } from "react";
import { colors } from "../../../styles/theme";
import { Player as PlayerT } from "../../../types/sportmonks";

const PostMatchInfo = (props: {
  manofmatch?: null | PlayerT;
  note: string;
}) => {
  const { manofmatch, note } = props;
  return (
    <Fragment>
      {manofmatch && (
        <div
          sx={{
            backgroundColor: colors.gray300,
            color: colors.black,
            marginX: [0, 1],
            padding: 1,
            mt: [1, 3],
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <p sx={{ variant: "text.subheading3" }}>Man of the match:&nbsp;</p>
          <p sx={{ variant: "text.heading4" }}>{manofmatch.fullname}</p>
        </div>
      )}

      <div
        sx={{
          padding: 1,
          marginX: [0, 1],
          marginY: [1],
          marginTop: [1],
          background: colors.mint,
        }}
      >
        <p sx={{ variant: "text.subheading3", color: colors.white }}>
          🏆 {note}
        </p>
      </div>

      <div sx={{ marginY: 2, marginX: [0, 1] }}>
        <p>
          Well that&apos;s a wrap. Check the points table here. Hope you have a
          good day. Stay connected with us - install the app. See you in the
          next game. Until then bye. Take care. Team cricfanatic
        </p>
      </div>
    </Fragment>
  );
};

export default PostMatchInfo;
