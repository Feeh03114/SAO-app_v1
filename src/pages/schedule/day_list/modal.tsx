import { ModalJustification } from '@/components/pages/schedule/modalJustification';
import { useDisclosure } from '@/hook/useDisclosure';
import api from '@/service/api';
import { isEqualArray } from '@/util/util';
import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { TreatmentToday } from '..';
import { ComponentDayList } from "./ComponententDayList";

type ScheduleModalProps = {
    openDayList: boolean;
    setOpenDayList: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cancelButtonRefDayList: React.MutableRefObject<HTMLButtonElement | null>;
    date: dayjs.Dayjs;
    onSave: () => void;
    fields: Record<"consultas.id", string>[];
};

export default function DayListModal({openDayList, setOpenDayList, setOpen, cancelButtonRefDayList, date, onSave, fields}: ScheduleModalProps): JSX.Element {  
    const [eventsForDay, setEventsForDaya] = useState<TreatmentToday[]>([]);
    const { control, reset } = useForm();
    const justificationDisposer = useDisclosure();
    const [idJustification, setIdJustification] = useState<string>("");
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
            <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRefDayList} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" />
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
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 text-left shadow transition-all md:mx-4 md:my-8 w-full md:max-w-4xl">
                            <ModalJustification 
                                isOpen={justificationDisposer.isOpen} 
                                onClose={justificationDisposer.close}
                                idJustification={idJustification}
                                message={eventsForDay.find((item) => item.id === idJustification)?.justificationFault}
                            /> 
                                <div className="bg-white dark:bg-slate-800 md:p-6">
                                    <div className="flex flex-row justify-between items-center w-full py-3 md:py-0 px-4 ">
                                        <div className="flex flex-row justify-start items-center w-3/4">
                                            <div className="flex items-center justify-center rounded-full bg-teal-200 dark:bg-teal-400 h-10 w-10">
                                                <AiOutlinePlus className="text-xl text-teal-500 dark:text-teal-700"/>
                                            </div>
                                            <div className="ml-3 text-center">
                                                <Dialog.Title as="h3" className="text-base text-slate-900 dark:text-white">
                                                    Listagem de Consulta
                                                </Dialog.Title>
                                            </div>
                                        </div>
                                        <div className="text-base text-slate-900 dark:text-white w-auto">{eventsForDay?.length > 0 && dayjs(eventsForDay[0].dateScheduled, "YYYY-MM-DDTHH:mm:ss.SSSZ").format('DD/MM/YYYY')}</div>
                                    </div>

                                    <ComponentDayList isOpen={isOpen} setIsOpen={setIsOpen} isLoading={isLoading} eventsForDay={eventsForDay}/>
                                </div>
                                <div className="px-4 py-3 flex justify-end md:px-6 dark:bg-slate-800 w-full">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 shadow hover:bg-slate-50 md:mt-0 md:w-auto"
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
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}