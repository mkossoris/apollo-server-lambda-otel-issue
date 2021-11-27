// Import required symbols
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { NodeTracerProvider } from "@opentelemetry/node";
import {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} from "@opentelemetry/tracing";
import { Resource } from "@opentelemetry/resources";
import { GraphQLInstrumentation } from "@opentelemetry/instrumentation-graphql";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector";
import { AwsLambdaInstrumentation } from "@opentelemetry/instrumentation-aws-lambda";

// Register server-related instrumentation
registerInstrumentations({
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation() as any, // Gives type error without the "as any"
    new GraphQLInstrumentation(),
    new AwsLambdaInstrumentation(),
  ],
});

// Initialize provider and identify this particular service
// (in this case, we're implementing a federated gateway)
export const provider = new NodeTracerProvider({
  resource: Resource.default().merge(
    new Resource({
      // Replace with any string to identify this service in your system
      "service.name": "demo",
    })
  ),
});

// Configure a test exporter to print all traces to the console
const consoleExporter = new ConsoleSpanExporter();
export const consoleProcessor = new SimpleSpanProcessor(consoleExporter);
provider.addSpanProcessor(consoleProcessor);

// Register the provider to begin tracing
provider.register();
