import { ClipboardList, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { getStatusColor } from "@/lib/getStatusColor";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { Card } from "../ui/card";
import { Session } from "next-auth";

export default async function RecentOrders({
    session,
}: {
    session?: Session | null;
}) {
    const orders = await prisma?.order.findMany({
        where: {
            customerId: session?.user?.customer?.id,
        },
        include: {
            productItem: {
                include: {
                    product: true,
                },
            },
        },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-[#660A27] dark:text-gray-100">
                Recent Orders
            </h1>

            {orders && orders?.length > 0 ? (
                <Card className="p-4 sm:p-6 shadow-md rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="w-full overflow-x-scroll">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow className="bg-gray-100 dark:bg-gray-700">
                                    <TableHead className="whitespace-nowrap ">
                                        Order ID
                                    </TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders?.map((order) => (
                                    <TableRow
                                        key={order.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900"
                                    >
                                        <TableCell className="font-medium">
                                            {order.id}
                                        </TableCell>
                                        <TableCell>
                                            {order?.productItem?.product?.name}
                                        </TableCell>
                                        <TableCell>{order?.qty}</TableCell>
                                        <TableCell>₹{order?.amount}</TableCell>
                                        <TableCell>
                                            {format(
                                                new Date(order?.createdAt),
                                                "dd/MM/yyyy",
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={cn(
                                                    getStatusColor(
                                                        order.status,
                                                    ),
                                                    "text-sm px-3 py-1 rounded-full hover:text-white",
                                                )}
                                            >
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >
                                                <Link
                                                    href={`/customer/orders/${order.id}`}
                                                >
                                                    <Eye className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </Card>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
                    <div className="bg-white p-6 rounded-full shadow-lg">
                        <ClipboardList className="w-16 h-16 text-gray-400" />
                    </div>

                    <h2 className="text-2xl font-semibold text-gray-800 mt-6">
                        No Orders Yet
                    </h2>
                    <p className="text-gray-600 mt-2 max-w-md">
                        You haven’t placed any orders yet. Once you do, they’ll
                        show up here.
                    </p>

                    <Link
                        href="/customer/categories"
                        className="mt-6 bg-dominant-color-2 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all"
                    >
                        Start Shopping
                    </Link>
                </div>
            )}
        </div>
    );
}
