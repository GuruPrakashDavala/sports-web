import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.setHeader("Cache-Control", "s-maxage=10");
  res.status(200).json({ name: "John Doe" });
}
