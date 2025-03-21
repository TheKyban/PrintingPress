"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const formSchema = z.object({
    phone: z
        .string()
        .min(10, "Enter valid phone number")
        .regex(/^\d{1,10}$/, "Invalid phone number format. e.g., 1234567890."),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

const isDevelopment = process.env.NODE_ENV === "development";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: isDevelopment ? "1234567890" : "",
            password: isDevelopment ? "Abc1234@@" : "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setLoading(true);
            const result = await signIn("credentials", {
                phone: values.phone,
                password: values.password,
                userType: "customer",
                callbackUrl: "/categories",
                redirect: false,
            });
            if (result?.error) {
                toast.error("Invalid credentials");
                return;
            }

            router.push("/categories");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-[80vh] px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
                <h2 className="text-[#660A27] font-playfair text-2xl font-semibold">
                    Welcome Back
                </h2>
                <p className="text-gray-600">Login to continue</p>
                <Form {...form}>
                    <form
                        className="mt-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="1234567890"
                                            {...field}
                                            disabled={loading}
                                            className="w-full p-3 py-5 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A6192E]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="••••••"
                                            type="password"
                                            disabled={loading}
                                            className="w-full p-3 py-5 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A6192E]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#A6192E] text-white p-3 py-5 rounded-md text-lg font-semibold hover:bg-[#870F20] transition"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </Button>
                    </form>
                </Form>

                <p className="text-sm text-gray-600 mt-3">
                    Don&rsquo;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-[#A6192E] font-semibold"
                    >
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
