import { redirect } from "next/navigation";
import OrderDetailsPage from "@/components/order/orderPage";
import { Prisma } from "@/lib/prisma";

export default async function OrderPage({
    params,
}: {
    params: Promise<{
        id: string;
    }>;
}) {
    try {
        const { id } = await params;

        if (!id || isNaN(parseInt(id))) {
            return redirect("/customer/orders");
        }

        const order = await Prisma.order.findFirst({
            where: { id: parseInt(id) },
            include: {
                customer: {
                    select: {
                        address: {
                            select: {
                                line: true,
                                city: {
                                    select: {
                                        name: true,
                                        state: {
                                            select: {
                                                name: true,
                                                country: {
                                                    select: {
                                                        name: true,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                                pinCode: true,
                            },
                        },
                        businessName: true,
                        name: true,
                        phone: true,
                    },
                },
                productItem: {
                    include: {
                        product: true,
                    },
                },
                job: {
                    include: {
                        staff: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        tasks: {
                            include: {
                                taskType: true,
                                assignee: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                            },
                            orderBy: {
                                completedAt: "asc",
                            },
                        },
                    },
                },
                attachment: true,
                comments: {
                    include: {
                        staff: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        customer: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });

        if (!order) {
            return (
                <div>
                    <p>Not any order found</p>
                </div>
            );
        }

        return <OrderDetailsPage order={order} />;
    } catch (error) {
        console.error("Error loading order:", error);
        return (
            <div>
                <p>
                    Error{" "}
                    {error instanceof Error
                        ? error.message
                        : "While loading order"}
                </p>
            </div>
        );
    }
}
