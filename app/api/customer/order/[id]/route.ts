import serverResponse from "@/lib/serverResponse";
import { Prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { deleteFiles } from "@/lib/storage";

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await auth();

        if (
            session?.user?.userType != "customer" ||
            session?.user?.customer?.isBanned ||
            !session?.user?.customer
        ) {
            return serverResponse({
                status: 401,
                success: false,
                error: "Unauthorized",
            });
        }
        const { id } = await params;
        if (!id || isNaN(parseInt(id))) {
            return serverResponse({
                status: 400,
                success: false,
                error: "Order ID is required.",
            });
        }

        const order = await Prisma.order.delete({
            where: { id: parseInt(id), customerId: session.user.customer.id },
            select: { attachment: true, id: true },
        });

        if (!order) {
            return serverResponse({
                status: 404,
                success: false,
                error: "Order not found!",
            });
        }

        if (order?.attachment) {
            const deleted = await deleteFiles(order?.attachment?.urls);
            console.log(
                deleted.length === order.attachment.urls.length
                    ? "File deleted"
                    : "Some file not deleted",
            );
        }

        return serverResponse({
            status: 200,
            success: true,
            message: "Order deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        return serverResponse({
            status: 500,
            success: false,
            error: error instanceof Error ? error.message : error,
        });
    }
}
