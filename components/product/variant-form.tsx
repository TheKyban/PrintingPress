"use client";

import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { productFormSchema } from "@/schemas/product-schema";

interface VariantFormProps {
    form: UseFormReturn<z.infer<typeof productFormSchema>>;
    index: number;
}

export function VariantForm({ form, index }: VariantFormProps) {
    return (
        <div className="grid grid-cols-2 gap-4 mt-4">
            <FormField
                control={form.control}
                name={`product_items.${index}.product_code`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Product Code</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`product_items.${index}.min_qty`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Minimum Quantity</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`product_items.${index}.min_price`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Minimum Price</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`product_items.${index}.avg_price`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Average Price</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name={`product_items.${index}.max_price`}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Maximum Price</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                    field.onChange(parseInt(e.target.value))
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
