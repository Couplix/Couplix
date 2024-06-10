import { Router, Request, Response } from 'express';
import errorCatcher from '../utils/errorCatcher';
import * as reviewsService from '../services/reviews.service';

const router = Router();

router.post('/',errorCatcher(async (req: Request, res: Response) => {
  const result = await reviewsService.postReviews(req.body);
  res.status(201).json(result);
}));
  

export default router;
