const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();
const port = 4100;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
app.get("/", (req, res) => {
  res.send("hello wrold");
});

app.listen(port, () => {
  console.log("i m listeing on port: ", port);
});

mongoose
  .connect(
    `mongodb+srv://vinaykrjs:9VVQJHyKesdGuvu7@clustereventbookingappd.qk6pz.mongodb.net/EventsDB?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("conected to db");
    app.listen(4616);
    console.log("app is listening on port : 4616");
  })
  .catch((err) => {
    console.log(err);
  });
