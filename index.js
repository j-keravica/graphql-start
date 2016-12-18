'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
} = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
  name: 'Video',
  description: 'Pa video type',
  fields: {
    id: {
      type: GraphQLID,
      description: 'Captain Obvious'
    },
    title: {
      type: GraphQLString
    },
    duration: {
      type: GraphQLInt
    },
    watched: {
      type: GraphQLBoolean
    }
  }
});
const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'Root query type',
  fields: {
    video: {
      type: videoType,
      resolve: () => new Promise((resolve) => {
        resolve({
          id: 'a',
          title: 'Frozen',
          duration: 145,
          watched: true
        });
      })
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
});

const videoA = {
  id: '2',
  title: 'Love Actually',
  duration: 180,
  watched: true
};

const videoB = {
  id: '3',
  title: 'Star Wars',
  duration: 180,
  watched: false
};

const videos = [videoA, videoB];

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
