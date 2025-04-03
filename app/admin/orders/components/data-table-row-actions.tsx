"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { orderType } from "@/types/types";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ViewFilesModal } from "./view-files-modal";
import { ImproperOrderModal } from "../modal/ImproperOrderModal";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const order = row.original as orderType;
    const file = order.attachment;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                {file && file?.urls?.length > 0 && (
                    <ViewFilesModal orderId={order.id} files={file.urls} />
                )}

                <ImproperOrderModal orderId={order.id} />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
