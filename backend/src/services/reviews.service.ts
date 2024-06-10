import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { ValidationError } from "../errors";

export const postReviews = async ({ netflixId, review }: any) => {
    if (!netflixId || typeof netflixId !== 'number' || !review || typeof review !== 'string') {
        throw new ValidationError();
    }
    
    await prisma.review.create({
        data: {
            content: review,
            netflixId
        }
    });
    
    const reviews = await prisma.review.findMany({
        where: { netflixId },
        select: { content: true }
    });
    
    return reviews.map(r => r.content);
}
