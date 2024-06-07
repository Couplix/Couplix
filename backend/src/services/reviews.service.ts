import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
