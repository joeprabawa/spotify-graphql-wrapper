const express = require("express");
const app = express();
const typeDefs = require("./types");
const resolvers = require("./resolver");

const { ApolloServer } = require("apollo-server-express");
const { router } = require("./api");

app.use("https://spotify-wrapper-graphql.herokuapp.com", router);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  tracing: true,
});

server.applyMiddleware({ app });
app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
