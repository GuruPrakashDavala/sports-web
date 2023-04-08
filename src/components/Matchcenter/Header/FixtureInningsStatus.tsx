import { Fragment } from "react";
import {
  useCricketDataFixtureIdFromStrapi,
  useFixtureStatus,
} from "../../../utils/queries";

const FixtureInningsStatus = (props: { fixtureId: number }): JSX.Element => {
  const { data } = useCricketDataFixtureIdFromStrapi(props.fixtureId);

  const cricketDataMatchId = data
    ? data.data.length > 0
      ? (data.data[0].attributes.cricketdata_match_id as string)
      : undefined
    : undefined;

  const { data: cricketDataFixtureInfo } = useFixtureStatus({
    cricketDataFixtureId: cricketDataMatchId,
    queryEnabled: cricketDataMatchId ? true : false,
    refetchInterval: 1000 * 20, // 20 seconds
  });

  const status = cricketDataFixtureInfo
    ? cricketDataFixtureInfo.data
      ? cricketDataFixtureInfo.data.status
      : undefined
    : undefined;

  return <Fragment> {status ? <>{status}</> : null} </Fragment>;
};

export default FixtureInningsStatus;
