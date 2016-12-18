'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const { graphql, buildSchema } = require('graphql');

const PORT = process.env.PORT || 3000;
const server = express();

const schema = buildSchema(`
  type Video {
    id: ID,
    title: String,
    duration: Int,
    watched: Boolean
  }

  type Query {
    video: Video
    videos: [Video]
  }

  type Schema {
    query: Query
  }
`);

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

const resolvers = {
  video: () => ({
    id: '1',
    title: 'foo',
    duration: 180,
    watched: true
  }),
  videos: () => videos
};

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));
