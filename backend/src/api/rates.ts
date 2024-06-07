import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// 새로운 평점 등록 엔드포인트
router.post('/', async (req: Request, res: Response) => {
  try {
    const { netflixId, star } = req.body;

    // 유효성 검사
    if (!netflixId || !star || typeof netflixId !== 'number' || typeof star !== 'number') {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // 평점 데이터베이스에 저장
    await prisma.starRating.create({
      data: {
        star,
        netflix: {
          connect: { id: netflixId }
        }
      }
    });

    res.status(201).json({ message: 'Rating successfully added' });
  } catch (error) {
    console.error('Error while adding rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
