import Modal from "@/components/modal";
import api from "@/service/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { toast } from "react-toastify";
import * as yup from 'yup';

interface ModalDeleteProps{
    isOpen: boolean;
    onClose: () => void;
    message?: string;
    idJustification: string;
}

const validationModal = yup.object().shape({
    messagem: yup.string().required('Campo obrigatório'),
});

export function ModalJustification({ isOpen, onClose, idJustification, message }: ModalDeleteProps) {
    const { reset, register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationModal)
    });

    const onSave = async (data: any) => {
        try {
            const resp = await api.put(`api/treatment/consult-changeJustification/${idJustification}`, null,{
                params: data
            });
            toast.success(resp.data.message);
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(message && isOpen) reset({messagem: message}) 
        else reset({
            messagem: '',
        })
    }, [isOpen]);

    return(
        <form id='formJustfication' onSubmit={handleSubmit(onSave)}>
            <Modal.Root
                isOpen={isOpen}
                onClose={onClose}
                width="md:max-w-sm"
            >
                <Modal.Header 
                    title="Escreva a Justificativa" 
                    icon={HiOutlinePencilAlt} 
                    styleContainer={"mb-0"}
                    styleBgIcon="bg-teal-200 dark:bg-teal-400"
                    styleIcon="text-teal-600 dark:text-teal-700"
                />
                    <textarea 
                        id="messagem"
                        className="w-full h-40 mt-8 px-4 py-2 text-sm font-medium leading-tight truncate dark:text-white placeholder-gray-500 dark:placeholder-white shadow-sm border rounded-lg border-gray-300 dark:border-gray-500  dark:bg-slate-700 focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none"
                        placeholder="O que você precisa?"
                        {...register("messagem")}
                    />
                    {!!errors.messagem && (
                        <p className="text-red-500 text-sm">{errors.messagem?.message?.toString()}</p>
                    )}
                <Modal.Footer 
                    onClose={onClose}
                    isLoading={isSubmitting}
                    //textLoading="Enviando..."
                    text="Enviar"
                    style="bg-teal-500"
                    form="formJustfication"
                />
            </Modal.Root>
        </form>
    )
}