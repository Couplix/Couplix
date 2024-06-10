import { PrismaClient } from '@prisma/client';
import { ValidationError } from '../errors';

const prisma = new PrismaClient();

export const addRate = async ({ netflixId, star }: any) => {
  if (!netflixId || !star || typeof netflixId !== 'number' || typeof star !== 'number') {
    throw new ValidationError();
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

  const rateAvg = await prisma.starRating.aggregate({
    where: { netflixId },
    _avg: { star: true }
  });

  return rateAvg._avg.star;
}
