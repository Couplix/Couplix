import { Router, Request, Response } from 'express';
import { addRate } from '../services/rates.service';
import errorCatcher from '../utils/errorCatcher';

const router = Router();

// 새로운 평점 등록 엔드포인트
router.post('/', errorCatcher(async (req: Request, res: Response) => {
    const result = await addRate(req.body);
    res.status(201).json(result);
}));

export default router;
