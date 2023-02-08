/** @jsxImportSource theme-ui */

import { default as ReactCountDown } from "react-countdown";
import { ThemeUICSSObject } from "theme-ui";
import { colors } from "../../styles/theme";

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }: any) => {
  //  const bp = useBreakpointIndex();

  const timeBox: ThemeUICSSObject = {
    display: "flex",
    paddingY: [1, 2],
    paddingX: ["5px", 1],
    justifyContent: "center",
    alignItems: "center",
    variant: "text.heading4",
    color: colors.red200,
    border: "1px solid",
    borderColor: colors.gray200,
    background: colors.gray300,
  };

  if (completed) {
    return <></>;
  } else {
    return (
      <div
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        {/* {hours}:{minutes}:{seconds} */}
        <p sx={timeBox}>{hours}h</p>:<p sx={timeBox}>{minutes}m</p>:
        <p sx={timeBox}>{seconds}s</p>
      </div>
    );
  }
};

const Countdown = (props: any): JSX.Element => {
  return <ReactCountDown date={props.date} renderer={renderer} />;
};

export default Countdown;
