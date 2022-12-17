import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import axios from "axios";
import { add, compareAsc, format, isToday, set, sub } from "date-fns";
import { Fixture as FixtureT } from "../../../types/sportmonks";

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

const now = new Date();
const fixturesStartDate = format(sub(now, { days: 1 }), "yyyy-MM-d");
const sixMonthsFromNow = format(add(now, { months: 6 }), "yyyy-MM-d");

const APIToken = process.env.NEXT_PUBLIC_SPORT_MONKS_API_TOKEN;

type Data = {
  name: string;
};

const getLatestFixtures = (fixtures: FixtureT[]) => {
  const dateFromYesterday = sub(
    set(now, {
      hours: 23,
      minutes: 59,
      seconds: 55,
    }),
    { days: 1 }
  );

  const dateFromTomorrow = add(
    set(now, {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    }),
    { days: 1 }
  );

  const todayFixtures = fixtures.filter((fixture) =>
    isToday(new Date(fixture.starting_at))
  );

  const pastFixtures = fixtures
    .filter(
      (fixture) =>
        compareAsc(new Date(fixture.starting_at), dateFromYesterday) < 0
    )
    .reverse();

  const upcomingFixtures = fixtures.filter(
    (fixture) => compareAsc(new Date(fixture.starting_at), dateFromTomorrow) > 0
  );

  return [...todayFixtures, ...pastFixtures, ...upcomingFixtures];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await runMiddleware(req, res, cors);
    const {
      seriesIds,
      startDate = fixturesStartDate,
      endDate = sixMonthsFromNow,
    } = req.query;

    if (!seriesIds) {
      res.status(200).json({ data: [] });
      return;
    }

    const fixtures = await axios({
      method: "GET",
      url: `https://cricket.sportmonks.com/api/v2.0/fixtures?api_token=${APIToken}&include=visitorteam, localteam, league, venue,venue.country, tosswon, scoreboards, scoreboards.team, odds, stage, runs, season&filter[starts_between]=${startDate},${endDate}&filter[stage_id]=${seriesIds}&sort=starting_at`,
      responseType: "json",
      headers: {
        "accept-encoding": "*",
      },
    });

    const fixturesInOrder = getLatestFixtures(fixtures.data.data);

    const latestFixtures =
      fixturesInOrder.length > 0
        ? fixturesInOrder.splice(0, 10)
        : fixturesInOrder;

    res.status(200).json({
      data: latestFixtures,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
}
