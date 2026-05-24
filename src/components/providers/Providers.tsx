"use client";

import { ApolloNextAppProvider } from "@apollo/client-integration-nextjs";
import { makeApolloClient } from "@/graphql/client/apollo-client";
import { Toaster } from "sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ApolloNextAppProvider makeClient={makeApolloClient}>
      {children}
      <Toaster position="top-right" richColors closeButton />
    </ApolloNextAppProvider>
  );
}
