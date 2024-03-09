import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import axios from "axios";
import { parseCookies, setCookie } from "nookies";

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    await runMiddleware(req, res, cors);
    // Notice how the request object is passed
    const parsedCookies = parseCookies({ req });
    console.log("Parsed Cookies");
    console.log(parsedCookies);

    if (parsedCookies && parsedCookies["_dyid"]) {
      const dyid = parsedCookies["_dyid"];
      setCookie({ res }, "_dyid_server", dyid, {
        maxAge: 30 * 24 * 60 * 60, // Set a 1 year expiration for the new cookie
        path: "/",
      });
    }

    // Notice how the response object is passed
    setCookie({ res }, "fromServer", "value", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    res.status(200).json({
      data: [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
