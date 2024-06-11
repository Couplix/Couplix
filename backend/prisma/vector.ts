import { PrismaClient } from "@prisma/client";
import similarity from "compute-cosine-similarity";

const prisma = new PrismaClient();

async function main() {
    const data = await prisma.embedding.findMany() as unknown as { netflixId: number, embedding: number[] }[];

    //각 임베딩 데이터간의 거리를 계산하여 0.7 이상인 경우, prisma.recommendation에 저장
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const distance = similarity(data[i].embedding, data[j].embedding);
            if(distance === null) continue;
            if (distance >= 0.6) {
                await prisma.recommendation.createMany({
                    data: [{
                        originId: data[i].netflixId,
                        recommendId: data[j].netflixId,
                        similarity: distance,
                    },
                    {
                        originId: data[j].netflixId,
                        recommendId: data[i].netflixId,
                        similarity: distance,
                    }]
                });
            }
        }
        if(i % 100 === 0) console.log(i);
    }

}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
