const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const { updateBookTitle, loginUser } = require('./utils');

let bookData = require('./data.json');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
    getBooks: [Book]
  },

  type Mutation {
    updateBookTitle(id: Int!, title: String!): Book
    loginUser(username: String!, password: String!): UserData
  }

  type Book {
    id: Int
    title: String
    subtitle: String
    aurthor: String
    published: String
    publisher: String
    pages: Int
    description: String
    website: String
  }

  type UserData {
      name: String
      phone: String
      email: String
  }
`;

// Provide a resolver function for each API endpoint
const resolvers = {
    Query: { 
        hello: () => { return 'Hello world!'; },
        getBooks: () => bookData
    },
    Mutation: {
        updateBookTitle: (source, data) => updateBookTitle(source, data),
        loginUser: (source, data) => loginUser(source, data)
    }
};

//setup apollo server
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen(4000, () => console.log(`Running a GraphQL API server at http://localhost:4000/${server.graphqlPath}`));