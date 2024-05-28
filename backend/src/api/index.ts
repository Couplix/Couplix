import {Router, Request, Response, NextFunction} from 'express';
import test from './test';
import errorHandler from '../utils/errorHandler';

const app = Router();
app.use('/', test);

app.use(errorHandler);
  
export default app;
