import { registerApolloClient } from "@apollo/client-integration-nextjs";
import { makeApolloClient } from "./apollo-client";

export const { getClient, query, PreloadQuery } = registerApolloClient(
  makeApolloClient,
);
