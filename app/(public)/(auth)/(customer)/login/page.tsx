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
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { sourceSerif4 } from "@/lib/font";
import { Lock, Phone } from "lucide-react";

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
                callbackUrl: "/",
                redirect: false,
            });
            if (result?.error) {
                toast.error("Invalid credentials");
                return;
            }

            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4 py-16 bg-gradient-to-b from-white to-blue-50/30">
            <div className="relative">
                {/* Decorative elements */}
                <div className="absolute -top-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-primary"></div>
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-cyan-400 to-primary"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-10 rounded-xl shadow-lg w-[420px] max-w-full relative overflow-hidden border border-primary/5"
                >
                    {/* Background decorative pattern */}
                    <div className="absolute inset-0 bg-[url('/noise-pattern.png')] opacity-[0.02] mix-blend-overlay z-0"></div>

                    <div className="relative z-10">
                        <div className="flex justify-center mb-6">
                            <div className="h-1 w-16 bg-gradient-to-r from-primary to-cyan-400 rounded-full"></div>
                        </div>

                        <h2
                            className={cn(
                                "text-3xl font-bold mb-2 text-center",
                                sourceSerif4.className,
                            )}
                        >
                            Welcome <span className="text-primary">Back</span>
                        </h2>

                        <p className="text-gray-600 text-center mb-8">
                            Sign in to your account to continue
                        </p>

                        <Form {...form}>
                            <form
                                className="space-y-5"
                                onSubmit={form.handleSubmit(onSubmit)}
                            >
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <Input
                                                        placeholder="Enter your phone number"
                                                        {...field}
                                                        disabled={loading}
                                                        className="w-full pl-10 py-6 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-sm text-red-500 mt-1" />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                                                    <Input
                                                        {...field}
                                                        placeholder="Enter your password"
                                                        type="password"
                                                        disabled={loading}
                                                        className="w-full pl-10 py-6 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300"
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage className="text-sm text-red-500 mt-1" />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-600 text-white py-6 rounded-lg text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                                >
                                    {loading ? "Signing in..." : "Sign in"}
                                </Button>
                            </form>
                        </Form>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center relative z-10">
                        <p className="text-gray-600">
                            Don&rsquo;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-primary font-medium hover:underline transition-all"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
