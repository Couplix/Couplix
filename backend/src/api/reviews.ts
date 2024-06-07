import { Router, Request, Response } from 'express';
import errorCatcher from '../utils/errorCatcher';
import * as reviewsService from '../services/reviews.service';

const router = Router();

router.get('/:id', errorCatcher(async (req: Request, res: Response) => {
    const result = await reviewsService.getReviews(req.params.id);
    res.status(200).json(result);
}));

router.post('/', async (req: Request, res: Response) => {
  const result = await reviewsService.postReviews(req.body);
  res.status(201).json(result);
});
  

export default router;
