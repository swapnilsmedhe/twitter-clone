const express = require("express");
const { driver, auth, session } = require("neo4j-driver");
const { createSignupHanlder } = require("./handlers/signup");

const createApp = () => {
  const app = express();

  const databaseAuth = auth.basic(
    process.env.NEO4J_USERNAME,
    process.env.NEO4J_PASSWORD
  );

  const neo4jDriver = driver(process.env.NEO4J_URL, databaseAuth);
  const neo4jSession = neo4jDriver.session({
    defaultAccessMode: session.WRITE,
  });

  app.use(express.json());
  app.post("/signup", createSignupHanlder(neo4jSession));
  app.get("/", (req, res) => res.send("Welcome to my twitter clone"));

  return app;
};

module.exports = { createApp };
