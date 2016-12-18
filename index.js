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
const { getVideoByID } = require('./src/data');

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
      args: {
        id: {
          type: GraphQLID,
          description: 'The id of the video'
        }
      },
      resolve: (_, args) => {
        return getVideoByID(args.id);
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
});

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

server.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
