import { Request } from "express";

export default (request: Request) => {
  console.log(JSON.stringify(request.body));
  return {
    body: request.body ? JSON.stringify(request.body) : null,
    headers: {
      Accept: "application/json",
      ...request.headers,
    },
    multiValueHeaders: {
      "content-type": "application/json",
    },
    httpMethod: "POST",
    isBase64Encoded: false,
    path: "/",
    pathParameters: null,
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    requestContext: {
      accountId: "1234567890",
      apiId: "appid",
      httpMethod: "POST",
      identity: {},
      authorizer: {},
      protocol: "HTTP/1.1",
      path: "/",
      stage: "dev",
      requestId: "test",
      requestTimeEpoch: 0,
      resourceId: "none",
      resourcePath: "/",
    },
    resource: "/",
  };
};
