import { MikroORM } from '@mikro-orm/core';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { __prod__ } from './constants';
import { buildSchema } from 'type-graphql';
import microConfig from './mikro-orm.config';
import { UserResolver } from './resolvers/user';
import { PostResolver } from './resolvers/post';
import { MyContext } from './types';

const main = async () => {
  // connect database
  const orm = await MikroORM.init(microConfig);
  // run migrations
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true, // cookie can't be accessed via js
        sameSite: 'lax', // protect against csrf
        secure: __prod__, // cookie only works in https
      },
      saveUninitialized: false,
      secret: 'a;sldfj1oi3j3oij31oiemiofj',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('Server listening on PORT 4000');
  });
};

main();
