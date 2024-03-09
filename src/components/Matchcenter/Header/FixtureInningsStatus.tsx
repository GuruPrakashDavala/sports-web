import { Fragment } from "react";
import {
  useCricketDataFixtureIdFromStrapi,
  useFixtureStatus,
  useGlobals,
} from "../../../utils/queries";

const FixtureInningsStatus = (props: { fixtureId: number }): JSX.Element => {
  const { data: globals } = useGlobals();
  // const { data } = useCricketDataFixtureIdFromStrapi(props.fixtureId);

  // const cricketDataMatchId = data
  //   ? data.data.length > 0
  //     ? (data.data[0].attributes.cricketdata_match_id as string)
  //     : undefined
  //   : undefined;

  const cricketDataAPIToken =
    globals?.data.attributes.API_Tokens?.cricketdata_api_token;

  // const { data: cricketDataFixtureInfo } = useFixtureStatus({
  //   cricketDataFixtureId: cricketDataMatchId,
  //   cricketDataAPIToken: cricketDataAPIToken,
  //   queryEnabled: cricketDataMatchId && cricketDataAPIToken ? true : false,
  //   refetchInterval: 1000 * 20, // 20 seconds
  // });

  // const status = cricketDataFixtureInfo
  //   ? cricketDataFixtureInfo.data
  //     ? cricketDataFixtureInfo.data.status
  //     : undefined
  //   : undefined;

  // return <Fragment> {status ? <>&nbsp;-&nbsp;{status}</> : null} </Fragment>;

  return <></>;
};

export default FixtureInningsStatus;
