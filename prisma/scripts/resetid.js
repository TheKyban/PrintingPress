import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    prisma.$executeRawUnsafe(`
    SELECT setval('"productCategory_id_seq"', 12, true);
  `);
    console.log("✅ Sequence reset!");
}

main()
    .catch((e) => {
        console.error("Error resetting sequence:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
