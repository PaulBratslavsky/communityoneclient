import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  concat,
} from "@apollo/client";

const cache = new InMemoryCache();
const defaultOptions = { mutate: { errorPolicy: "all" } };
const httpLink = new HttpLink({
  uri:
    process.env.REACT_APP_API_URL ||
    "https://communityoneapi.herokuapp.com/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const accessToken = operation.operationName !== "LoginMutation" && localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null

    return {
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  });

  return forward(operation);
});

export const client = new ApolloClient({
  cache,
  link: concat(authMiddleware, httpLink),
  defaultOptions,
});
