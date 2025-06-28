import { Prisma } from "./conn.js";

export const customerCategories = [
    { name: "Associate", baseDiscount: 5, level: 1 },
    { name: "Gold", baseDiscount: 10, level: 2 },
    { name: "Elite", baseDiscount: 15, level: 3 },
    { name: "Premium", baseDiscount: 20, level: 4 }, // Highest tier
];

export async function seedCustomerCategories() {
    customerCategories.map(
        async ({ name, baseDiscount, level }) =>
            await Prisma.customerCategory.upsert({
                where: { name, level },
                update: { discount: baseDiscount, level },
                create: { name, discount: baseDiscount, level },
            }),
    );
}
