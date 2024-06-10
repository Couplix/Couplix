import { PrismaClient } from "@prisma/client";
import categories from "./category.json";
import seed from "./netflix.json";

const prisma = new PrismaClient();

async function main() {
    await prisma.category.createMany({
        data: categories.map((category) => {
            return {
                name: category
            }
        })
    });

    for( let item of seed) {
        await prisma.netflix.create({
            data: {
                ...{
                    ...item,
                    id: undefined,
                    listed_in: undefined
                },
                categories: {
                    connect: item.listed_in.split(", ").map((category) => {
                        return {
                            name: category
                        }
                    })
                }
            }
        });
    }
}

main()
