"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    ShoppingCart,
    Heart,
    Share2,
    Package,
    Truck,
    Shield,
} from "lucide-react";
import EmblaCarousel from "@/components/ui/embla-carousel/js/EmblaCarousel";
import {
    ProductItemTypeOnlyWithPrice,
    ProductTypeOnlyWithPrice,
} from "@/types/types";
import getDistinctOptionsWithDetails from "@/components/product/getAttributeWithOptions";
import { useRouter } from "next/navigation";
import { getBaseVarient } from "@/components/product/getBaseVarient";
import Markdown from "react-markdown";

export default function ProductDetails({
    product,
}: {
    product: ProductTypeOnlyWithPrice & {
        productItems: ProductItemTypeOnlyWithPrice[];
    };
}) {
    const distinctAttributeWithOptions = getDistinctOptionsWithDetails(product);

    const [selectedAttributes, setSelectedAttributes] = useState<
        Record<number, number>
    >(getBaseVarient(distinctAttributeWithOptions));
    const [selectedVariant, setSelectedVariant] =
        useState<ProductItemTypeOnlyWithPrice | null>(null);
    const router = useRouter();
    const [qty, setQty] = useState<number>(product.minQty);

    const findVariant = useCallback(() => {
        return product.productItems.find((item) =>
            Object.entries(selectedAttributes).every(([typeId, valueId]) =>
                item.productAttributeOptions.some(
                    (opt) =>
                        opt.productAttributeType.id === parseInt(typeId) &&
                        opt.id === valueId,
                ),
            ),
        );
    }, [selectedAttributes, product]);

    useEffect(() => {
        const variant = findVariant();
        setSelectedVariant(variant || null);

        if (variant) setQty(Math.max(qty, variant.minQty));
    }, [selectedAttributes, findVariant, qty]);

    const handleAttributeChange = (typeId: number, valueId: number) => {
        setSelectedAttributes((prev) => ({ ...prev, [typeId]: valueId }));
    };

    const handleBuy = async () => {
        if (!selectedVariant) return;
        router.push(
            `/customer/orders/place?productItemId=${selectedVariant?.id}&qty=${Math.max(qty, selectedVariant?.minQty)}`,
        );
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Images Carousel */}
                <div className="space-y-4">
                    <EmblaCarousel slides={product.imageUrl} />
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{product.name}</h1>

                    <div className="space-y-4">
                        <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold">
                                ₹
                                {selectedVariant
                                    ? selectedVariant.price *
                                      (qty / selectedVariant?.minQty)
                                    : product.price}
                            </span>
                            <span className="text-xl text-muted-foreground line-through">
                                ₹
                                {selectedVariant
                                    ? selectedVariant.price
                                    : product.price}
                            </span>
                            <Badge className="bg-green-500">
                                {Math.round(
                                    (((selectedVariant?.price ||
                                        product.price) -
                                        (selectedVariant?.price ||
                                            product.price)) /
                                        (selectedVariant?.price ||
                                            product.price)) *
                                        100,
                                )}
                                % OFF
                            </Badge>
                        </div>

                        {distinctAttributeWithOptions.map((type) => (
                            <div key={type.id}>
                                <label className="text-sm font-medium mb-2 block">
                                    {type.name}
                                </label>
                                <Select
                                    value={selectedAttributes[
                                        type.id
                                    ]?.toString()}
                                    onValueChange={(value) =>
                                        handleAttributeChange(
                                            type.id,
                                            parseInt(value),
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue
                                            placeholder={`Select ${type.name}`}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {type?.productAttributeOptions?.map(
                                            (opt) => (
                                                <SelectItem
                                                    key={opt.id}
                                                    value={opt?.id?.toString()}
                                                >
                                                    {opt?.productAttributeValue}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}

                        <div>
                            <label className="text-sm font-medium mb-2 block">
                                Quantity
                            </label>
                            <Input
                                type="number"
                                min={selectedVariant?.minQty || product.minQty}
                                value={qty}
                                step={selectedVariant?.minQty || product.minQty}
                                onChange={(e) =>
                                    setQty(
                                        Math.max(
                                            parseInt(e.target.value) ||
                                                product.minQty,
                                            selectedVariant?.minQty ||
                                                product.minQty,
                                        ),
                                    )
                                }
                                className="w-32"
                            />
                            <p className="text-sm text-muted-foreground mt-1">
                                Minimum qty:{" "}
                                {selectedVariant?.minQty || product.minQty}
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <Button
                                size="lg"
                                className="flex-1"
                                onClick={handleBuy}
                                disabled={!selectedVariant}
                                variant={"redish"}
                            >
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                Buy Now
                            </Button>
                            <Button size="lg" variant="outline">
                                <Heart className="w-4 h-4 mr-2" />
                                Wishlist
                            </Button>
                            <Button size="lg" variant="outline">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Selected Options Summary */}
                    {selectedVariant && (
                        <Card className="p-4">
                            <h3 className="font-medium mb-2">
                                Selected Configuration
                            </h3>
                            <div className="space-y-1">
                                {selectedVariant.productAttributeOptions.map(
                                    (opt) => (
                                        <div
                                            key={opt.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-muted-foreground capitalize">
                                                {opt.productAttributeType.name}:
                                            </span>
                                            <span className="font-medium">
                                                {opt.productAttributeValue}
                                            </span>
                                        </div>
                                    ),
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        SKU:
                                    </span>
                                    <span className="font-medium">
                                        {selectedVariant.sku}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">
                                        QTY:
                                    </span>
                                    <span className="font-medium">{qty}</span>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Product Features */}
                    <Card className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3">
                                <Package className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-medium">
                                        Premium Quality
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        High-quality materials
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Truck className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-medium">
                                        Fast Delivery
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        3-5 business days
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Shield className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-medium">
                                        Satisfaction Guarantee
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        100% money back
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Markdown>{product.description}</Markdown>
                </div>
            </div>
        </div>
    );
}
