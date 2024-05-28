import {Request, Response, NextFunction} from 'express';
import { ErrorWithStatus } from '../errors';

export default (error: any, req: Request, res: Response, next: NextFunction) => {
    if(error instanceof ErrorWithStatus)
      return res.status(error.status).json({message: error.message });
    return res.status(500).json({message: "알 수 없는 오류" });
}
