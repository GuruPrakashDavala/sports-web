import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import axios from "axios";
import { fixtureDetailLambdaBaseURL } from "../../../utils/queries";

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
  origin: "*",
  optionsSuccessStatus: 200,
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const APIToken = process.env.NEXT_PUBLIC_SPORT_MONKS_API_TOKEN;

const baseFields = `visitorteam, localteam`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await runMiddleware(req, res, cors);
    const { fixtureId } = req.query;
    const { fields } = req.query;

    if (!fixtureId) {
      res.status(200).json({ data: [] });
      return;
    }

    // const legacyAPIURl = `https://cricket.sportmonks.com/api/v2.0/fixtures/${fixtureId}?api_token=${APIToken}&include=visitorteam, localteam, league, venue, scoreboards, manofmatch, batting, batting.batsman, batting.batsmanout, batting.result, batting.bowler, batting.catchstump, batting.runoutby, odds.bookmaker, odds, odds.market, bowling, bowling.bowler, scoreboards.team,balls, balls.batsmanout, balls.batsmanone,balls.batsmantwo,balls.catchstump,balls.score,balls.runoutby, lineup, tosswon, runs,stage, runs.team, firstumpire, secondumpire`;

    const { data: fixture } = await axios({
      method: "GET",
      url: `${fixtureDetailLambdaBaseURL}?fixtureId=${fixtureId}&fields=${
        fields ?? baseFields
      }`,
      responseType: "json",
      headers: {
        "accept-encoding": null,
      },
    });

    res.status(200).json({
      data: fixture.data,
    });
  } catch (err) {
    console.log(err);
  }
}
