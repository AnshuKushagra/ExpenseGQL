import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";
import { configurePassport } from "./Passport/passport.config.js";

import mergedResolvers from "./Resolvers/index.js";
import mergedTypeDefs from "./TypeDefs/index.js";

import { connectDB } from "./db/connectDB.js";
dotenv.config();
configurePassport();

const __dirname = path.resolve();
const app = express();
const httpServer = http.createServer(app);

// This connects MongoDB as a session storage system for the app.
// Instead of storing session data in memory, it will be stored in a MongoDB database.

const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});
store.on("error", (err) => {
  console.log(err);
});

// SESSION MIDDLEWARE
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

//  This code initializes and starts the Apollo Server
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Prepares the server for accepting requests
await server.start();

// COMMENT

// CONNECTION OF APOLLO TO EXPRESS
// For the Apollo Server to actually receive and process requests, you need to attach it to Express.js like this:
// 👇

app.use(
  "/graphql",
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  }),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

// IMP
// This code is used for deployment !
app.use(express.static(path.join(__dirname, "FrontEnd/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd/dist", "index.html"));
});

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB();
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
