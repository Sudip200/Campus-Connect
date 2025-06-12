import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import {ApolloServer} from 'apollo-server-express';
import { ApplicationError, NotFoundError } from './errors';
import routes from './routes';
import config from './config/config';
import resolvers from './v1/graphql/resolvers';
import typeDefs from './v1/graphql/typeDef';


const app = express();
const apolloServer = new ApolloServer({
  resolvers:resolvers,
  typeDefs:typeDefs,
})
app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:3001"],
    credentials:true
  }),
);
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
apolloServer.start().then(()=>{
  apolloServer.applyMiddleware({app,path:'/schedule-graphql'})
  console.log('Graph ql server running')
})
app.set('port', config.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(express.static(path.join(__dirname, 'uploads'), { maxAge: 31557600000 }));

app.use(routes);
app.use((req, res, next) =>
  next(new NotFoundError('We are unable to locate requested API resource', 404, 'API_ENDPOINT_NOT_FOUND')),
);

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({
    error: config.isDevelopment ? err : undefined,
    message: err.message,
  });
});

export default app;
