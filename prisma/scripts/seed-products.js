import path from "path";
import fs from "fs/promises";
import { Prisma } from "./conn.js";
async function getData() {
    const filePath = path.join(
        process.cwd(),
        "prisma",
        "data",
        "newProducts.json",
    );
    const rawData = await fs.readFile(filePath, "utf8");
    const newProducts = JSON.parse(rawData);
    return newProducts;
}

export async function seedProducts() {
    // Step 1: Collect all unique ProductAttributeTypes from the JSON data
    const attributeTypesSet = new Set();
    const newProducts = await getData();
    for (const product of newProducts) {
        for (const item of product.productItems) {
            for (const attr of item.productAttributeOptions) {
                const type = attr.productAttributeType;
                const key = `${type.name}-${type.productCategoryId}`;
                if (!attributeTypesSet.has(key)) {
                    attributeTypesSet.add(key);
                }
            }
        }
    }

    // Step 2: Create ProductAttributeTypes and map them by name and category
    const attributeTypeMap = new Map();

    for (const key of Array.from(attributeTypesSet)) {
        const [name, productCategoryId] = key.split("-");
        const existingType = await Prisma.productAttributeType.findFirst({
            where: { name, productCategoryId: parseInt(productCategoryId) },
        });

        if (!existingType) {
            const newType = await Prisma.productAttributeType.create({
                data: {
                    name,
                    productCategoryId: parseInt(productCategoryId),
                },
            });
            attributeTypeMap.set(key, newType.id);
        } else {
            attributeTypeMap.set(key, existingType.id);
        }
    }
    console.log(newProducts);
    console.log(attributeTypesSet);
    console.log(attributeTypeMap);
    // Step 3: Create Products and their associated ProductItems and AttributeValues
    for (const productData of newProducts) {
        // Create Product
        const product = await Prisma.product.upsert({
            where: {
                sku: productData.sku,
            },
            create: {
                name: productData.name,
                description: productData.description,
                imageUrl: productData.imageUrl,
                categoryId: productData.categoryId,
                isAvailable: productData.isAvailable,
                sku: productData.sku,
                minQty: productData.minQty,
                ogPrice: productData.ogPrice,
                price: productData.price,
                createdAt: new Date(productData.createdAt),
                updatedAt: new Date(productData.updatedAt),
            },
            update: {
                name: productData.name,
                description: productData.description,
                imageUrl: productData.imageUrl,
                categoryId: productData.categoryId,
                isAvailable: productData.isAvailable,
                sku: productData.sku,
                minQty: productData.minQty,
                ogPrice: productData.ogPrice,
                price: productData.price,
                createdAt: new Date(productData.createdAt),
                updatedAt: new Date(productData.updatedAt),
            },
        });

        // Create ProductItems for the Product
        for (const itemData of productData.productItems) {
            const productItem = await Prisma.productItem.create({
                data: {
                    sku: itemData.sku,
                    minQty: itemData.minQty,
                    ogPrice: itemData.ogPrice,
                    price: itemData.price,
                    imageUrl: itemData.imageUrl,
                    isAvailable: itemData.isAvailable,
                    productId: product.id,
                    createdAt: new Date(itemData.createdAt),
                    updatedAt: new Date(itemData.updatedAt),
                },
            });

            // Create ProductAttributeValues for the ProductItem
            for (const attrData of itemData.productAttributeOptions) {
                const type = attrData.productAttributeType;
                const key = `${type.name}-${type.productCategoryId}`;
                const attributeTypeId = attributeTypeMap.get(key);

                if (!attributeTypeId) {
                    console.error(`Attribute type not found: ${key}`);
                    continue;
                }

                await Prisma.productAttributeValue.upsert({
                    where: {
                        productAttributeTypeId_productAttributeValue: {
                            productAttributeTypeId: attributeTypeId,
                            productAttributeValue:
                                attrData.productAttributeValue,
                        },
                    },
                    create: {
                        productAttributeValue: attrData.productAttributeValue,
                        productAttributeTypeId: attributeTypeId,
                        productItems: {
                            connect: { id: productItem.id },
                        },
                    },
                    update: {
                        // Ensure product item is connected to the existing value
                        productItems: {
                            connect: { id: productItem.id },
                        },
                    },
                });
            }
        }
    }
}
