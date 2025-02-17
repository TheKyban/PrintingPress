import { z } from "zod";

// Schema for query parameters
export const QuerySchema = z.object({
    search: z.string().optional(),
    category: z.enum(["LOW", "MEDIUM", "HIGH", "all"]).optional(),
    categoryId: z.string().optional(),
    status: z.enum(["true", "false", "all"]).optional(),
    isAvailable: z.enum(["true", "false", "all"]).optional(),
    page: z.string().transform(Number).optional(),
    perpage: z.string().transform(Number).optional(),
    sortby: z.string().optional(),
    sortorder: z.enum(["asc", "desc"]).optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    minQty: z.number().optional(),
});
