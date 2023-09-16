import { GraphQLClient } from "graphql-request";

const API_URL = process.env.API_URL;
if (!API_URL) {
  throw new Error("API_URL not set");
}
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  throw new Error("API_KEY not set");
}

const graphqlClient = new GraphQLClient(API_URL, {
  headers: {
    "x-api-key": API_KEY,
  },
});

export { graphqlClient };
