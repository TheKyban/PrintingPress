import path from "path";
import fs from "fs/promises";
import { Prisma } from "./conn.js";
async function getData() {
    const filePath = path.join(
        process.cwd(),
        "prisma",
        "scripts",
        "newProductsItems.json",
    );
    const rawData = await fs.readFile(filePath, "utf8");
    const newProducts = JSON.parse(rawData);
    return newProducts;
}

function chunk(array, size) {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
        array.slice(i * size, i * size + size),
    );
}

export async function seedProducts() {
    try {
        const newProducts = await getData();
        const chunks = chunk(newProducts, 10); // process 10 at a time

        for (const group of chunks) {
            await Promise.all(
                group.map(async (product) => {
                    const pricingData = product.pricing[0]; // can also loop if multiple

                    await Prisma.pricing.upsert({
                        where: {
                            productItemId_qty: {
                                productItemId: product.id,
                                qty: pricingData.qty,
                            },
                        },
                        update: {
                            price: pricingData.price, // update if already exists
                        },
                        create: {
                            productItemId: product.id,
                            qty: pricingData.qty,
                            price: pricingData.price,
                        },
                    });
                }),
            );
        }

        console.log("✅ Product pricing seeded/updated.");
    } catch (error) {
        console.error("❌ Seeding failed:", error);
    }
}

seedProducts();
