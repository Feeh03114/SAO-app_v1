import api from '@/service/api';
import { isEqualArray } from '@/util/util';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { TreatmentToday } from '..';
import DayListModal from './modal';
import { DayListSidebar } from './sidebar';

type ScheduleModalProps = {
    openDayList: boolean;
    setOpenDayList: React.Dispatch<React.SetStateAction<boolean>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cancelButtonRefDayList: React.MutableRefObject<HTMLButtonElement | null>;
    date: dayjs.Dayjs;
};

export default function DayList({ openDayList, setOpenDayList, setOpen, cancelButtonRefDayList, date }: ScheduleModalProps): JSX.Element {  
    const [eventsForDay, setEventsForDaya] = useState<TreatmentToday[]>([]);
    const { control, reset } = useForm();
    const { fields, update } = useFieldArray({ control, name: 'consultas', keyName: 'consultas.id' });
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if(window.innerWidth < 768) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [openDayList]);

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
        // try {
        //     const bodyArray = fields.filter((x:any)=>x.status !== StatusSchedule['em atendimento']).map((item:any) => ({
        //         id: item.id,
        //         status: item.status,
        //     }));
        //     await api.put('api/treatment/consult-changeStatus', bodyArray);
        //     toast.success('Alteração salva com sucesso!');
        //     loadEventsForDay();
        // } catch (error:any) {
        //     if(error instanceof Error) toast.error(error.message);
        //     if(error?.response?.data?.message) toast.error(error.response.data.message)     
        //     else toast.error('Ocorreu um erro ao salvar a consulta. Tente novamente mais tarde.'); 
        // }
    }

    useEffect(() => {
        if(eventsForDay.length > 0 && fields.length > 0) 
            if(!isEqualArray(eventsForDay, fields)) onSave();
    }, [fields]);
    
    return (
        <div>
            {isMobile ?
                <DayListModal 
                    openDayList={openDayList}
                    setOpenDayList={setOpenDayList}
                    setOpen={setOpen}
                    cancelButtonRefDayList={cancelButtonRefDayList}
                    date={date}
                    onSave={onSave}
                    fields={fields}
                />
                :
                <DayListSidebar
                    open={openDayList}
                    setOpen={setOpenDayList}
                    date={date}
                    isMobile={isMobile}
                    onSave={onSave}
                    fields={fields}
                    update={update}
                />
            }
        </div>
    )
}