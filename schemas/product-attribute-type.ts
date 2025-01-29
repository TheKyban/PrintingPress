import { z } from "zod";

export const ProductAttributeTypeSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    product_category_id: z.number(),
});
