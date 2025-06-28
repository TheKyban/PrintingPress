import fs from "node:fs/promises";
import path from "node:path";

import { Prisma } from "./conn.js";

async function getProductsWithItems() {
    const filePath = path.join(
        process.cwd(),
        "prisma",
        "scripts",
        "products.json",
    );

    try {
        // Fetch products with related productItems and their attribute values
        const data = await Prisma.product.findMany({
            include: {
                productItems: {
                    include: {
                        productAttributeOptions: {
                            include: {
                                productAttributeType: true,
                            },
                        },
                    },
                },
                category: true,
            },
        });

        console.log("Fetched products:", data.length);

        // Write to JSON file
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
            encoding: "utf8",
            flag: "w",
        });

        console.log(`Data written to ${filePath}`);
    } catch (error) {
        console.error("Error in getProductsWithItems:", error);
    }
}

getProductsWithItems();
