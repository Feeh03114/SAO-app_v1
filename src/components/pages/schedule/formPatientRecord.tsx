import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import { PatientRecord } from "@/pages/schedule/report_patient/[id]";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { HiOutlineInboxIn } from "react-icons/hi";
import * as yup from 'yup';

const validationFullModal = yup.object().shape({
    id: yup.string().optional(),
    complaint_text: yup.string().required('Campo obrigatório'),
    serviceForwardedId: yup.string().required('Campo obrigatório'),
    occurrenceConsultation: yup.string().required('Campo obrigatório'),
    medicaRecord: yup.string().optional(),
    name: yup.string().optional(),
    discipline: yup.string().optional(),
    email: yup.string().optional(),
    phoneNumber: yup.string().optional(),
    date: yup.string().optional(),
    time: yup.string().optional(),
    service: yup.string().optional(),
    price: yup.string().optional(),
    phone: yup.string().optional(),
    service_id: yup.string().optional(),
});

const treatment_idMock = [
    'Exemplo 1',
    'Exemplo 2',
    'Exemplo 3',
    'Exemplo 4',
    'Exemplo 5',
    'Exemplo 6',
    'Exemplo 7',
]

interface FormProfileProps {
    edit?: PatientRecord;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}

export default function FormPatientRecord({edit, isPermissionWrite=true, onSave}:FormProfileProps): JSX.Element {
    const { reset, control, register,watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFullModal)
    });

    const loadingPages = async () =>{
        try {
            console.log(edit);
            if(edit)reset(edit)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadingPages();
    }, [edit]);

    const onSavePatientSchedule = async (data:any) => {
        console.log(data);
        onSave(data);
        // delete data.guardian;

        // const patient = {
        //     stats: "Ativo",
        //     people: data,
        // } as PatientRecord;

        // console.log(patient);
        // onSave(patient);
    }
    
    return (
        <div className="gap-y-3 md:gap-y-6 md:mx-10 md:mb-10 px-3 md:pt-6 pb-6 flex items-center justify-centers flex-row flex-wrap md:border border-slate-200 dark:border-slate-500 dark:bg-slate-800 shadow-sm rounded-lg">
            <div className="gap-y-3 md:gap-y-6 flex items-center justify-centers flex-row flex-wrap">
                <div className="w-full md:w-1/4 mt-6 md:mt-0 flex flex-row justify-center items-center">
                    <div className="flex mx-2 items-center justify-center rounded-full bg-teal-200 dark:bg-teal-400 w-16 h-16">
                        <BsPerson className="w-8 h-8"/>
                    </div>
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="discipline"
                        type="text"
                        label="Disciplina"
                        value={watch('discipline')|| ''}
                        className="bg-slate-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="email"
                        type="text"
                        label="E-mail"
                        value={watch('email') || ''}
                        className="bg-slate-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="phone"
                        type="text"
                        label="Telefone"
                        value={watch('phone') || ''}
                        className="bg-slate-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="date"
                        type="text"
                        label="Data de agenda"
                        value={watch('date') || ''}
                        className="bg-slate-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="time"
                        type="text"
                        label="Horário"
                        value={watch('time') || ''}
                        className="bg-slate-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="service"
                        type="text"
                        label="Serviço"
                        placeholder={watch('service')|| ''}
                        className="bg-slate-200 cursor-default"
                        readOnly={true}
                    />
                </div>
                <div className="w-full md:w-1/4 px-2">
                    <Input 
                        id="price"
                        type="text"
                        label="Serviço"
                        placeholder={(Number(watch('price')|| '0').toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })) || ''}
                        className="bg-slate-200 cursor-default"
                        readOnly={true}
                    />
                </div>

                <form id='formPatientRecord' onSubmit={handleSubmit(onSavePatientSchedule)} className="w-full gap-y-3 md:gap-y-6 flex items-center justify-centers flex-row flex-wrap">
                    <div className="w-full px-2">
                        <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Queixa</label>
                        <textarea 
                            id="name"
                            className="w-full h-24 text-sm rounded-lg px-4 py-2 dark:text-white shadow border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none"
                            autoComplete="new-password"
                            {...register("complaint_text")}
                            readOnly
                        />
                    </div>

                    <div className="w-full mt-4">
                        <div className="w-full mx-4 flex flex-col md:flex-row md:items-end justify-between">
                            <label className="pl-4 text-sm font-medium leading-tight text-slate-700 dark:text-white">Relatório da consulta</label>
                            <div className="mr-1 mb-2 flex flex-row items-center justify-end">
                                <div className="w-full pl-0 px-3 md:px-2">
                                    <Select
                                        name="serviceForwardedId"
                                        placeHolder={"Selecione o treatment_id"}
                                        valueDefault={-1}
                                        valueTypeName={true}
                                        data={
                                            treatment_idMock.map((item, index) => ({
                                                id: index,
                                                name: item,
                                            }))
                                        }
                                        control={control}
                                        error={errors.serviceForwardedId}
                                        disabled={!isPermissionWrite}
                                    />
                                </div>
                                <div className="w-full mr-4 px-2">
                                    <Select
                                        name="service_id"
                                        placeHolder={"Selecione o serviço odontológico"}
                                        valueDefault={-1}
                                        valueTypeName={true}
                                        data={
                                            treatment_idMock.map((item, index) => ({
                                                id: index,
                                                name: item,
                                            }))
                                        }
                                        control={control}
                                        error={errors.service_id}
                                        disabled={!isPermissionWrite}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-3">
                            <textarea 
                                id="observation"
                                className="w-full h-40 text-sm rounded-lg px-4 py-2 dark:text-white shadow border border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none"
                                placeholder="Descreva o que aconteceu com o paciente"
                                disabled={!isPermissionWrite}
                                {...register("occurrenceConsultation")}
                            />
                            {!!errors.occurrenceConsultation && (
                                <p className="text-red-500 text-sm">{errors.occurrenceConsultation.message?.toString()}</p>
                            )}
                        </div>
                    </div>

                    <div className="w-full mb-3 md:mb-6 px-3  items-center justify-centers flex-col flex-wrap hidden">
                        <div className="w-full pl-4 inline-flex items-center justify-start">
                            <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-slate-700 dark:text-white truncate">Documentos</p>
                        </div>
                        <div className="w-full h-40 px-4 flex items-center justify-center shadow-sm border rounded-lg border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-700 focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none">
                            <HiOutlineInboxIn className="w-28 h-28 text-slate-300 dark:text-slate-500"/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();