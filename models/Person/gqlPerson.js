const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema
} = require("graphql");

const PersonModel = require("./person");

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields: {
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString }
  }
});

const personSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      people: {
        type: GraphQLList(PersonType),
        resolve: (root, args, context, info) => {
          return PersonModel.find().exec();
        }
      },
      person: {
        type: PersonType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args, context, info) => {
          return PersonModel.findById(args.id).exec();
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      person: {
        type: PersonType,
        args: {
          firstname: { type: GraphQLNonNull(GraphQLString) },
          lastname: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: (root, args, context, info) => {
          const person = new PersonModel(args);
          return person.save();
        }
      }
    }
  })
});

module.exports = personSchema;
