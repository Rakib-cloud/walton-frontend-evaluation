"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeApolloClient } from "@/graphql/client/apollo-client";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloNextAppProvider makeClient={makeApolloClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
