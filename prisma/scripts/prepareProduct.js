import path from "path";
import fs from "fs/promises";

export async function PrepareProduct() {
    try {
        const filePath = path.join(
            process.cwd(),
            "prisma",
            "scripts",
            "products.json",
        );

        const fileData = await fs.readFile(filePath, "utf8");
        const products = JSON.parse(fileData);

        const data = [];
        for (const product of products) {
            for (const productItem of product.productItems) {
                const temp2 = {
                    id: productItem.id,
                    productId: productItem.productId,
                    isAvailable: productItem.isAvailable,
                    pricing: [
                        {
                            qty: productItem.minQty,
                            price: productItem.price,
                        },
                    ],
                    createdAt: productItem.createdAt,
                    updatedAt: productItem.updatedAt,
                    productAttributeOptions:
                        productItem.productAttributeOptions,
                };
                data.push(temp2);
            }
            // temp.productItems = productItems;
            // data.push(temp);
        }

        fs.writeFile(
            path.join(
                process.cwd(),
                "prisma",
                "scripts",
                "newProductsItems.json",
            ),
            JSON.stringify(data, null, 2),
            {
                flag: "w",
                encoding: "utf8",
            },
        );
    } catch (e) {
        console.log(e);
    }
}

PrepareProduct();
