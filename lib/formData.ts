import { z } from "zod";

export function createFormData<
    T extends Record<string, string | number | File | boolean>,
>(values: T): FormData {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
        const value = values[key as keyof T];
        if (value !== undefined) {
            formData.append(key, value as string | Blob);
        }
    });
    return formData;
}

// eslint-disable-next-line
export const parseFormData = <T extends z.ZodType<any, any>>(
    formData: FormData,
    schema: T,
): z.SafeParseReturnType<z.infer<T>, z.infer<T>> => {
    const parsedData = Object.fromEntries(
        Array.from(formData.entries()).map(([k, v]) => {
            if (typeof v === "string") {
                if (v === "true") return [k, true];
                if (v === "false") return [k, false];
            }
            return [k, v];
        }),
    );
    return schema.safeParse(parsedData);
};

// eslint-disable-next-line
export const parsePartialFormData = <T extends z.ZodObject<any>>(
    formData: FormData,
    schema: T,
): z.SafeParseReturnType<Partial<z.infer<T>>, Partial<z.infer<T>>> => {
    const parsedData = Object.fromEntries(
        Array.from(formData.entries()).map(([k, v]) => {
            if (typeof v === "string") {
                if (v === "true") return [k, true];
                if (v === "false") return [k, false];
            }
            return [k, v];
        }),
    );

    return schema.partial().safeParse(parsedData);
};
