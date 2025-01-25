import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { customerFormSchema } from "@/schemas/customer-register-schema";

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    try {
        const customer = await prisma.customer.findUnique({
            where: { id: parseInt(params.id) },
            include: {
                address: {
                    include: {
                        city: {
                            include: {
                                state: true,
                            },
                        },
                    },
                },
            },
        });

        if (!customer) {
            return NextResponse.json(
                { error: "Customer not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(customer);
    } catch (error) {
        console.error("Error fetching customer:", error);
        return NextResponse.json(
            { error: "Failed to fetch customer" },
            { status: 500 },
        );
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const body = await request.json();
        const validatedData = customerFormSchema.partial().parse(body);
        const { id } = await params;
        const updateData: any = {};

        if (validatedData?.name) updateData.name = validatedData.name;
        if (validatedData?.business_name)
            updateData.business_name = validatedData.business_name;
        if (validatedData.email) updateData.email = validatedData.email;
        if (validatedData.phone) updateData.phone = validatedData.phone;
        if (validatedData.password)
            updateData.password = validatedData.password;
        if (validatedData.gst_number)
            updateData.gst_number = validatedData.gst_number;

        if (
            validatedData.line ||
            validatedData.pin_code ||
            validatedData.city ||
            validatedData.state ||
            validatedData.country
        ) {
            updateData.address = {
                update: {},
            };

            if (validatedData.line)
                updateData.address.update.line = validatedData.line;
            if (validatedData.pin_code)
                updateData.address.update.pin_code = validatedData.pin_code;

            if (validatedData?.city) {
                updateData.address.update.city = {
                    connect: { id: parseInt(validatedData.city) }, // Linking to an existing city
                };
            }

            if (validatedData?.state) {
                updateData.address.update.city = {
                    update: {
                        state: {
                            connect: { id: parseInt(validatedData.state) }, // Linking to an existing state
                        },
                    },
                };
            }

            if (validatedData?.country) {
                updateData.address.update.city = {
                    update: {
                        state: {
                            update: {
                                country: {
                                    connect: {
                                        id: parseInt(validatedData.country),
                                    }, // Linking to an existing country
                                },
                            },
                        },
                    },
                };
            }
        }

        const customer = await prisma.customer.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                address: {
                    include: {
                        city: {
                            include: {
                                state: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(customer);
    } catch (error) {
        console.error("Error updating customer:", error);
        return NextResponse.json(
            { error: "Failed to update customer" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        console.log(parseInt(id));

        await prisma.customer.delete({
            where: { id: parseInt(id) },
        });

        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error("Error deleting customer:", `${error}`);
        return NextResponse.json(
            { error: "Failed to delete customer" },
            { status: 500 },
        );
    }
}
