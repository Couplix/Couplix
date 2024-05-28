import { Router, Request, Response } from 'express';
import errorCatcher from '../utils/errorCatcher';
import * as userService from '../services/user.service';

const router = Router();

router.get('/', errorCatcher(async (req: Request, res: Response) => {
    const result = await userService.getUser();
    res.status(200).json(result);
}));

router.get('/find', errorCatcher(async (req: Request, res: Response) => {
    const result = await userService.getUserFind({ id: req.query.id as string });
    res.status(200).json(result);
}));

router.post('/', errorCatcher(async (req: Request, res: Response) => {
    const result = await userService.addUser({ name: req.body.name });
    res.status(201).json(result);
}));

export default router;
