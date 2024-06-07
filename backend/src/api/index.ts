import {Router, Request, Response, NextFunction} from 'express';
import test from './test';
import contents from './contents';
import categories from './categories'
import errorHandler from '../utils/errorHandler';

const app = Router();
app.use('/', test);
app.use('/contents', contents);
app.use('/categories',categories);

app.use(errorHandler);
  
export default app;
