import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://mock.shop/api", // import.meta.env.VITE_API_END_POINT,
  cache: new InMemoryCache(),
});

export default client;