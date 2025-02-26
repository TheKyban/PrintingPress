import queryString from "query-string";
import axios from "axios";
import { z } from "zod";
import { customerFormSchema } from "@/schemas/customer.form.schema";
import { customerWithAddress, QueryParams } from "@/types/types";
import { customerBaseUrl } from "../urls";

export async function fetchCustomers(
    params: QueryParams = {},
): Promise<QueryParams & { customers: customerWithAddress[] }> {
    const url = queryString.stringifyUrl({
        url: customerBaseUrl,
        query: { ...params },
    });
    const { data } = await axios(url);
    return data;
}

export async function updateCustomer(
    id: number,
    data: Partial<z.infer<typeof customerFormSchema>>,
) {
    const url = `${customerBaseUrl}/${id}`;
    const { data: response } = await axios.patch(url, data);
    return response;
}

export async function createCustomer(data: z.infer<typeof customerFormSchema>) {
    const { data: response } = await axios.post(customerBaseUrl, data);
    return response;
}

export async function toggleCustomerBan(id: number) {
    const url = `${customerBaseUrl}/${id}/ban`;
    const { data } = await axios.post(url);
    return data;
}

export async function deleteCustomer(id: number) {
    const url = `${customerBaseUrl}/${id}`;
    const { data } = await axios.delete(url);
    return data;
}
