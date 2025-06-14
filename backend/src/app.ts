import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApplicationError, NotFoundError } from './errors';
import routes from './routes';
import config from './config/config';
import resolvers from './v1/graphql/resolvers';
import typeDefs from './v1/graphql/typeDef';

const apolloServer = new ApolloServer({
  typeDefs:typeDefs,
  resolvers:resolvers
})
const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001',"http://20.193.159.139:3000","http://20.193.159.139:3001"],
    credentials: true,
  }),
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('port', config.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, 'uploads'), { maxAge: 31557600000 }));

app.use(routes);
const registerGraphql = async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: '/schedule-graphql' });
};
registerGraphql();


export default app;
