import * as cdk from "@aws-cdk/core";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apig from "@aws-cdk/aws-apigateway";

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Uncomment to use AWS Distro for OTel Lambda Layer
    // const oTelLambdaLayer = lambda.LayerVersion.fromLayerVersionArn(
    //   this,
    //   "oTelLambdaLayer",
    //   "arn:aws:lambda:us-west-2:901920570463:layer:aws-otel-nodejs-ver-1-0-0:1"
    // );

    const server = new NodejsFunction(this, "ServerFunction", {
      entry: "../src/server.ts",
      handler: "handler",
      memorySize: 1500,
      environment: {
        OTEL_LOG_LEVEL: "debug",
        AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-handler",
      },

      // Uncomment to use Lambda Layer
      // layers: [oTelLambdaLayer],
      // tracing: lambda.Tracing.ACTIVE,
    });

    new apig.LambdaRestApi(this, "GraphQLAPI", {
      handler: server,
    });
  }
}
