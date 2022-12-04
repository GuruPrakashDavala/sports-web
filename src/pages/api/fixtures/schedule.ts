import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import axios from "axios";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await runMiddleware(req, res, cors);
    const { seriesIds } = req.query;

    if (!seriesIds) {
      res.status(200).json({ data: [] });
      return;
    }

    const fixtures = await axios({
      method: "GET",
      url: `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=${APIToken}&include=visitorteam, localteam, league, venue, scoreboards, scoreboards.team, stage, season, odds, tosswon, runs&filter[stage_id]=${seriesIds}&sort=starting_at`,
      responseType: "json",
      headers: {
        "accept-encoding": null,
      },
    });

    res.status(200).json({
      data: fixtures.data.data,
    });
  } catch (err) {
    console.log(err);
  }
}
