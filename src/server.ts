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

export const handler = server.createHandler();

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
