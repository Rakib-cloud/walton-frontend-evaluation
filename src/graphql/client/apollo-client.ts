import { ApolloLink, HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/client-integration-nextjs";
import { env } from "@/config/env";

export function makeApolloClient() {
  const httpLink = new HttpLink({
    uri: env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    fetchOptions: { cache: "no-store" },
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getProducts: {
              keyArgs: ["filter"],
              merge(existing, incoming, { args }) {
                const skip = args?.pagination?.skip ?? 0;
                if (skip === 0) return incoming;
                if (!existing?.result?.products) return incoming;

                return {
                  ...incoming,
                  result: {
                    ...incoming.result,
                    products: [
                      ...existing.result.products,
                      ...(incoming.result?.products ?? []),
                    ],
                  },
                };
              },
            },
          },
        },
      },
    }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({ stripDefer: true }),
            httpLink,
          ])
        : httpLink,
  });
}
