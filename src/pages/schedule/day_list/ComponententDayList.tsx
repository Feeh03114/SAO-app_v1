import IsLoading from "@/components/elementTag/isLoading";
import { StatusType } from "@/enum/status_type.enum";
import { TypeUser } from '@/enum/typeUser.enum';
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import router from "next/router";
import { FieldValues, UseFieldArrayUpdate } from "react-hook-form";
import { AiOutlineEye } from "react-icons/ai";
import { BsChatSquareText } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TreatmentToday } from "..";

type ScheduleModalProps = {
    isOpen: boolean[];
    setIsOpen: React.Dispatch<React.SetStateAction<boolean[]>>;
    isLoading: boolean;
    eventsForDay: TreatmentToday[];
    update: UseFieldArrayUpdate<FieldValues, "consultas">
    setIdJustification: React.Dispatch<React.SetStateAction<string>>;
    justificationDisposer: any;
};

export function ComponentDayList({isOpen, setIsOpen, isLoading, eventsForDay, update, setIdJustification, justificationDisposer}: ScheduleModalProps): JSX.Element {
    const {data:session } = useSession(); 

    const handleChangeIsOpen = (index: number, newItem: boolean) => {
        setIsOpen((prevItems) => {
          return [
            ...prevItems.slice(0, index),
            newItem,
            ...prevItems.slice(index + 1),
          ];
        });
    };

    function justificationItem(id: string) {
        setIdJustification(id);
        justificationDisposer.open();
    }
    
    return (
        <div className="h-full">
            <div className="mt-8 grid grid-cols-5 p-2 rounded-t-lg shadow bg-slate-50 py-2 dark:bg-slate-700">
                <p className="col-span-3 mt-0 pl-3 flex justify-start items-center dark:text-white text-slate-500 text-xs leading-5 font-medium">
                    NOME
                </p>
                <p className="col-span-2 mt-0 flex justify-start items-center dark:text-white text-slate-500 text-xs leading-5 font-medium">
                    HORÁRIO
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
                        <div key={index} className="grid grid-cols-5 py-1 px-3 border-b-2 dark:border-slate-600">
                            <div className="col-span-3 flex justify-start items-center dark:text-white text-slate-900 text-sm leading-5 h-16 font-medium">
                                {value.patient.name} {value.patient.lastName}
                            </div>
                            <div className="col-span-2 flex justify-around items-center dark:text-white text-slate-500 text-sm leading-5 h-16 font-normal">
                                {dayjs(value.dateScheduled).hour() + ":" + dayjs(value.dateScheduled).minute().toString().padStart(2, '0') + "h"}
                                <button onClick={() => handleChangeIsOpen(index, !isOpen[index])}>
                                    <span>
                                        {isOpen[index] ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                                    </span>
                                </button>
                            </div>
                            {isOpen[index] && 
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
                                                {Object.keys(StatusType).filter(x=>+x).map((item) => (
                                                    <option key={item} value={item}>{item}</option>
                                                ))}
                                            </select>
                                        </div>   
                                        <div className="col-span-3 mt-3 mb-2 flex justify-between items-center">
                                            <div className="dark:text-white text-gray-500 text-sm leading-5 font-medium">Procedimento: {value.service.name}</div>
                                            <div className="flex flex-row gap-x-4">
                                                <button className="w-10 flex items-center justify-center dark:text-white border dark:border-slate-400 p-2 rounded-lg disabled:hidden"
                                                    onClick={() => justificationItem(value.id)}
                                                    disabled={value.status !== StatusType.absent}
                                                >
                                                    <BsChatSquareText className="text-teal-500 text-lg"/>
                                                </button>
                                                <button className="w-10 flex items-center justify-center dark:text-white border dark:border-slate-400 p-2 rounded-lg aria-hidden:hidden"
                                                    onClick={()=> router.push(`/schedule/report_patient/${value?.id}`)}
                                                    disabled={!value?.id || ![TypeUser.Aluno, TypeUser.Professor, TypeUser.Coordenador].includes(session?.user.typeUser) ||
                                                        ![StatusType.on_hold, StatusType.concluded, StatusType.in_process].includes(value.status)}
                                                    aria-hidden={![TypeUser.Aluno, TypeUser.Professor, TypeUser.Coordenador].includes(session?.user.typeUser) || 
                                                        dayjs().isAfter(value.dateScheduled) 
                                                    }
                                                >
                                                    <AiOutlineEye className="w-5 h-5 text-teal-500"/>
                                                </button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </>
                    );
                })}
            </div>
        </div>
    );
}