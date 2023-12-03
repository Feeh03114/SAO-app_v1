import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import Modal from "@/components/modal";
import { DaysWeek } from "@/enum/daysWeek.enum";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import * as yup from 'yup';

export const validationAvailabilities = yup.object().shape({
    day: yup.number().required('Campo obrigatório'),
    start: yup.string().required('Campo obrigatório'),
    end: yup.string().required('Campo obrigatório'),
});

interface ModalServiceDisciplineProps{
    isOpen: boolean;
    onClose: () => void;
    onSave:(data:any)=>void;
    edit?:  any;
}

export default function FormAvailabilities({isOpen, onClose, onSave, edit = {} } : ModalServiceDisciplineProps): JSX.Element {
    const { control, register, reset, handleSubmit, formState: { errors }  } = useForm({
        resolver: yupResolver(validationAvailabilities)
    });
    const daysWeek = Object.values(DaysWeek);

    const updateHandleSubmit = async (data:any) => {
        const newData = { ...data };
        newData.start = newData.start.charAt(0) === '0' ? newData.start.slice(1) : newData.start;
        newData.end = newData.end.charAt(0) === '0' ? newData.end.slice(1) : newData.end;

        console.log(newData.day);
        console.log(daysWeek[newData.day]);

        onClose();
        onSave(newData);
    } 

    useEffect(() => {
        if (!isOpen) 
            reset({
                day: 0,
                start: '',
                end: '',
            });
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
                        <Select
                            label="Selecione o dia da semana"
                            name="day"
                            placeHolder={"Selecione o dia da semana"}
                            valueDefault={-1}
                            data={
                                daysWeek.map((item, index) => ({
                                    id: index,
                                    name: item,
                                }))
                            }
                            control={control}
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
                        <div className="w-full md:w-1/2 mt-4 md:mt-0">
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