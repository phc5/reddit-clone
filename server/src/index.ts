import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { __prod__ } from './constants';
import { buildSchema } from 'type-graphql';
// import { Post } from './entities/Post';
import microConfig from './mikro-orm.config';
import { UserResolver } from './resolvers/user';
import { PostResolver } from './resolvers/post';

const main = async () => {
  // connect database
  const orm = await MikroORM.init(microConfig);
  // run migrations
  await orm.getMigrator().up();

  // const post = orm.em.create(Post, { title: 'This is a test' });
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts);

  const app = express();
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server listening on PORT 4000');
  });
};

main();
