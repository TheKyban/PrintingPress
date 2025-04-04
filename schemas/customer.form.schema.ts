import { z } from "zod";

export const customerFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    businessName: z
        .string()
        .min(2, "Business name must be atleast 2 characters"),

    country: z.string({
        required_error: "Select country",
    }),
    state: z.string({
        required_error: "Select state",
    }),
    city: z.string({
        required_error: "Select city",
    }),
    pinCode: z
        .string({ required_error: "Enter pin code." })
        .min(6, "Enter valid pin code.")
        .max(6, "Enter valid pin code."),

    gstNumber: z.string().optional(),

    line: z
        .string({ required_error: "Enter address" })
        .min(4, "Enter valid address"),

    phone: z
        .string()
        .min(10, "Enter valid phone number")
        .regex(/^\d{1,10}$/, "Invalid phone number format. e.g., 1234567890."),
    email: z.string().email("Enter valid email address."),
    referenceId: z.string().optional(),

    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const changePasswordFormSchema = z
    .object({
        oldPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long."),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long."),
        confirmPassword: z
            .string()
            .min(8, "Password must be at least 8 characters long."),
    })
    .refine((data) => data.oldPassword !== data.password, {
        path: ["password"],
        message: "New password cannot be the same as the old password",
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });
