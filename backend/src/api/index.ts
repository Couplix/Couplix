import {Router, Request, Response, NextFunction} from 'express';
import test from './test';
import contents from './contents';
import errorHandler from '../utils/errorHandler';
import reviews from './reviews';

const app = Router();
app.use('/', test);
app.use('/contents', contents);
app.use('/reviews', reviews);

app.use(errorHandler);
  
export default app;
