import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rates = {
  calculateAverageRating: async (netflixId: number) => {
    try {
      // 주어진 netflixId에 대한 모든 평점 조회
      const starRatings = await prisma.starRating.findMany({
        where: {
          netflixId
        },
        select: {
          star: true
        }
      });

      // 평균 평점 계산
      const totalRating = starRatings.reduce((acc, starRating) => acc + starRating.star, 0);
      const avgRating = totalRating / starRatings.length;

      return avgRating;
    } catch (error) {
      throw new Error('Failed to calculate average rating');
    }
  }
};

export default rates;
