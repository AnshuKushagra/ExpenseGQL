import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GridBackground from "./Components/UI/GridBackground.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
  uri:
    import.meta.env.VITE_NODE_ENV === "development"
      ? "http://localhost:4000/graphql"
      : "/graphql", // the URL of the GraphQL server
  cache: new InMemoryCache(), // Apollo CLient uses to cache query result after fetching them !
  credentials: "include", // This tells Apollo Client to send cookies along with every request to the server !
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </StrictMode>
);
