import type { NextApiRequest, NextApiResponse } from "next";
import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { api_token } = req.query;

  if (!api_token) {
    res.status(400).json({ message: "API token not provided" });
    return;
  }

  const apiToken = api_token as string;

  try {
    const params: QueryCommandInput = {
      TableName: "UserDetails",
      // IndexName: "email-index",
      KeyConditionExpression: "api_token = :api_token",
      ExpressionAttributeValues: {
        ":api_token": { S: apiToken },
      },
    };

    const command = new QueryCommand(params);
    const response = await ddb.send(command);

    console.log("DB response");
    console.log(response);

    if (
      response.$metadata.httpStatusCode === 200 &&
      response.Items &&
      response.Items.length > 0 &&
      response.Items.length < 2
    ) {
      const isActive = response.Items[0].isActive["BOOL"];
      const remainingQuota = Number(response.Items[0].remaining_quota["N"]);

      console.log("Details");
      console.log(isActive);
      console.log(typeof isActive);

      console.log(remainingQuota);
      console.log(typeof remainingQuota);

      if (isActive && remainingQuota && remainingQuota > 0) {
        res.status(200).json({ isValid: true });
      } else {
        res.status(200).json({ isValid: false });
      }
    } else {
      res.status(401).json({ isValid: false });
    }
  } catch (err) {
    console.log("Error with API call");
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
