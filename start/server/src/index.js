require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { createStore } from './utils';
import resolvers from './resolvers';

import LaunchAPI from './datasources/launch';
import UserAPI from './datasources/user';

const store = createStore();

const main = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      launchApi: new LaunchAPI(),
      userApi: new UserAPI({ store }),
    }),
  });

  await server.listen();

  console.log(`
   Server is running!
   Listening on port 4000
   Explore at https://studio.apollographql.com/sandbox`);
};
main();
