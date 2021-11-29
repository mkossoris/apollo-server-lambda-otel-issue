"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("./server");
const event_factory_1 = __importDefault(require("./event-factory"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = 3000;
const responseHandler = (sender) => (result) => {
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
    const result = await (0, server_1.handler)((0, event_factory_1.default)(req), context, () => null);
    res.send(JSON.parse(result.body));
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
