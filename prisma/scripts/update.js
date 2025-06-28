import { Prisma } from "./conn.js";

async function updatePrice(qty, price) {
    const dd = await Prisma.pricing.updateMany({
        where: {
            qty: qty,
            productItem: {
                productId: 23,
                AND: [
                    {
                        productAttributeOptions: {
                            some: {
                                productAttributeValue: "170 GSM Art Paper",
                            },
                        },
                    },
                    {
                        productAttributeOptions: {
                            some: {
                                productAttributeValue: "Required",
                            },
                        },
                    },
                ],
            },
        },
        data: {
            price: price,
        },
    });

    console.log(dd);
}

await updatePrice(1000, 5379);
await updatePrice(2000, 9469);
await updatePrice(3000, 13339);
await updatePrice(4000, 17509);
