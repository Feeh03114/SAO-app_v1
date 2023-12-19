
import Header from "@/components/Header/multipleButtons";
import api from "@/service/api";
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/pt-br';
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DayListModal from "./DayListModal";
import ScheduleModal from "./ScheduleModal";

dayjs.locale('pt-br');

interface Service {
    active_duration_auto: boolean;
    createdBy: string;
    criatedAt: string;
    deleted: boolean;
    deletedAt: string;
    deletedBy: string;
    description: string;
    discipline_id: string;
    duration_medio: string;
    ext: boolean;
    id: string;
    name: string;
    price: string;
    updatedAt: string;
    updatedBy: string;
}

interface Patient {
    name: string;
}

interface TreatmentToday {
    authorizationProfessorCurrent: boolean;
    authorizationProfessorCurrentDate: string;
    dateConsultationFinished: string;
    dateConsultationStarted: string;
    dateScheduled: Dayjs;
    id: string;
    justificationFault: string;
    occurrenceConsultation: string;
    patient: Patient;
    service: Service;
    serviceForwardedId: string;
    service_id: string;
    status: string;
    treatment_id: string;
}

export interface Treatment {
    id: string;
    complaint_text: string;
    treatment_id: string;
    service_id: string;
    consultationReport: string;
}   

export interface HasTreatmentToday {
    day: Dayjs;
    hasSchedule: boolean;
}

interface items {
    id: string;
    name: string;
}

export default function Schedule():JSX.Element {
    const [openDayList, setOpenDayList] = useState(false);
    const [open, setOpen] = useState(false);
    const cancelButtonRefDayList = useRef(null);
    const cancelButtonRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [ isDarkMode, setIsDarkMode ] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hastreatmentTodayData, sethastreatmentTodayData] = useState<HasTreatmentToday[]>([]);
    const [treatmentTodayData, setTreatmentTodayData] = useState<TreatmentToday[]>([]);
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    const daysInMonth = selectedDate.daysInMonth();
    const startOfMonth = selectedDate.startOf('month').day();
    const ultimoDiaMes = selectedDate.endOf('month').day();

    const [paramsHasScedule] = useState({
        init: selectedDate.startOf('month').format(),
        end: selectedDate.endOf('month').format(),
    });

    const loadHasSceduleData = async () => {
        setIsLoading(true);
        try {
            const { data:RespAPI } = await api.get("api/treatment/schedule", {
                params: paramsHasScedule
            });
            sethastreatmentTodayData(RespAPI);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        function getTailwindMode() {
            if(typeof window === 'undefined') return 'unknown';
            const rootElement = window.document.documentElement;
            const isDarkMode = rootElement.classList.contains('dark');
            setIsDarkMode(isDarkMode);
        }
        getTailwindMode();
        loadHasSceduleData();
    }, []);

    useEffect(() => {
        if(!open) loadHasSceduleData();
    }, [open]);

    function handlePrevMonth() {
        setSelectedDate(selectedDate.subtract(1, 'month'));
    }

    function handleNextMonth() {
        setSelectedDate(selectedDate.add(1, 'month'));
    }

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

        setIsLoading(true);
        try {
            const { data:RespAPI } = await api.get("api/treatment/schedule/day", {
                params: param
            });
            setTreatmentTodayData(RespAPI);
            eventsForDay = RespAPI;
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);

        return eventsForDay;
    }

    function getLastDaysOfPreviousMonth(number: number = 0) {
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

    function getFirstDaysNextMonth(number: number = 0) {
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

    function renderCalendarDays() {
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const date = selectedDate.date(i);
            const week = date.format('dddd');
            days.push(
                <div
                    className={`flex flex-col text-start w-full h-full cursor-default p-2 sm:pt-1 sm:pl-1 ${isSameDay(dayjs(), date) ? 'bg-teal-400 hover:bg-teal-500 dark:hover:bg-teal-300' : hasEventForDay(date) && 'bg-teal-200 hover:bg-teal-300 dark:bg-teal-900 dark:hover:bg-teal-800'} ${hasEventForDay(date) && 'cursor-pointer'} hover:bg-gray-100 dark:hover:bg-gray-700
                        ${week === 'sábado' ? 'border-r-0 bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600':'border-r'} ${week === 'domingo' && 'bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${i >= (daysInMonth-ultimoDiaMes)? 'border-b-0': 'border-b'} border-solid border-black/10 dark:border-white/10`}
                    key={date.format('YYYY-MM-DD')}
                    onClick={() => {hasEventForDay(date) && setOpenDayList(true), hasEventForDay(date) && getEventsForDay(date)}}
                >
                    <p className={`w-full text-center sm:text-start text-sm sm:text-base font-semibold dark:text-white ${isSameDay(dayjs(), date) ? 'text-white' : 'text-slate-700'}`}>
                        {date.format('DD')}
                    </p>
                </div>
            );
        }

        for (let i = 0; i < startOfMonth; i++) {
            const lastDays = getLastDaysOfPreviousMonth(-1);
            days.unshift(
                <div key={`empty-${i}`} className={`flex flex-col text-start w-full h-full cursor-default p-2 sm:pt-1 sm:pl-1
                    ${lastDays[i].format('dddd') === 'sábado' ? 'border-r-0 bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600':'border-r'} ${lastDays[i].format('dddd') === 'domingo' && 'bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${i >= (daysInMonth-ultimoDiaMes)? 'border-b-0': 'border-b'} border-solid border-black/10 dark:border-white/10`}
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
                ${day === 'sábado' && 'bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${day === 'domingo' && 'bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600'} border-l border-solid border-black/10 dark:border-white/10`}     
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

        return rows;
    }

    function renderFakeCalendar(nextMonth: boolean) {
        const days = [];
        let month;
        let lastDays;
        
        if (nextMonth) {
            month = selectedDate.add(1, 'month');
            lastDays = getLastDaysOfPreviousMonth(0);
        } else {
            month = selectedDate.subtract(1, 'month');
            lastDays = getLastDaysOfPreviousMonth(-2);
        }

        const daysInMonth = month.daysInMonth();
        const ultimoDiaMes = month.endOf('month').day();
       
        for (let i = 1; i <= month.daysInMonth(); i++) {
            const date = month.date(i);
            const week = date.format('dddd');

            days.push(
                <div
                    className={`flex flex-col text-start w-full h-full cursor-default p-2 sm:pt-1 sm:pl-1 ${isSameDay(dayjs(), date) && 'bg-teal-400 hover:bg-teal-500 dark:hover:bg-teal-300'} hover:bg-gray-100 dark:hover:bg-gray-700
                    ${week === 'sábado' ? 'border-r-0 bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600':'border-r'} ${week === 'domingo' && 'bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${i >= (daysInMonth-ultimoDiaMes)? 'border-b-0': 'border-b'} border-solid border-black/10 dark:border-white/10`}
                    key={date.format('YYYY-MM-DD')}
                >
                    <p className={`w-full text-center sm:text-start text-sm sm:text-base font-semibold dark:text-white ${isSameDay(dayjs(), date) ? 'text-white' : 'text-slate-700'}`}>
                        {date.format('DD')}
                    </p>
                </div>
            );
        }

        for (let i = 0; i < month.startOf('month').day(); i++) {         
            const daysInMonth = month.date(i).daysInMonth();
            const ultimoDiaMes = month.date(i).endOf('month').day();

            days.unshift(
                <div key={`empty-${i}`} className={`flex flex-col text-start w-full h-full cursor-default p-2 sm:pt-1 sm:pl-1
                ${lastDays[i].format('dddd') === 'sábado' ? 'border-r-0 bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600':'border-r'} ${lastDays[i].format('dddd') === 'domingo' && 'bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${i >= (daysInMonth-ultimoDiaMes)? 'border-b-0': 'border-b'} border-solid border-black/10 dark:border-white/10`}
                >
                    <p className={`w-full text-center sm:text-start text-sm sm:text-base font-semibold dark:text-white/25 text-slate-700/25`}>
                        {lastDays[i].format('DD')}
                    </p>
                </div>
            );
        }

        for (let i = 0; i < 6 - month.endOf('month').day(); i++) {
            let day;
       
            if (nextMonth) {
                day = getFirstDaysNextMonth(2)[i].format('dddd');
            } else {
                day = getFirstDaysNextMonth(0)[i].format('dddd');
            }

            days.push(
                <div key={`empty-${i}`} className={`flex flex-col text-start w-full h-full cursor-default p-2 sm:pt-1 sm:pl-1
                    ${day === 'sábado' && 'bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600'} ${day === 'domingo' && 'bg-gray-50 dark:bg-slate-700 dark:hover:bg-slate-600'} border-l border-solid border-black/10 dark:border-white/10`}     
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

        return rows;
    }

    const [scrollLeft, setScrollLeft] = useState(1);
    const [scrollMiddle, setScrollMiddle] = useState(false);
    const scrollRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        setScrollMiddle(!scrollMiddle);
    }, []);
    
    useEffect(() => {
        scrollRef.current?.scrollTo({ left: (scrollRef.current.scrollWidth / 3), behavior: 'instant' });
    }, [scrollMiddle]);

    const handleScroll = () => {
        scrollRef.current?.addEventListener('scrollend', () =>{
            const scrollId = document.getElementById("scrollId");
       
            if (scrollId) {
                const scrollPercent = Math.trunc(((scrollId.scrollLeft / scrollId.scrollWidth) * 100));

                if (scrollPercent < 5 && scrollLeft != 0) { 
                    setScrollLeft(0);

                    setScrollMiddle(!scrollMiddle);
                    setScrollLeft(1);
                    handlePrevMonth();

                } if (scrollPercent > 60 && scrollLeft != 2) {
                    setScrollLeft(2);

                    setScrollMiddle(!scrollMiddle);
                    setScrollLeft(1);
                    handleNextMonth();
                }
            }
        })
    };
    
    return(
        <div className="w-full text-center ">
            <DayListModal openDayList={openDayList} setOpenDayList={setOpenDayList} setOpen={setOpen} cancelButtonRefDayList={cancelButtonRefDayList} eventsForDay={treatmentTodayData}/>
            <ScheduleModal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}/>
            
            <Header.Root 
                title={"Página Inicial"}
                subtitle={"Agendamento de Consultas"}
            >
                <Header.Button 
                    text="Filtros"
                    typeButton="filter"
                    onClick={() => alert('Filtros em desenvolvimento')}
                />
                <Header.Button 
                    text="Adicionar Consulta"
                    typeButton="add"
                    textStyle="text-white"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    onClick={() => setOpen(true)}
                />
            </Header.Root>

            <div className="bg-white dark:bg-gray-800 border border-solid border-gray-200 dark:border-slate-700 rounded-lg mx-5 sm:m-[2rem] sm:px-[3rem] py-[1rem] pb-0 md:pb-4 h-full overflow-hidden">
                <div className="inline-flex flex-col space-y-4 items-start justify-start h-full w-full">
                    <div className="inline-flex space-x-4 items-center justify-center max-h-[3rem] w-full">
                        <div className="flex items-center justify-center w-12 p-3 rounded-full">
                            <FaChevronLeft className="flex-1 rounded-lg cursor-pointer dark:text-white" onClick={handlePrevMonth}/>
                        </div>
                        <div className="flex items-center justify-center space-x-1 max-h-[1.813rem] w-full">
                            <p className="text-xl font-bold leading-7 text-right text-gray-800 dark:text-white">{meses[selectedDate.month()]}</p>
                            <p className="text-xl leading-7 text-gray-800 dark:text-white m-0">{selectedDate.year()}</p>
                        </div>
                        <div className="inline-flex items-center justify-center w-12 p-3 rounded-full">
                            <FaChevronRight className="flex-1 rounded-lg cursor-pointer dark:text-white" onClick={handleNextMonth}/>
                        </div>
                    </div>
                    <div className="inline-flex space-x-0.5 items-start justify-start opacity-50 w-full">
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 dark:text-white uppercase mt-2">DOM</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 dark:text-white uppercase">SEG</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 dark:text-white uppercase">TER</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 dark:text-white uppercase">QUA</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 dark:text-white uppercase">QUI</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 dark:text-white uppercase">SEX</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 dark:text-white uppercase">SÁB</p>
                    </div>
                    <div className="flex flex-col items-start p-0 h-[calc(100vh-24rem)] md:h-[calc(100vh-21rem)] w-full overflow-y-auto">
                        <ul ref={scrollRef} id="scrollId" onTouchEnd={handleScroll} className="w-full h-full snap-x flex snap-mandatory snap-center overflow-scroll scroll">
                            <div className="w-full h-full snap-center flex-shrink-0 flex items-center justify-center">
                                <li id="item1" className="flex flex-col items-start p-0 h-[calc(100vh-24rem)] md:h-[calc(100vh-21rem)] w-full overflow-y-auto">
                                    {renderFakeCalendar(false)}
                                </li>
                            </div>
                            <div className="w-full h-full mx-8 snap-center flex-shrink-0 flex items-center justify-center">
                                <li id="item2" className="flex flex-col items-start p-0 h-[calc(100vh-24rem)] md:h-[calc(100vh-21rem)] w-full overflow-y-auto">
                                    {renderCalendarDays()}
                                </li>
                            </div>
                            <div className="w-full h-full snap-center flex-shrink-0 flex items-center justify-center">
                                <li id="item3" className="flex flex-col items-start p-0 h-[calc(100vh-24rem)] md:h-[calc(100vh-21rem)] w-full overflow-y-auto">
                                    {renderFakeCalendar(true)}
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

