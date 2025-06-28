import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

// declare global {
//     // eslint-disable-next-line
//     var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
// }

export const Prisma = globalThis.prisma ?? prismaClientSingleton();
// export const Prisma = prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = Prisma;
