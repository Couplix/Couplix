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
            categories: {
                select: {
                    name: true,
                }
            },
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
        starRate : starRateAvg._avg.star??0,
        reviews: contents.reviews.map(v => v.content),
        categories: contents.categories.map(v => v.name)
    };
}

export const getRecommendContents = async ({prefer1, prefer2, dislike1, dislike2, likeContent1, likeContent2}: any) => {
    if(!prefer1 || !prefer2 || !dislike1 || !dislike2 || !likeContent1 || !likeContent2) {
        throw new ValidationError();
    }
    if(typeof prefer1 !== 'string' || typeof prefer2 !== 'string' || typeof dislike1 !== 'string' || typeof dislike2 !== 'string' || typeof likeContent1 !== 'string' || typeof likeContent2 !== 'string') {
        throw new ValidationError();
    }

    const prefer1Arr = prefer1.split(',').map(v => parseInt(v));
    const prefer2Arr = prefer2.split(',').map(v => parseInt(v));
    const dislike1Arr = dislike1.split(',').map(v => parseInt(v));
    const dislike2Arr = dislike2.split(',').map(v => parseInt(v));
    const likeContent1Arr = likeContent1.split(',').map(v => parseInt(v));
    const likeContent2Arr = likeContent2.split(',').map(v => parseInt(v));

    const commonPrefer = prefer1Arr.filter(v => prefer2Arr.includes(v));
    const commonDislike = [ ...new Set(dislike1Arr.concat(dislike2Arr))];
    const otherPrefer = [ ...new Set(prefer1Arr.concat(prefer2Arr))].filter(v => !commonPrefer.includes(v) && !commonDislike.includes(v));

    
    
}
