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
    dayWeek: yup.number().required('Campo obrigatório'),
    initHour: yup.string().required('Campo obrigatório'),
    endHour: yup.string().required('Campo obrigatório'),
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
        newData.initHour = newData.initHour.charAt(0) === '0' ? newData.initHour.slice(1) : newData.initHour;
        newData.endHour = newData.endHour.charAt(0) === '0' ? newData.endHour.slice(1) : newData.endHour;

        onClose();
        onSave(newData);
    } 

    useEffect(() => {
        if (!isOpen) 
            reset({
                dayWeek: 0,
                initHour: '',
                endHour: '',
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
                            required
                            label="Selecione o dia da semana"
                            name="dayWeek"
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
                            <Input
                                required
                                id="start"
                                type="time"
                                label="Início do Expediente"
                                className="w-full"
                                {...register("initHour")}
                                error={errors.initHour}
                            />
                        </div>
                        <div className="w-full md:w-1/2 mt-4 md:mt-0">
                            <Input
                                required
                                id="end"
                                type="time"
                                label="Fim do Expediente"
                                className="w-full"
                                {...register("endHour")}
                                error={errors.endHour}
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