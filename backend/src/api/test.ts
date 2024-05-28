import express, { Router, Request, Response, NextFunction } from 'express';
import errorCatcher from '../utils/errorCatcher';
import * as  testService from '../services/test.service';

const router = Router();

router.get('/ping', errorCatcher(async (req: Request, res: Response) => {
    const result = await testService.ping();
    res.status(200).json(result);
}));

export default router;
