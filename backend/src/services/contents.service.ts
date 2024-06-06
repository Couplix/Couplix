import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getContents = async (id: string) => {
    return await prisma.netflix.findUnique({
        where: {
            id: parseInt(id)
        },
        include: {
            starRating: true,
            reviews: {
                select: {
                    content: true,
                }
            }
        }
    });
}
