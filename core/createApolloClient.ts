import { ApolloClient, from, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

let graphqlUrl: string | undefined;
if (process.browser) {
  graphqlUrl = process.env.NEXT_PUBLIC_EXTERNAL_GRAPHQL_URL;
} else {
  graphqlUrl = process.env.INTERNAL_GRAPHQL_URL;
}

export default function createApolloClient() {
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
    if (process.browser) {
      authToken = localStorage.getItem("authToken");
    }

    if (authToken) {
      return { headers: { authorization: authToken } };
    }
    return { headers: {} };
  });

  const httpLink = new HttpLink()

  return new ApolloClient({
    cache: new InMemoryCache(),
    credentials: "include",
    link: from([errorLink, authLink, httpLink]),
  });
}
