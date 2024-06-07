import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Request, Response } from 'express';

export const getReviews = async (id: string) => {
    return await prisma.netflix.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            // title: true,
            // director: true,
            // cast: true,
            // releaseYear: true,
            // rating: true,
            // duration: true,
            // description: true,
            // starRating: true
        }
    });
}




interface ReviewInput {
    contentId: number;
    review: string;
}

export const postReviews = async (req: Request, res: Response) => {
    const { contentId, review }: ReviewInput = req.body as ReviewInput;
    
    if (!contentId || typeof contentId !== 'number' || !review || typeof review !== 'string') {
        throw new Error('Invalid input data');
    }
    
    await prisma.review.create({
        data: {
            contentId,
            review
        }
    });
    
    const reviews = await prisma.review.findMany({
        where: { contentId },
        select: { review: true }
    });
    
    return reviews.map(r => r.review);
}