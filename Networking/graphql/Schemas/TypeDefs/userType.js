const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const userType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    isAdmin: { type: GraphQLBoolean },
  })
});

module.exports = userType;