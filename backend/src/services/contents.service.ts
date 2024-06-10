import { PrismaClient } from "@prisma/client";
import { NoResultsError, ValidationError } from "../errors";
const prisma = new PrismaClient();

export const getContents = async (id: any) => {
    if (!id || typeof id !== 'string' || typeof parseInt(id) !== 'number') {
        throw new ValidationError();
    }
    const starRateAvg = await prisma.starRating.aggregate({
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

    if(!contents) {
        throw new NoResultsError();
    }

    return {
        ...contents,
        starRate : starRateAvg._avg.star,
        reviews: contents.reviews.map(v => v.content)
    };
}
