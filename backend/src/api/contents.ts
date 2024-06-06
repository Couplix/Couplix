import { Router, Request, Response } from 'express';
import errorCatcher from '../utils/errorCatcher';
import * as userService from '../services/contents.service';

const router = Router();

router.get('/:id', errorCatcher(async (req: Request, res: Response) => {
    const result = await userService.getUser();
    res.status(200).json(result);
}));

export default router;
