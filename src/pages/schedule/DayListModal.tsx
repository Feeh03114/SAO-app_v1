import api from '@/service/api';
import { isEqualArray } from '@/util/util';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsChatSquareText } from 'react-icons/bs';
import { toast } from 'react-toastify';

type ScheduleModalProps = {
    openDayList: boolean;
    setOpenDayList: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cancelButtonRefDayList: React.MutableRefObject<HTMLButtonElement | null>;
    eventsForDay: any[];
};

const mock = [
    { id: 1, name: 'Concluído' },
    { id: 2, name: 'Aguardando' },
    { id: 3, name: 'Faltou' },
    { id: 4, name: 'Agendado' }
]

export default function DayListModal({ openDayList, setOpenDayList, setOpen, cancelButtonRefDayList, eventsForDay }: ScheduleModalProps): JSX.Element {   
    const { control, reset } = useForm();
    const { fields, update } = useFieldArray({ control, name: 'consultas' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(openDayList) reset({
            consultas: eventsForDay
        })
    }, [openDayList]);

    const onSave = async () => {
        setIsLoading(true);
        try {
            const resp = await api.post('/schedule', fields);
            console.log(fields)
            toast.success('Alteração salva com sucesso!');
        } catch (error) {
            if(error instanceof Error) toast.error(error.message);      
            else toast.error('Ocorreu um erro ao salvar a consulta. Tente novamente mais tarde.'); 
        }
        finally{
            setIsLoading(false);
        }
    }


    useEffect(() => {
        if(!isEqualArray(eventsForDay, fields)) onSave();
    }, [fields]);

    return (
        <Transition.Root show={openDayList} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRefDayList} onClose={setOpenDayList}>
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
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow transition-all sm:my-8 sm:w-full max-w-lg">
                            <div className="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="flex flex-row justify-between items-center w-full">
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
                                    <div className="text-base text-gray-900 dark:text-white w-1/4">{eventsForDay.length > 0 && eventsForDay[0].date.format('DD/MM/YYYY')}</div>
                                </div>

                                <div className="grid grid-cols-5 mt-4 ml-4 p-2 rounded-t-lg shadow bg-gray-50 py-2 dark:bg-gray-700">
                                    <p className="col-span-1 mt-0 flex justify-start items-center dark:text-white">NOME</p>
                                    <p className="col-span-1 mt-0 flex justify-start items-center dark:text-white">SERVIÇO</p>
                                    <p className="col-span-1 mt-0 flex justify-start items-center dark:text-white">HORÁRIO</p>
                                    <p className="col-span-1 mt-0 flex justify-start items-center dark:text-white">STATUS</p>
                                    <p className="col-span-1 mt-0 flex justify-start items-center dark:text-white"></p>
                                </div>

                                <div className="max-h-96 isolate overflow-hidden overflow-y-auto">
                                    {fields.map((value: any, index) => { 
                                        return (
                                            <div className="grid grid-cols-5 ml-4 p-2 border-b-2 dark:border-gray-500">
                                                <div className="col-span-1 flex justify-start items-center dark:text-white">{value.name}</div>
                                                <div className="col-span-1 flex justify-start items-center dark:text-white">{value.service}</div>
                                                <div className="col-span-1 flex justify-start items-center dark:text-white">{value.date.format('h:mm')}</div>
                                                <div className="col-span-2 flex justify-between">
                                                    <select 
                                                        value={value.status}
                                                        onChange={(e)=>update(index, { ...value, status: e.target.value })}
                                                        className="w-3/4 cursor-text rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                                        placeholder="Não definido"
                                                        disabled={isLoading}
                                                    >
                                                        <option value="" selected disabled>Não definido</option>
                                                        {mock.map((item) => (
                                                            <option key={item.id} value={item.id}>{item.name}</option>
                                                        ))}
                                                    </select>
                                                    <div className=" w-10 flex items-center justify-center dark:text-white border dark:border-gray-400 p-2 rounded-lg">
                                                        <BsChatSquareText className="text-teal-500 text-lg"/>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="px-4 py-3 mt-2 flex justify-end sm:px-6 dark:bg-gray-800 w-full">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpenDayList(false)}
                                        ref={cancelButtonRefDayList}>
                                            Voltar
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-4 rounded-md bg-teal-500 dark:bg-teal-700 px-3 py-2 text-sm text-white shadow sm:ml-3 ring-1 ring-inset sm:w-auto"
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