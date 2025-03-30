import Image from "next/image";
import Link from "next/link";
import { FileText, ExternalLink, ReceiptText, Package } from "lucide-react";
import { sourceSerif4 } from "@/lib/font";
import { cn } from "@/lib/utils";
import { attachment, order, UPLOADVIA } from "@prisma/client";
import { InvoiceButton } from "./InvoiceButton";

interface ProductDetailsProps {
    order: order & {
        productItem: {
            productId: number;
            sku: string;
            product: {
                description: string;
                imageUrl: string[];
                name: string;
                category: {
                    name: string;
                    id: number;
                };
            };
        };
        customer: {
            address: {
                line?: string;
                city?: {
                    name?: string;
                    state?: {
                        name?: string;
                        country: {
                            name: string;
                        };
                    };
                };
                pinCode: string;
            } | null;
            businessName: string;
            name: string;
            phone: string;
        };
        attachment:
            | (attachment & {
                  id: number;
                  customerId: number | null;
                  createdAt: Date;
                  updatedAt: Date;
                  orderId: number;
                  uploadVia: UPLOADVIA;
                  urls: string[];
                  uploadedById: number | null;
              })
            | null;
    };
}

// Helper function to safely handle Decimal or number values
// eslint-disable-next-line
const formatTotalAmount = (value: any): string => {
    // Handle Date objects - should not be processed
    if (value instanceof Date) {
        console.error("Date object passed to formatTotalAmount");
        return "0.00";
    }

    if (value === null || value === undefined) return "0.00";

    try {
        // Handle Decimal objects (with toNumber method)
        if (
            typeof value === "object" &&
            value !== null &&
            typeof value.toNumber === "function"
        ) {
            return value.toNumber().toFixed(2);
        }

        // Handle regular numbers
        if (typeof value === "number") {
            return value.toFixed(2);
        }

        // Try parsing as number if it's a string
        if (typeof value === "string") {
            const parsed = parseFloat(value);
            return isNaN(parsed) ? "0.00" : parsed.toFixed(2);
        }

        return "0.00";
    } catch (e) {
        console.error("Error formatting amount:", e);
        return "0.00";
    }
};

export function ProductDetails({ order }: ProductDetailsProps) {
    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2
                        className={cn(
                            "text-lg font-semibold flex items-center text-gray-800",
                            sourceSerif4.className,
                        )}
                    >
                        <Package className="h-5 w-5 mr-2 text-primary/70" />
                        Product Details
                    </h2>
                    <InvoiceButton order={order} />
                </div>

                <div className="bg-gray-50 rounded-xl overflow-hidden p-4">
                    <div className="relative h-60 mb-4 rounded-lg overflow-hidden shadow-sm border border-gray-100 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Image
                            src={order?.productItem?.product?.imageUrl[0]}
                            alt={order?.productItem?.product?.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-500"
                        />
                    </div>

                    <h3
                        className={cn(
                            "font-medium text-lg mb-4 text-gray-800",
                            sourceSerif4.className,
                        )}
                    >
                        {order?.productItem?.product?.name}
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Quantity</span>
                            <span className="font-medium">
                                {order?.qty} units
                            </span>
                        </div>

                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">SKU</span>
                            <span className="font-medium text-gray-800">
                                {order?.productItem?.sku}
                            </span>
                        </div>

                        {/* Base Price */}
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">Base Price</span>
                            <span className="font-medium text-gray-800">
                                ₹{formatTotalAmount(order?.price)}
                            </span>
                        </div>

                        {/* IGST */}
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                            <span className="text-gray-600">IGST (18%)</span>
                            <span className="font-medium text-gray-800">
                                ₹
                                {(() => {
                                    const basePrice = order?.price || 0;
                                    const igstAmount = basePrice * 0.18;
                                    return formatTotalAmount(igstAmount);
                                })()}
                            </span>
                        </div>

                        {/* Upload Charge (if any) */}
                        {order?.uploadCharge && order?.uploadCharge > 0 && (
                            <div className="flex justify-between items-center pb-2">
                                <span className="text-gray-600">
                                    Upload Charge
                                </span>
                                <span className="font-medium text-gray-800">
                                    ₹{formatTotalAmount(order?.uploadCharge)}
                                </span>
                            </div>
                        )}

                        {/* Total Amount */}
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Total Amount</span>
                            <span className="text-lg font-semibold text-primary">
                                ₹{formatTotalAmount(order?.total)}
                            </span>
                        </div>
                    </div>
                </div>

                {order?.attachment && order?.attachment?.urls?.length > 0 && (
                    <div className="mt-6 bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                        <h4 className="font-medium mb-3 text-gray-800 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-primary" />
                            Attached Files
                        </h4>
                        <div className="space-y-2">
                            {order?.attachment?.urls.map((u, idx) => (
                                <Link
                                    key={idx}
                                    href={u}
                                    target="_blank"
                                    className="flex items-center p-2 bg-white rounded-md hover:bg-blue-50 transition-colors text-primary group"
                                >
                                    <ReceiptText className="h-4 w-4 mr-2" />
                                    <span className="flex-1 text-gray-700">
                                        Attachment {idx + 1}
                                    </span>
                                    <ExternalLink className="h-3.5 w-3.5 text-gray-400 group-hover:text-primary transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
