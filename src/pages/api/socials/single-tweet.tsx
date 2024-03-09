import type { NextApiRequest, NextApiResponse } from "next";
import { cors, runMiddleware } from "../fixtures/current-fixtures";

export default async function getSingleTweet(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await runMiddleware(req, res, cors);
    const { tweetId } = req.query;

    if (!tweetId || Array.isArray(tweetId)) {
      res.status(200).json({ error: `Invalid tweet Id` });
      return;
    }

    // const tweet = await getTweet(tweetId);
    res.status(200).json({ tweetData: {} });
  } catch (err) {
    res.status(500).json({ error: `Error fetching tweet` });
    console.log(err);
  }
}
