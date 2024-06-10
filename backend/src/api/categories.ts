import { Router, Request, Response } from 'express';
import { getCategories } from '../services/categories.service';
import errorCatcher from '../utils/errorCatcher';

const router = Router();

router.get('/', errorCatcher(async (req: Request, res: Response) => {
    const categories = await getCategories();
    res.status(200).json(categories);
}));

export default router;
