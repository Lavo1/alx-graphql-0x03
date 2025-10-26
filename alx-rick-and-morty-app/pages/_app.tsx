// --- Initialize Sentry at the very top ---
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8aa2b74e6ce435786305d079df961b2f@o4510256525869056.ingest.us.sentry.io/4510256533471232",
  tracesSampleRate: 1.0, // capture all transactions for development
});

// --- Your existing imports ---
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client/react";
import client from "@/graphql/apolloClient";
import ErrorBoundary from "@/components/ErrorBoundary";

// --- Your main app component ---
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ApolloProvider>
  );
}
