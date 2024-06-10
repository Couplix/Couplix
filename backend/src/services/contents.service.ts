import { PrismaClient } from "@prisma/client";
import { ValidationError } from "../errors";
const prisma = new PrismaClient();

export const getContents = async (id: any) => {
    if (!id || typeof id !== 'string' || typeof parseInt(id) !== 'number') {
        throw new ValidationError();
    }
    const startRateAvg = await prisma.starRating.aggregate({
        where: { netflixId: parseInt(id) },
        _avg: { star: true }
      });

    const contents =  await prisma.netflix.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            reviews: {
                select: {
                    content: true,
                }
            }
        }
    });

    return {
        ...contents,
        startRate : startRateAvg._avg.star
    };
}
