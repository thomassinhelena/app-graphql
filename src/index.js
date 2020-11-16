import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useQuery, gql } from "@apollo/client";

import React from "react";
import { render } from "react-dom";

import { ApolloProvider } from "@apollo/client";
// const client = ...
const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io",
  cache: new InMemoryCache(),
});

const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

function ExchangeRates() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <ExchangeRates />
      </div>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById("root"));

client
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  })
  .then((result) => console.log(result));
