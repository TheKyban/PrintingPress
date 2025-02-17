import { customerWithAddress } from "@/types/types";
import {
    product,
    productAttributeType,
    productCategory,
    staff,
} from "@prisma/client";
import { create } from "zustand";

type ModalType =
    | "staffEdit"
    | "staffDelete"
    | "addStaff"
    | "editCustomer"
    | "viewCustomer"
    | "customerDelete"
    | "createProductCategory"
    | "editProductCategory"
    | "deleteProductCategory"
    | "addNewproduct"
    | "editProduct"
    | "deleteProduct"
    | "addAttribute"
    | "addAttributeValue";

type DataType = {
    staff?: staff;
    customer?: customerWithAddress;
    page?: string;
    searchParameter?: string;
    productCategory?: productCategory;
    product?: product;
    productCategoryId?: number;
    productAttribute?: productAttributeType;
};

interface modalStore {
    modal: ModalType | null;
    data: DataType;
    isOpen: boolean;

    onOpen: (type: ModalType, data: DataType) => void;
    onClose: () => void;
}

export const useModal = create<modalStore>((set) => ({
    modal: null,
    data: {},
    isOpen: false,

    onOpen: (modal, data) => set(() => ({ modal, data, isOpen: true })),
    onClose: () => set(() => ({ modal: null, isOpen: false })),
}));
