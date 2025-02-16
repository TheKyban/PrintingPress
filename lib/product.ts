import { ProductVariantType } from "@/types/types";

export function compareVariants(
    oldVariant: ProductVariantType,
    newVariant: ProductVariantType,
): boolean {
    // Compare basic properties
    if (
        oldVariant.sku !== newVariant.sku ||
        oldVariant.minQty !== newVariant.minQty ||
        oldVariant.minPrice !== newVariant.minPrice ||
        oldVariant.avgPrice !== newVariant.avgPrice ||
        oldVariant.maxPrice !== newVariant.maxPrice ||
        oldVariant.ogPrice !== newVariant.ogPrice ||
        oldVariant.isAvailable !== newVariant.isAvailable ||
        oldVariant.imageUrl !== newVariant.imageUrl
    ) {
        return false;
    }

    // Compare product options
    if (
        oldVariant.productAttributeOptions.length !==
        newVariant.productAttributeOptions.length
    ) {
        return false;
    }

    // Sort options by attribute ID for consistent comparison
    const sortedOldOptions = [...oldVariant.productAttributeOptions].sort(
        (a, b) => a.productAttributeTypeId - b.productAttributeTypeId,
    );
    const sortedNewOptions = [...newVariant.productAttributeOptions].sort(
        (a, b) => a.productAttributeTypeId - b.productAttributeTypeId,
    );

    return sortedOldOptions.every((oldOption, index) => {
        const newOption = sortedNewOptions[index];
        return (
            oldOption.productAttributeTypeId ===
                newOption.productAttributeTypeId &&
            oldOption.productAttributeValue === newOption.productAttributeValue
        );
    });
}

export function processVariantChanges(
    existingVariants: ProductVariantType[],
    newVariants: ProductVariantType[],
) {
    const changes = {
        created: [] as ProductVariantType[],
        updated: [] as ProductVariantType[],
        deleted: [] as string[],
    };

    // Find created and updated variants
    newVariants.forEach((newVariant) => {
        const existingVariant = existingVariants.find(
            (ev) => ev?.sku === newVariant?.sku,
        );

        if (!existingVariant) {
            changes.created.push(newVariant);
        } else if (!compareVariants(existingVariant, newVariant)) {
            changes.updated.push(newVariant);
        }
    });

    // Find deleted variants
    existingVariants.forEach((existingVariant) => {
        const stillExists = newVariants.some(
            (nv) => nv.sku === existingVariant.sku,
        );
        if (!stillExists) {
            changes.deleted.push(existingVariant.sku);
        }
    });

    return changes;
}

export function extractAttributes(variants: ProductVariantType[]) {
    const uniqueAttributes = new Map();

    variants.forEach((variant) => {
        variant.productAttributeOptions.forEach((option) => {
            if (!uniqueAttributes.has(option.productAttributeTypeId)) {
                uniqueAttributes.set(option.productAttributeTypeId, {
                    id: option.productAttributeTypeId,
                    values: new Set(),
                });
            }
            uniqueAttributes
                .get(option.productAttributeTypeId)
                .values.add(option.productAttributeValue);
        });
    });

    return Array.from(uniqueAttributes.values()).map((attr) => ({
        id: attr.id,
        name: attr.name,
        values: Array.from(attr.values),
    }));
}
