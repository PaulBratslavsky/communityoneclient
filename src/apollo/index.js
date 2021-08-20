import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  // ApolloLink,
  // concat,
} from "@apollo/client";

const cache = new InMemoryCache();
const defaultOptions = { mutate: { errorPolicy: "all" } };
const httpLink = new HttpLink({ uri: 'http://localhost:1337/graphql' })

export const client = new ApolloClient({ 
  cache,
  link: httpLink,
  defaultOptions,
})


// const authMiddleware = new ApolloLink((operation, forward) => {
//   operation.setContext(({headers = {} }) => {
//     const accessToken = operation.operationName !== "LoginMutation" ? localStorage.getItem("token") : null
//     return {
//       headers: {
//         ...headers,
//         authorization: accessToken ? `Bearer ${accessToken}` : "",
//       },
//     };
//   });

//   return forward(operation);
// });

// export const client = new ApolloClient({
//   cache,
//   link: concat(authMiddleware, httpLink),
//   defaultOptions,
// });
