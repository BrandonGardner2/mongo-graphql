const Express = require("express");
const ExpressGraphQL = require("express-graphql");
const Mongoose = require("mongoose");

const personSchema = require("./models/Person/gqlPerson");

const server = Express();

Mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Mongo has connected");
  })
  .catch(err => {
    console.log(err);
  });

server.use(
  "/person",
  ExpressGraphQL({
    schema: personSchema,
    graphiql: true
  })
);

module.exports = server;
