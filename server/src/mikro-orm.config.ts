import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
require('dotenv').config();

export default {
  dbName: 'reddit',
  debug: !__prod__,
  entities: [Post],
  migrations: {
    path: path.join(__dirname, './migrations'),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  type: 'postgresql',
  user: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASS,
} as Parameters<typeof MikroORM.init>[0];
