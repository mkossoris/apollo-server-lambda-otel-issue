"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
require("./open-telemetry");
const apollo_server_lambda_1 = require("apollo-server-lambda");
const typeDefs = (0, apollo_server_lambda_1.gql) `
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
        product(_, args) {
            console.log(args);
            return products.find((product) => product.id === args.id) || null;
        },
        products() {
            return products;
        },
    },
};
const server = new apollo_server_lambda_1.ApolloServer({
    typeDefs,
    resolvers,
    debug: true,
    introspection: true,
});
exports.handler = server.createHandler();
// Needed for esbuild NodejsFunction issue
module.exports = { handler: exports.handler };
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
