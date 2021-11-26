import * as cdk from "@aws-cdk/core";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apig from "@aws-cdk/aws-apigateway";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const server = new NodejsFunction(this, "ServerFunction", {
      entry: "../src/server.ts",
      handler: "handler",
      memorySize: 1500,
    });

    new apig.LambdaRestApi(this, "GraphQLAPI", {
      handler: server,
    });
  }
}
