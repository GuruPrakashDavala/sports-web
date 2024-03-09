import { Fragment } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const BallbyBallCommentaryWrapper = (props: {
  children: JSX.Element;
  ballsInListLength: number;
  getMoreBalls: any;
  ballsLimit: number;
  totalBalls: number;
}) => {
  const { ballsInListLength, getMoreBalls, ballsLimit, totalBalls } = props;
  return (
    <Fragment>
      <InfiniteScroll
        dataLength={ballsInListLength}
        next={getMoreBalls}
        hasMore={ballsLimit > totalBalls ? false : true}
        loader={<h4>Loading live commentary...</h4>}
      >
        {props.children}
      </InfiniteScroll>
    </Fragment>
  );
};

export default BallbyBallCommentaryWrapper;
