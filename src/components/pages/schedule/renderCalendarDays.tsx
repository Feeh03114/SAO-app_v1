import IsLoading from "@/components/elementTag/isLoading";
import api from "@/service/api";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";

export interface HasTreatmentToday {
    day: Dayjs;
    hasSchedule: boolean;
}

interface RenderFakeCalendarProps {
    selectedDate: Dayjs;
    setOpenDayList: React.Dispatch<React.SetStateAction<boolean>>;
    setTodayDate: React.Dispatch<React.SetStateAction<Dayjs>>;
    open: boolean;
}

const isCenter = (date: dayjs.Dayjs): boolean => {
   const day = Number(date.format('DD'));
   const week = date.format('dddd');
   if (week === 'quarta-feira' && day >= 12 && day <=18 ) return true;
   return false;
}

export default function RenderCalendar({ selectedDate, setOpenDayList, setTodayDate, open }:RenderFakeCalendarProps): JSX.Element {
    const [hastreatmentTodayData, sethastreatmentTodayData] = useState<HasTreatmentToday[]>([]);
    const daysInMonth = selectedDate.daysInMonth();
    const startOfMonth = selectedDate.startOf('month').day();
    const ultimoDiaMes = selectedDate.endOf('month').day();
    const [isLoading, setIsLoading] = useState(false);
    
    const [paramsHasScedule, setParamsHasScedule] = useState({
        init: selectedDate.startOf('month').format(),
        end: selectedDate.endOf('month').format(),
    });

    const loadHasScheduleData = async () => {
        setIsLoading(true);
        try {
            console.log("init: " + selectedDate.startOf('month').format());
            console.log("end: " + selectedDate.endOf('month').format());
            const { data:RespAPI } = await api.get("api/treatment/schedule", {
                params: paramsHasScedule
            });
            sethastreatmentTodayData(RespAPI);
            console.log(RespAPI);
        } catch (error) {
          console.log(error);
        } 
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadHasScheduleData();
    }, []);

    useEffect(() => {
        if(!open) loadHasScheduleData();
    }, [open]);

    useEffect(() => {
        setParamsHasScedule({
            init: selectedDate.startOf('month').format(),
            end: selectedDate.endOf('month').format(),
        })
       
    }, [selectedDate]);

    useEffect(() => {
        loadHasScheduleData();
    }, [paramsHasScedule]);

    function isSameDay(date1: dayjs.Dayjs, date2: dayjs.Dayjs) {
        return (
            date1.year() === date2.year() &&
            date1.month() === date2.month() &&
            date1.date() === date2.date()
        );
    }

    function hasEventForDay(date: dayjs.Dayjs) {
        let isSame = false;

        hastreatmentTodayData.forEach((item) => {
            if(isSameDay(date, dayjs(item.day, "YYYY-MM-DDTHH:mm:ss.SSSZ"))) {
                isSame = true;
            }
        });

        return isSame;
    }

    async function getEventsForDay(date: dayjs.Dayjs) {
        const param = {
            day: date.toISOString()
        };

        let eventsForDay;

        try {
            const { data:RespAPI } = await api.get("api/treatment/schedule/day", {
                params: param
            });
            setTodayDate(date);
            eventsForDay = RespAPI;
        } catch (error) {
            console.log(error);
        }

        return eventsForDay;
    }

    function getLastDaysOfPreviousMonth(number: number) {
        const days = [];

        let month = selectedDate;

        if (number > 0) {
            month = selectedDate.add(number, 'month');
        } else if (number < 0) {
            month = selectedDate.subtract(number * -1, 'month');
        } 

        const startOfMonth = month.add(1, 'month').startOf('month').day();

        const daysInLastMonth = month.daysInMonth();
        for (let i = daysInLastMonth - startOfMonth + 1; i <= daysInLastMonth; i++) {
            const date = month.date(i);
            days.push(date);
        }
        return days.reverse();
    }

    function getFirstDaysNextMonth(number: number) {
        const days = [];

        let month = selectedDate;

        if (number > 0) {
            month = selectedDate.add(number, 'month');
        } else if (number < 0) {
            month = selectedDate.subtract(number * -1, 'month');
        } 

        for (let i = 1; i <= 7; i++) {
            const date = month.date(i);
            days.push(date);
        }
        return days;
    }

    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
        const date = selectedDate.date(i);
        const week = date.format('dddd');
        days.push(
            <div
                className={`flex flex-col text-start w-full h-full cursor-default p-2 sm:pt-1 sm:pl-1 ${isSameDay(dayjs(), date) ? 'bg-teal-400 hover:bg-teal-500 dark:hover:bg-teal-300' : hasEventForDay(date) && 'bg-teal-200 hover:bg-teal-300 dark:bg-teal-900 dark:hover:bg-teal-800'} ${hasEventForDay(date) && 'cursor-pointer'} hover:bg-slate-100 dark:hover:bg-slate-700
                    ${week === 'sábado' ? 'border-r-0 bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600':'border-r'} ${week === 'domingo' && 'bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${i >= (daysInMonth-ultimoDiaMes)? 'border-b-0': 'border-b'} border-solid border-black/10 dark:border-white/10`}
                key={date.format('YYYY-MM-DD')}
                onClick={() => {hasEventForDay(date) && setOpenDayList(true), hasEventForDay(date) && getEventsForDay(date)}}
            >  
                <p className={`w-full text-center sm:text-start text-sm sm:text-base font-semibold dark:text-white ${isSameDay(dayjs(), date) ? 'text-white' : 'text-slate-700'}`}>
                    {date.format('DD')}
                </p>
                {
                    isCenter(date) &&
                    <div className={`w-full h-full -mt-5 z-10 relative flex justify-center items-center`}>
                        <IsLoading
                            isVisible={isLoading}
                            className='text-slate-400 dark:text-white'
                        />
                    </div>
                }
            </div>
        );
    }

    for (let i = 0; i < startOfMonth; i++) {
        const lastDays = getLastDaysOfPreviousMonth(-1);
        days.unshift(
            <div key={`empty-${i}`} className={`flex flex-col text-start w-full h-full cursor-default p-2 sm:pt-1 sm:pl-1
                ${lastDays[i].format('dddd') === 'sábado' ? 'border-r-0 bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600':'border-r'} ${lastDays[i].format('dddd') === 'domingo' && 'bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${i >= (daysInMonth-ultimoDiaMes)? 'border-b-0': 'border-b'} border-solid border-black/10 dark:border-white/10`}
            >
                <p className={`w-full text-center sm:text-start text-sm sm:text-base font-semibold dark:text-white/25 text-slate-700/25`}>
                    {lastDays[i].format('DD')}
                </p>
            </div>
        );
    }

    for (let i = 0; i < 6 - ultimoDiaMes; i++) {
        const day = getFirstDaysNextMonth(1)[i].format('dddd');
        days.push(
            <div key={`empty-${i}`} className={`flex flex-col text-start w-full h-full cursor-default p-2 sm:pt-1 sm:pl-1
            ${day === 'sábado' && 'bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${day === 'domingo' && 'bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600'} border-l border-solid border-black/10 dark:border-white/10`}     
            >
                <p className={`w-full text-center sm:text-start text-sm sm:text-base font-semibold dark:text-white/25 text-slate-700/25`}>
                    {i+1}
                </p>
            </div>
        );
    }

    const rows:JSX.Element[] = [];
    let cells:any = [];
    days.forEach((day, i) => {
        if (i % 7 !== 0) {
        cells.push(day);
        } else {
        if(cells.length > 0) rows.push(<div key={i / 7} className="flex flex-row items-start p-0 h-full w-full">{cells}</div>);
        cells = [day];
        }
    });
    rows.push(<div key={days.length / 7} className="flex flex-row items-start p-0 h-full w-full">{cells}</div>);
    
    return (
        <>
            {rows}
        </>
    );
}