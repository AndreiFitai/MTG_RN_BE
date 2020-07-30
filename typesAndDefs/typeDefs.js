const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    password: String!
  }

  type Todo {
    id: ID!
    user: Int!
    name: String!
  }

  type Query {
    todos: [Todo]
  }
`;

module.exports = typeDefs;
