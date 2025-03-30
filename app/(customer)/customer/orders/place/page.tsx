import CheckoutPage from "@/components/order/placeOrder";
import { auth } from "@/lib/auth";
import { getPriceAccordingToCategoryOfCustomer } from "@/lib/getPriceOfProductItem";
import { ProductItemType } from "@/types/types";
import { productAttributeValue } from "@prisma/client";
import { redirect } from "next/navigation";
import { Prisma } from "@/lib/prisma";
import Button from "./components/button";

export default async function PlaceOrderPage({
    searchParams,
}: {
    searchParams: Promise<{ productItemId: string; qty: string }>;
}) {
    try {
        const params = await searchParams;
        const session = await auth();
        const customerCategory =
            session?.user?.customer?.customerCategory || "LOW";

        if (!session) return redirect("/");

        if (
            !params?.productItemId ||
            !params?.qty ||
            isNaN(parseInt(params?.productItemId)) ||
            isNaN(parseInt(params?.qty))
        ) {
            return redirect("/customer/products");
        }

        const productItem = await Prisma?.productItem.findUnique({
            where: {
                id: parseInt(params?.productItemId),
            },
            include: {
                productAttributeOptions: true,
                product: {
                    select: {
                        name: true,
                        categoryId: true,
                        description: true,
                        imageUrl: true,
                    },
                },
            },
        });

        if (!productItem) {
            return (
                <div className="min-h-[80vh] flex items-center justify-center">
                    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-red-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Product Not Found
                            </h2>
                            <p className="text-gray-600 mb-6">
                                The product you&apos;re looking for doesn&apos;t
                                exist or has been removed.
                            </p>
                            <Button />
                        </div>
                    </div>
                </div>
            );
        }

        const transformedProductItem: ProductItemType & {
            productAttributeOptions: productAttributeValue[];
            product: {
                name: string;
                categoryId: number;
                description: string;
                imageUrl: string[];
            };
            price: number;
            qty: number;
        } = {
            id: productItem.id,
            productId: productItem.productId,
            imageUrl: productItem.imageUrl,
            isAvailable: productItem.isAvailable,
            minQty: productItem.minQty,
            productAttributeOptions: productItem.productAttributeOptions,
            sku: productItem.sku,
            createdAt: productItem.createdAt,
            updatedAt: productItem.updatedAt,
            price: getPriceAccordingToCategoryOfCustomer(customerCategory, {
                avgPrice: productItem.avgPrice,
                maxPrice: productItem.maxPrice,
                minPrice: productItem.minPrice,
            }),
            product: productItem.product,
            qty: parseInt(params.qty),
        };

        return (
            <div className="container mx-auto px-4 py-8 md:py-12 min-h-[80vh] bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900">
                        Complete Your{" "}
                        <span className="text-blue-600">Premium</span> Order
                    </h1>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2 rounded-2xl shadow-lg">
                        <CheckoutPage product={transformedProductItem} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-6">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Something Went Wrong
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {error instanceof Error
                                ? error.message
                                : "An error occurred while processing your request."}
                        </p>
                        <Button />
                    </div>
                </div>
            </div>
        );
    }
}
