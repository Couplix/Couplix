import {Router, Request, Response, NextFunction} from 'express';
import test from './test';
import user from './user';
import errorHandler from '../utils/errorHandler';

const app = Router();
app.use('/', test);
app.use('/user', user);

app.use(errorHandler);
  
export default app;
