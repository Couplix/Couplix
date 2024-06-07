import { Router, Request, Response } from 'express';

const router = Router();

// 임시 데이터베이스
const ratingsDB: { [contentId: number]: number[] } = {};

// 평점 등록 API 엔드포인트
router.post('/', (req: Request, res: Response) => {
  const { contentId, rating } = req.body;

  // 입력값 유효성 검사
  if (!contentId || !rating || typeof contentId !== 'number' || typeof rating !== 'number') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // contentId가 존재하지 않으면 빈 배열로 초기화
  if (!ratingsDB[contentId]) {
    ratingsDB[contentId] = [];
  }

  // 평점 배열에 새로운 평점 추가
  ratingsDB[contentId].push(rating);

  // 평균 평점 계산
  const totalRating = ratingsDB[contentId].reduce((acc, curr) => acc + curr, 0);
  const avgRating = totalRating / ratingsDB[contentId].length;

  res.status(201).json({ starRating: avgRating });
});

export default router;
