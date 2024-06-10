import { Router, Request, Response } from 'express';
import { categories } from '../data';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const formattedCategories = categories.map((category, index) => ({
    id: index + 1,
    name: category
  }));
  
  res.json(formattedCategories);
});

export default router;
