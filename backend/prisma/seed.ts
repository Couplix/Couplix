import { PrismaClient } from "@prisma/client";
import seed from "./seed.json";

const prisma = new PrismaClient();

async function main() {
    await prisma.netflix.createMany({
        data: seed
    });
}

main()
