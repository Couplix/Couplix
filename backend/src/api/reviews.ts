import { Router, Request, Response } from 'express';
import errorCatcher from '../utils/errorCatcher';
import * as reviewsService from '../services/reviews.service';

const router = Router();

router.get('/:id', errorCatcher(async (req: Request, res: Response) => {
    const result = await reviewsService.getReviews(req.params.id);
    res.status(200).json(result);
}));

export default router;
