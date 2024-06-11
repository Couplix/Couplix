import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { config } from "dotenv";

config();
const prisma = new PrismaClient();

async function main() {
    const data = await prisma.netflix.findMany();

    for(let item of data) {
        const { data: { data } } = await axios.post('https://api.openai.com/v1/embeddings', {
            model: "text-embedding-3-small",
            input: item.description
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        await prisma.embedding.create({
            data: {
                netflixId: item.id,
                embedding: data[0].embedding
            }
        });
        if(item.id % 100 === 0) {
            console.log(item.id);
        }
    }
}

main()
    .catch(e => {
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
