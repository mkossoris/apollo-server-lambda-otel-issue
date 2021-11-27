https://github.com/apollographql/apollo-server/issues/5923

### How to Setup

1. Clone or download repo locally
2. Run `npm i` both in root directory and in `cdk/`

### Running Locally

I have a local express server that runs the handler by simulating an API Gateway request and context. You'll see that OpenTelemetry works in the local environment as you should see logs printing to the console.

#### Steps to Run Locally

1. Run `npm run build` from the root path
2. Run `npm run start`
3. Visit Apollo Studio sandbox and give `http://localhost:3000` as the endpoint

### Deployed Lambda

When the Lambda is deployed, nothing is pushed to CloudWatch logs from OpenTelemetry (the default behavior for console.log). Interestingly, I was originally testing this with Apollo Federation, and I found that the Gateway actually did show trace data in CloudWatch, but none of the Subgraph Lambdas did.

#### Steps to Deploy

1. Setup CDK with the AWS CDK docs
2. Run the CDK bootstrap command to bootstrap your AWS account
3. From the `cdk/` path, run `cdk deploy` to deploy it. I have it set to deploy to us-west-2, but you can change this in `cdk/bin/cdk.ts` file.
