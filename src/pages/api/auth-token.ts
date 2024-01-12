import type { NextApiRequest, NextApiResponse } from "next";
import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";

type Data = {
  name: string;
};

const ddb = new DynamoDBClient({
  region: "ap-south-1",
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
      // Check all mandatory fields here

      // if(!){

      // }

      // process the league_ids and send it back

      const isActive = response.Items[0].isActive["BOOL"];
      const remainingQuota = Number(response.Items[0].remaining_quota["N"]);

      console.log("Details");
      console.log(isActive);
      console.log(typeof isActive);

      console.log(remainingQuota);
      console.log(typeof remainingQuota);

      if (isActive && remainingQuota && remainingQuota > 0) {
        return {
          statusCode: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({ isValid: true }),
        };
      } else {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({ isValid: false }),
        };
      }
    } else {
      return {
        statusCode: 401,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ isValid: false }),
      };
    }
  } catch (err) {
    console.log("Error with API call");
    console.log(err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: JSON.stringify({ message: "Something went wrong" }),
    };
  }
}
