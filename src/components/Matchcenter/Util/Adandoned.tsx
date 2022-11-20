/** @jsxImportSource theme-ui */

import { format } from "date-fns";
import { colors } from "../../../styles/theme";
import { FixtureStatus } from "../../../types/matchcenter";
import { ComponentVariant } from "../../../types/modifier";
import ExclamationIcon from "../../Icons/ExclamationIcon";

const Adandoned = (props: {
  note: string;
  type?: string;
  status: string;
  startsAt: Date | string;
}) => {
  const { note, status, startsAt } = props;
  const matchStartDate = format(new Date(startsAt), "iii d MMM - p");
  return (
    <div
      sx={{
        paddingY: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {status === FixtureStatus.NotStarted ? (
        <p>Match starts at {matchStartDate}</p>
      ) : (
        <div
          sx={{
            padding: 2,
            background: colors.gray300,
            display: "flex",
            alignItems: "center",
          }}
        >
          <ExclamationIcon variant={ComponentVariant.MEDIUM} />
          <span
            sx={{
              variant: "text.heading4",
              marginLeft: 1,
            }}
          >
            {note}
          </span>
        </div>
      )}
    </div>
  );
};

export default Adandoned;
