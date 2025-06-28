import fs from "node:fs/promises";
import path from "node:path";
import { Prisma } from "./conn.js";

async function getProductCategory() {
    const filePath = path.join(
        process.cwd(),
        "prisma",
        "scripts",
        "productCategory.json",
    );

    try {
        // Fetch product categories
        const data = await Prisma.productCategory.findMany();
        console.log("Fetched product categories:", data.length);

        // Write data to JSON file (overwrites if exists)
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
            encoding: "utf8",
            flag: "w", // 'w' is default, but explicit for clarity
        });

        console.log(`Data written to ${filePath}`);
    } catch (error) {
        console.error("Error in getProductCategory:", error);
    }
}
