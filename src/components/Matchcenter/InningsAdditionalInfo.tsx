/** @jsxImportSource theme-ui */

import { colors } from "../../styles/theme";

const InningsAdditionalInfo = (props: {
  extras: any;
  score: any;
  playersDidNotBat: any;
}) => {
  const { extras, score, playersDidNotBat } = props;
  console.log(props);
  return (
    <div>
      <div
        sx={{
          backgroundColor: colors.black,
          color: colors.white,
          padding: 1,
          mt: 1,
        }}
      >
        Extras
      </div>

      <div
        sx={{
          backgroundColor: colors.black,
          color: colors.white,
          padding: 1,
          mt: 1,
        }}
      >
        Total
      </div>
      {playersDidNotBat && (
        <div
          sx={{
            backgroundColor: colors.black,
            color: colors.white,
            padding: 1,
            mt: 1,
          }}
        >
          {playersDidNotBat.map((player: any) => (
            <p>{player.lastname}</p>
          ))}
        </div>
      )}

      <div
        sx={{
          backgroundColor: colors.black,
          color: colors.white,
          padding: 1,
          mt: 1,
        }}
      >
        Fall of wickets
      </div>
    </div>
  );
};

export default InningsAdditionalInfo;
