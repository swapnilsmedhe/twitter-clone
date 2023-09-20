const express = require("express");
const { driver, auth, session } = require("neo4j-driver");
const { createSignupHanlder } = require("./handlers/signup");
const { createLoginHandler } = require("./handlers/login");
const { UserRepository } = require("./userRepository");

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

  const userRepository = new UserRepository(neo4jSession);

  app.use(express.json());
  app.post("/signup", createSignupHanlder(userRepository));
  app.post("/login", createLoginHandler(userRepository));
  app.get("/", (req, res) => res.send("Welcome to my twitter clone"));

  return app;
};

module.exports = { createApp };
