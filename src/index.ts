import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import resolvers from './resolvers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();


const typeDefs = gql`
  ${require('fs').readFileSync(require.resolve('./schema.graphql'), 'utf8')}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

const main = async () => {
  await server.start();
  server.applyMiddleware({ app });
}


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

main().catch((err) => {
  console.log(err);
});

