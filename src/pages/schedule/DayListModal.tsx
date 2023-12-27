import IsLoading from '@/components/elementTag/isLoading';
import { ModalJustification } from '@/components/pages/schedule/modalJustification';
import { StatusSchedule, StatusType } from '@/enum/status_type.enum';
import { TypeUser } from '@/enum/typeUser.enum';
import { useDisclosure } from '@/hook/useDisclosure';
import api from '@/service/api';
import { getUppercaseFirstLetter, isEqualArray } from '@/util/util';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlinePlus } from 'react-icons/ai';
import { BsChatSquareText } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { toast } from 'react-toastify';
import { TreatmentToday } from '.';

type ScheduleModalProps = {
    openDayList: boolean;
    setOpenDayList: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cancelButtonRefDayList: React.MutableRefObject<HTMLButtonElement | null>;
    date: dayjs.Dayjs;
};

export default function DayListModal({ openDayList, setOpenDayList, setOpen, cancelButtonRefDayList, date }: ScheduleModalProps): JSX.Element {  
    const {data:session } = useSession(); 
    const router = useRouter();
    const [eventsForDay, setEventsForDaya] = useState<TreatmentToday[]>([]);
    const { control, reset } = useForm();
    const justificationDisposer = useDisclosure();
    const [idJustification, setIdJustification] = useState<string>("");
    const { fields, update } = useFieldArray({ control, name: 'consultas', keyName: 'consultas.id' });
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean[]>([]);

    useEffect(() => {
        if(openDayList) {
            reset({
                consultas: eventsForDay
            });
            setIsOpen(eventsForDay.map(() => false));
            loadEventsForDay();
        }
    }, [date]);

     const loadEventsForDay = async () => {
        const param = {
            day: date.toISOString()
        };

        setIsLoading(true);
        try {
             const { data:RespAPI } = await api.get("api/treatment/schedule/day", {
                params: param
            });
            setEventsForDaya(RespAPI);
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    const onSave = async () => {
        try {
            const bodyArray = fields.filter((x:any)=>x.status !== StatusSchedule['em atendimento']).map((item:any) => ({
                id: item.id,
                status: item.status,
            }));
            await api.put('api/treatment/consult-changeStatus', bodyArray);
            toast.success('Alteração salva com sucesso!');
            loadEventsForDay();
        } catch (error:any) {
            if(error instanceof Error) toast.error(error.message);
            if(error?.response?.data?.message) toast.error(error.response.data.message)     
            else toast.error('Ocorreu um erro ao salvar a consulta. Tente novamente mais tarde.'); 
        }
    }

    const handleChangeIsOpen = (index: number, newItem: boolean) => {
        setIsOpen((prevItems) => {
          return [
            ...prevItems.slice(0, index),
            newItem,
            ...prevItems.slice(index + 1),
          ];
        });
    };

    useEffect(() => {
        if(eventsForDay.length > 0 && fields.length > 0) 
            if(!isEqualArray(eventsForDay, fields)) onSave();
    }, [fields]);

    function justificationItem(id: string) {
        setIdJustification(id);
        justificationDisposer.open();
    }

    function onClose() {
        setOpenDayList(false);
        setEventsForDaya([]);
    }
    return (
        <Transition.Root show={openDayList||false} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRefDayList} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>
    
                <div className="fixed inset-0 z-10 w-screen overflow-y-scroll">
                    <div className="flex min-h-full items-center justify-center p-4 text-center md:items-center md:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                            enterTo="opacity-100 translate-y-0 md:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 md:scale-100"
                            leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow transition-all md:mx-4 md:my-8 w-full md:max-w-4xl">
                        <ModalJustification 
                            isOpen={justificationDisposer.isOpen} 
                            onClose={justificationDisposer.close}
                            idJustification={idJustification}
                            message={eventsForDay.find((item) => item.id === idJustification)?.justificationFault}
                        /> 
                            <div className="bg-white dark:bg-gray-800 md:p-6">
                            <div className="flex flex-row justify-between items-center w-full py-3 md:py-0 px-4 ">
                                    <div className="flex flex-row justify-start items-center w-3/4">
                                        <div className="flex items-center justify-center rounded-full bg-teal-200 dark:bg-teal-400 h-10 w-10">
                                            <AiOutlinePlus className="text-xl text-teal-500 dark:text-teal-700"/>
                                        </div>
                                        <div className="ml-3 text-center">
                                            <Dialog.Title as="h3" className="text-base text-gray-900 dark:text-white">
                                                Listagem de Consulta
                                            </Dialog.Title>
                                        </div>
                                    </div>
                                    <div className="md:hidden text-base text-gray-900 dark:text-white w-auto">{eventsForDay?.length > 0 && dayjs(eventsForDay[0].dateScheduled, "YYYY-MM-DDTHH:mm:ss.SSSZ").format('DD/MM/YYYY')}</div>
                                    <div className="hidden md:flex text-base text-gray-900 dark:text-white w-auto">{eventsForDay?.length > 0 && dayjs(eventsForDay[0].dateScheduled, "YYYY-MM-DDTHH:mm:ss.SSSZ").format('DD/MM/YYYY')}</div>
                                </div>

                                <div className="grid grid-cols-5 md:grid-cols-6 mt-4 md:ml-4 p-2 rounded-t-lg shadow bg-gray-50 py-2 dark:bg-slate-700">
                                    <p className="col-span-3 md:col-span-1 mt-0 pl-3 md:pl-0 flex justify-start items-center dark:text-white text-gray-500 text-xs leading-5 font-medium">
                                        NOME
                                    </p>
                                    <p className="hidden md:col-span-1 mt-0 md:flex justify-start items-center dark:text-white text-gray-500 text-xs leading-5 font-medium">
                                        SERVIÇO
                                    </p>
                                    <p className="col-span-2 md:col-span-1 mt-0 flex justify-start items-center dark:text-white text-gray-500 text-xs leading-5 font-medium">
                                        HORÁRIO
                                    </p>
                                    <p className="hidden md:col-span-2 mt-0 md:flex justify-start items-center dark:text-white text-gray-500 text-xs leading-5 font-medium">
                                        STATUS
                                    </p>
                                </div>

                                <div className="max-h-96 isolate overflow-hidden overflow-y-auto">
                                    <div className={`${!isLoading && "hidden"} my-8`}>
                                        <IsLoading
                                            isVisible={isLoading}
                                            textLoading={'Carregando...'}
                                            className='text-white'
                                        />
                                    </div>
                                    {isLoading === false && eventsForDay?.map((value: any, index) => {
                                        return (
                                            <>
                                                <div key={index} className="grid grid-cols-5 md:grid-cols-6 md:ml-4 py-1 px-3 border-b-2 dark:border-gray-600">
                                                    <div className="col-span-3 md:col-span-1 flex justify-start items-center dark:text-white text-gray-900 text-sm leading-5 h-16 font-medium">
                                                        {value.patient.name} {value.patient.lastName}
                                                    </div>
                                                    <div className="hidden md:col-span-1 md:flex justify-start items-center dark:text-white text-gray-500 text-sm leading-5 h-16 font-normal">
                                                        {value.service.name}
                                                    </div>
                                                    <div className="col-span-2 md:col-span-1 flex justify-around md:justify-start items-center dark:text-white text-gray-500 text-sm leading-5 h-16 font-normal">
                                                        {dayjs(value.dateScheduled).hour() + ":" + dayjs(value.dateScheduled).minute().toString().padStart(2, '0') + "h"}
                                                        <button className="md:hidden" onClick={() => handleChangeIsOpen(index, !isOpen[index])}>
                                                            <span>
                                                                {isOpen[index] ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                                                            </span>
                                                        </button>
                                                    </div>
                                                    <div className="hidden md:col-span-2 md:flex justify-between my-3">
                                                        <select 
                                                            value={value.status}
                                                            onChange={(e)=>update(index, { ...value, status: e.target.value })}
                                                            className="w-full cursor-text rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 text-sm"
                                                            placeholder="Não definido"
                                                            disabled={isLoading}
                                                            onClick={(e)=>e.stopPropagation()}
                                                        >
                                                            <option value="" selected disabled>Não definido</option>
                                                            {Object.keys(StatusSchedule).map((item: any ) => (
                                                                <option key={item} value={item}>{getUppercaseFirstLetter(item)}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="hidden md:col-span-1 md:flex justify-evenly my-3 aria-hidden:hidden"
                                                        aria-hidden={value.status !== StatusType.absent && ![TypeUser.Aluno, TypeUser.Professor, TypeUser.Coordenador].includes(session?.user.typeUser)}
                                                    > 
                                                        <button className="w-10 flex items-center justify-center dark:text-white border dark:border-gray-400 p-2 rounded-lg disabled:hidden"
                                                            onClick={() => justificationItem(value.id)}
                                                            disabled={value.status !== StatusType.absent}
                                                        >
                                                            
                                                            <BsChatSquareText className="text-teal-500 text-lg"/>
                                                        </button>
                                                        <button className="w-10 flex items-center justify-center dark:text-white border dark:border-gray-400 p-2 rounded-lg aria-hidden:hidden"
                                                            onClick={()=> router.push(`/schedule/report_patient/${value?.id}`)}
                                                            disabled={!value?.id || ![TypeUser.Aluno, TypeUser.Professor, TypeUser.Coordenador].includes(session?.user.typeUser) ||
                                                                ![StatusType.on_hold, StatusType.concluded, StatusType.in_process].includes(value.status)}
                                                            aria-hidden={![TypeUser.Aluno, TypeUser.Professor, TypeUser.Coordenador].includes(session?.user.typeUser)}
                                                        >
                                                            <AiOutlineEye className="w-5 h-5 text-teal-500"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                                <div className="px-4 py-3 flex justify-end md:px-6 dark:bg-gray-800 w-full">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white dark:bg-slate-700 px-3 py-2 text-sm text-gray-900 shadow hover:bg-gray-50 md:mt-0 md:w-auto"
                                        onClick={() => onClose()}
                                        ref={cancelButtonRefDayList}>
                                            <p className="dark:text-white">Voltar</p>
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-4 rounded-md bg-teal-500 dark:bg-teal-700 px-3 py-2 text-sm text-white shadow md:ml-3 md:w-auto"
                                        onClick={() => {setOpen(true), setOpenDayList(false)}}>  
                                        Adicionar consulta
                                    </button>
                                </div>
                            </div>
                        </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

{/* {isOpen[index] && 
    <>
        <div className="col-span-6 grid grid-cols-2">
            <div className="col-span-2">
                <label className="pl-4 dark:text-white text-gray-500 text-xs leading-5 font-medium">STATUS</label>
                <select
                    value={value.status}
                    onChange={(e) => update(index, { ...value, status: e.target.value })}
                    className="w-full col-span-2 cursor-text rounded-lg px-4 py-2 dark:bg-slate-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 text-sm"
                    placeholder="Não definido"
                    disabled={isLoading}
                >
                    <option value="" selected disabled>Não definido</option>
                    {Object.keys(StatusSchedule).map((item: any ) => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                </select>
            </div>   
            <div className="col-span-3 mt-3 mb-2 flex justify-between items-center aria-hidden:hidden"
                aria-hidden={value.status !== StatusSchedule.faltou && ![TypeUser.Aluno, TypeUser.Professor, TypeUser.Coordenador].includes(session?.user.typeUser)}
            >
                <div className="dark:text-white text-gray-500 text-sm leading-5 font-medium">Procedimento: {value.service.name}</div>
                <div className="flex flex-row gap-x-4">
                    <button className="w-10 flex items-center justify-center dark:text-white border dark:border-gray-400 p-2 rounded-lg disabled:hidden"
                        disabled={value.status !== StatusSchedule.faltou}
                    >
                        <BsChatSquareText className="text-teal-500 text-lg" />
                    </button>
                    <button className="w-10 flex items-center justify-center dark:text-white border dark:border-gray-400 p-2 rounded-lg aria-hidden:hidden"
                        onClick={()=> router.push(`/schedule/edit/${value?.id}`)}
                        disabled={!value?.id && ![TypeUser.Aluno, TypeUser.Professor, TypeUser.Coordenador].includes(session?.user.typeUser) && 
                            ![StatusSchedule['em espera'],StatusSchedule.concluído, StatusSchedule['em atendimento']].includes(value.status)}
                        aria-hidden={![TypeUser.Aluno, TypeUser.Professor, TypeUser.Coordenador].includes(session?.user.typeUser)}
                    >
                        <AiOutlineEye className="w-5 h-5 text-teal-500"/>
                    </button>
                </div>
                
            </div>
        </div>
    </>
} */}