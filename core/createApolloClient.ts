import { ApolloClient, from, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";

let apolloClient: ApolloClient<any>;
let graphqlUrl: string | undefined;
if (process.browser) {
  graphqlUrl = process.env.NEXT_PUBLIC_EXTERNAL_GRAPHQL_URL;
} else {
  graphqlUrl = process.env.INTERNAL_GRAPHQL_URL;
}

export default function createApolloClient(ctx: any) {
  const errorLink: ApolloLink = onError((errorResponse: ErrorResponse) => {
    const { operation, forward, graphQLErrors, networkError } = errorResponse;
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }
    if (
      networkError &&
      "statusCode" in networkError &&
      networkError.statusCode === 404
    ) {
      operation.setContext({ headers: {} });
      return forward(operation);
    }
    return;
  });

  const authLink = setContext(() => {
    let authToken: string | null = "";
    if (typeof window) {
      authToken = localStorage.getItem('authToken');
    } else {
      authToken = ctx.ctx?.req.cookies?.authToken;
    }

    if (authToken) {
      return { headers: { authorization: `Bearer ${authToken}` } };
    }
    return { headers: {} };
  });

  const httpLink = new HttpLink({ uri: graphqlUrl })

  return new ApolloClient({
    cache: new InMemoryCache(),
    credentials: "include",
    link: from([errorLink, authLink, httpLink]),
  });
}


/* eslint-disable no-underscore-dangle */
export function initializeApollo(initialState: any = null, ctx?: any) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: unknown) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
