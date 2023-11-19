import { Input } from "@/components/elementTag/input";
import Modal from "@/components/modal";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import * as yup from 'yup';

const validationAvailabilities = yup.object().shape({
    day: yup.number().required('Campo obrigatório'),
    start: yup.string().required('Campo obrigatório'),
    end: yup.string().required('Campo obrigatório'),
});

interface ModalServiceDisciplineProps{
    isOpen: boolean;
    onClose: () => void;
    onSave:(data:any)=>void;
    edit?:  typeof validationAvailabilities;
}

export default function FormAvailabilities({isOpen, onClose, onSave, edit = {} as  typeof validationAvailabilities} : ModalServiceDisciplineProps): JSX.Element {
    const { control, register, reset, handleSubmit, formState: { errors }  } = useForm({
        resolver: yupResolver(validationAvailabilities)
    });

    const updateHandleSubmit = async (data:any) => {
        const newData = { ...data };
        newData.start = newData.start.charAt(0) === '0' ? newData.start.slice(1) : newData.start;
        newData.end = newData.end.charAt(0) === '0' ? newData.end.slice(1) : newData.end;

        onClose();
        onSave(newData);
    } 

    useEffect(() => {
        if (!isOpen) 
            // reset({
            //     day: '',
            //     start: '',
            //     end: '',
            // });
        if(Object.keys(edit).length > 0)
            reset(edit)
    }, [isOpen]);

    return (
        <Modal.Root
            isOpen={isOpen}
            onClose={onClose}
            width="md:max-w-lg"
        >
            <Modal.Header title="Cadastrar Horário" icon={HiOutlinePlus} />
            <Modal.Body>
                <form id='formAvailabilities' className="w-full space-y-4 flex flex-wrap" onSubmit={handleSubmit(updateHandleSubmit)}>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Dia da Semana</label>
                        <Input 
                            id="day"
                            type="text"
                            className="w-full"
                            placeholder="Selecione o dia da semana"
                            {...register("day")}
                            error={errors.day}
                        />
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
                        <div className="w-full md:w-1/2">
                            <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Início do Expediente</label>
                            <Input 
                                id="start"
                                type="time"
                                className="w-full"
                                {...register("start")}
                                error={errors.start}
                            />
                        </div>
                        <div className="w-full md:w-1/2">
                            <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Fim do Expediente</label>
                            <Input 
                                id="end"
                                type="time"
                                className="w-full"
                                {...register("end")}
                                error={errors.end}
                            />
                        </div>
                    </div>
                    
                </form>
            </Modal.Body>
            <Modal.Footer
                onClose={onClose}
                form="formAvailabilities"
            />
        </Modal.Root>
    )     
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();