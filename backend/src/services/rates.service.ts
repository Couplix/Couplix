import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ratingService = {
  addRating: async (netflixId: number, star: number) => {
    try {
      // 평점 데이터베이스에 저장
      await prisma.starRating.create({
        data: {
          star,
          netflix: {
            connect: { id: netflixId }
          }
        }
      });
    } catch (error) {
      console.error('Failed to add rating:', error);
      throw new Error('Failed to add rating');
    }
  }
};

export default ratingService;
