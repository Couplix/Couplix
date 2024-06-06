import {Router, Request, Response, NextFunction} from 'express';
import test from './test';
import contents from './contents';
import errorHandler from '../utils/errorHandler';

const app = Router();
app.use('/', test);
app.use('/user', contents);

app.use(errorHandler);
  
export default app;
