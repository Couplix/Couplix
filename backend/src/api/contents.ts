import { Router, Request, Response } from 'express';
import errorCatcher from '../utils/errorCatcher';
import * as contentsService from '../services/contents.service';
import { ValidationError } from '../errors';

const router = Router();

router.get('/recommendations', errorCatcher(async (req: Request, res: Response) => {
    const result = await contentsService.getRecommendContents(req.query);
    res.status(200).json(result);
}));

router.get('/search', errorCatcher(async (req: Request, res: Response) => {
    const keyword = req.query.keyword;
    console.log('Received keyword in route:', keyword);  // 로그 추가
    const result = await contentsService.getSearch(keyword);
    res.status(200).json(result);
}));

router.get('/:id', errorCatcher(async (req: Request, res: Response) => {
    const result = await contentsService.getContents(req.params.id);
    res.status(200).json(result);
}));

export default router;
