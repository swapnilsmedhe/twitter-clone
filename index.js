const express = require("express");
const { driver, auth, session } = require("neo4j-driver");
require("dotenv").config();

const databaseAuth = auth.basic(
  process.env.NEO4J_USERNAME,
  process.env.NEO4J_PASSWORD
);

const neo4jDriver = driver(process.env.NEO4J_URL, databaseAuth);
const neo4jSession = neo4jDriver.session({ defaultAccessMode: session.WRITE });

neo4jSession.run("CREATE (James : User {name: 'James'})");

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("Welcome to my twitter clone"));

app.listen(PORT, () => console.log("Listening on port", PORT));
