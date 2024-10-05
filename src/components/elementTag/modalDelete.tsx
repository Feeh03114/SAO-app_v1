import Modal from "@/components/modal";
import { FiTrash2 } from "react-icons/fi";

interface ModalDeleteProps{
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export function ModalDelete({ isOpen, onClose, onDelete }: ModalDeleteProps) {
    return(
        <Modal.Root
            isOpen={isOpen}
            onClose={onClose}
            width="md:max-w-sm"
        >
            <Modal.Header 
                title="Tem certeza que deseja deletar?" 
                icon={FiTrash2} 
                styleContainer={"mb-0"}
                styleBgIcon="bg-red-200 dark:bg-red-400"
                styleIcon="text-red-600 dark:text-red-700"
            />
            <Modal.Footer 
                onClose={onClose}
                text={"Confirmar"}
                style={"bg-red-500"}
                onClick={onDelete}
            />
        </Modal.Root>
    )
}