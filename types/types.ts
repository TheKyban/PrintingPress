import {
    address,
    city,
    country,
    customer,
    CUSTOMER_CATEGORY,
    state,
} from "@prisma/client";

export type customerWithAddress = customer & {
    address?: address & {
        city?: city & {
            state?: state & {
                country: country;
            };
        };
    };
};

export interface QueryParams {
    page?: number;
    perpage?: number;
    search?: string;
    category?: "all" | CUSTOMER_CATEGORY;
    status?: banStatus | "all";
    sortby?: string;
    sortorder?: sortType;
}

export type banStatus = "true" | "false";
export type sortType = "asc" | "desc";
