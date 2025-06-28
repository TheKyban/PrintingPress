import path from "path";
import fs from "fs/promises";
import { Prisma } from "./conn.js";

export async function seedProductCategories() {
    const filePath = path.join(
        process.cwd(),
        "prisma",
        "data",
        "productCategory.json",
    );
    const fileData = await fs.readFile(filePath, "utf8");
    const categories = JSON.parse(fileData);

    for (const category of categories) {
        await Prisma.productCategory.upsert({
            where: { id: category.id },
            update: {
                name: category.name,
                description: category.description,
                imageUrl: category.imageUrl,
                isAvailable: category.isAvailable,
                parentCategoryId: category.parentCategoryId,
            },
            create: {
                id: category.id, // explicitly provide ID to match the JSON
                name: category.name,
                description: category.description,
                imageUrl: category.imageUrl,
                isAvailable: category.isAvailable,
                parentCategoryId: category.parentCategoryId,
                createdAt: new Date(category.createdAt),
                updatedAt: new Date(category.updatedAt),
            },
        });
    }

    console.log("✅ Product categories seeded.");
}
