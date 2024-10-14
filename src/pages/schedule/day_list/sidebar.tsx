import { ModalJustification } from "@/components/pages/schedule/modalJustification";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { isEqualArray } from "@/util/util";
import dayjs from "dayjs";
import React, { Fragment, useEffect, useState } from "react";
import { FieldValues, UseFieldArrayUpdate, useForm } from "react-hook-form";
import { MdChevronLeft } from "react-icons/md";
import { TreatmentToday } from "..";
import { ComponentDayList } from "./ComponententDayList";

type ScheduleModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    date: dayjs.Dayjs;
    isMobile: boolean;
    onSave: () => void;
    fields: Record<"consultas.id", string>[]
    update: UseFieldArrayUpdate<FieldValues, "consultas">
};

export function DayListSidebar({open, setOpen, date, isMobile, onSave, fields, update}: ScheduleModalProps): JSX.Element {  
    const [eventsForDay, setEventsForDaya] = useState<TreatmentToday[]>([]);
    const { control, reset } = useForm();
    const justificationDisposer = useDisclosure();
    const [idJustification, setIdJustification] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean[]>([]);

    useEffect(() => {
        if(open) {
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

    function onClose() {
        setOpen(false);
        setEventsForDaya([]);
    }
    
    return(
        <Fragment>
            <ModalJustification 
                isOpen={justificationDisposer.isOpen} 
                onClose={justificationDisposer.close}
                idJustification={idJustification}
                message={eventsForDay.find((item) => item.id === idJustification)?.justificationFault}
            /> 
            <div className={`${open ? 'z-20' : '-z-10'} ${isMobile ? "hidden" : "w-72"} fixed flex h-[calc(100vh-80px)] duration-500 ease-in-out right-0`}>
                <div className={`${open ? '-translate-x-0' : 'translate-x-full'} w-full border-e-2 dark:border-e-0 bg-slate-50 dark:bg-slate-800 transform duration-500 ease-in-out  inline-flex flex-col items-start justify-start`} 
                    aria-label="Sidebar">
                    <div className="w-full pt-5 flex flex-row justify-between items-center">
                        <MdChevronLeft className="ml-4 transform -rotate-180 rounded-lg cursor-pointer dark:text-white" size={24} onClick={() => onClose()}/>
                        <div className="mr-8 text-base text-slate-900 dark:text-white text-center">{eventsForDay?.length > 0 && dayjs(eventsForDay[0].dateScheduled, "YYYY-MM-DDTHH:mm:ss.SSSZ").format('DD/MM/YYYY')}</div>
                    </div>
                    <div className="w-full h-full bg-white dark:bg-slate-800 px-4">
                        <ComponentDayList
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            isLoading={isLoading}
                            eventsForDay={eventsForDay}
                            update={update}
                            setIdJustification={setIdJustification}
                            justificationDisposer={justificationDisposer}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}