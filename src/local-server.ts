import express from "express";
import cors from "cors";
import { handler } from "./server";
import eventFactory from "./event-factory";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 3000;

const responseHandler = (sender: any) => (result: any) => {
  console.log(result);
  sender(result);
};

// app.get("/graphql", (req, res) => {
//   handler(eventFactory(req), {} as any, responseHandler(res.send));
// });

app.post("/graphql", async (req, res) => {
  console.log(req.body);
  // console.log(req.headers);
  const context = {
    callbackWaitsForEmptyEventLoop: false,
    functionName: "test",
    functionVersion: "",
    invokedFunctionArn: "arn",
    memoryLimitInMB: "5",
    awsRequestId: "",
    logGroupName: "",
    logStreamName: "",
    getRemainingTimeInMillis: () => 5,
    done: () => null,
    fail: () => null,
    succeed: () => null,
  };

  const result = await handler(eventFactory(req), context, () => null);

  res.send(JSON.parse(result.body));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
