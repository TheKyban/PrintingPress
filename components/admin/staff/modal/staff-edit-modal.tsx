"use client";
import { EditStaffForm } from "@/components/admin/staff/form/staff-edit-form";
import { Modal } from "@/components/modal";
import { useModal } from "@/hooks/use-modal";

export function StaffEditModal() {
    const { isOpen, onClose, modal } = useModal();
    const open = isOpen && modal === "staffEdit";

    return (
        <Modal title="Edit Staff" isOpen={open} onClose={onClose}>
            <EditStaffForm />
        </Modal>
    );
}
