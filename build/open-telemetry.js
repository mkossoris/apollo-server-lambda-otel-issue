"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleProcessor = exports.provider = void 0;
// Import required symbols
const instrumentation_http_1 = require("@opentelemetry/instrumentation-http");
const instrumentation_express_1 = require("@opentelemetry/instrumentation-express");
const instrumentation_1 = require("@opentelemetry/instrumentation");
const node_1 = require("@opentelemetry/node");
const tracing_1 = require("@opentelemetry/tracing");
const resources_1 = require("@opentelemetry/resources");
const instrumentation_graphql_1 = require("@opentelemetry/instrumentation-graphql");
const instrumentation_aws_lambda_1 = require("@opentelemetry/instrumentation-aws-lambda");
// Register server-related instrumentation
(0, instrumentation_1.registerInstrumentations)({
    instrumentations: [
        new instrumentation_http_1.HttpInstrumentation(),
        new instrumentation_express_1.ExpressInstrumentation(),
        new instrumentation_graphql_1.GraphQLInstrumentation(),
        new instrumentation_aws_lambda_1.AwsLambdaInstrumentation(),
    ],
});
// Initialize provider and identify this particular service
// (in this case, we're implementing a federated gateway)
exports.provider = new node_1.NodeTracerProvider({
    resource: resources_1.Resource.default().merge(new resources_1.Resource({
        // Replace with any string to identify this service in your system
        "service.name": "demo",
    })),
});
// Configure a test exporter to print all traces to the console
const consoleExporter = new tracing_1.ConsoleSpanExporter();
exports.consoleProcessor = new tracing_1.SimpleSpanProcessor(consoleExporter);
exports.provider.addSpanProcessor(exports.consoleProcessor);
// Register the provider to begin tracing
exports.provider.register();
