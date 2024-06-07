import { Router } from 'express';
import starRatingService from '../services/rates.service';

const router = Router();

// 콘텐츠의 평균 평점을 반환하는 API 엔드포인트
router.get('/:netflixId', async (req, res) => {
  try {
    const { netflixId } = req.params;
    const avgRating = await starRatingService.calculateAverageRating(parseInt(netflixId));
    res.status(200).json({ avgRating });
  } catch (error) {
    console.error('Error while calculating average rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
