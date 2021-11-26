import "./open-telemetry";
import { ApolloServer, gql } from "apollo-server-lambda";
import { consoleProcessor, provider } from "./open-telemetry";

const typeDefs = gql`
  type Query {
    product(id: Int!): Product
    products: [Product]
  }

  type Product {
    id: ID
    name: String
    price: Float
  }
`;

const resolvers = {
  Query: {
    product(_: any, args: any) {
      console.log(args);
      return products.find((product) => product.id === args.id) || null;
    },
    products() {
      return products;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  introspection: true,
});

export const handler = async (event: any, context: any, callback: any) => {
  const handler = server.createHandler();
  const response = await handler(event, context, callback);

  console.log("forcing provider flush");
  await provider.forceFlush();
  console.log("finished forcing provider flush");

  console.log("forcing console processor flush");
  await consoleProcessor.forceFlush();
  console.log("finished console processor flush");

  return response;
};

// Needed for esbuild NodejsFunction issue
module.exports = { handler };

const products = [
  {
    id: "1",
    name: "Product 1",
    price: 5.5,
  },
  {
    id: 2,
    name: "Product 2",
    price: 3.0,
  },
  {
    id: 3,
    name: "Product 3",
    price: 8.25,
  },
];
