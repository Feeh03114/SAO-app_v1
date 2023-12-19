
import Header from "@/components/Header/multipleButtons";
import RenderCalendar from "@/components/pages/schedule/renderCalendarDays";
import RenderFakeCalendar from "@/components/pages/schedule/renderFakeCalendarDays";
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

export interface TreatmentToday {
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

export default function Schedule():JSX.Element {
    const [openDayList, setOpenDayList] = useState(false);
    const [open, setOpen] = useState(false);
    const cancelButtonRefDayList = useRef(null);
    const cancelButtonRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [treatmentTodayData, setTreatmentTodayData] = useState<TreatmentToday[]>([]);
    const [scrollLeft, setScrollLeft] = useState(1);
    const [scrollMiddle, setScrollMiddle] = useState(false);
    const scrollRef = useRef<HTMLUListElement>(null);
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

    function handlePrevMonth() {
        setSelectedDate(selectedDate.subtract(1, 'month'));
    }

    function buttonPrevMonth() {
        scrollRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }

    scrollRef.current?.addEventListener('scrollend', () => {
        const scrollId = document.getElementById("scrollId");
   
        if (scrollId) {
            const scrollPercent = Math.trunc(((scrollId.scrollLeft / scrollId.scrollWidth) * 100));

            if (scrollPercent <= 0 && scrollLeft != 0) { 
                setScrollMiddle(!scrollMiddle);
                setScrollLeft(1);
                handlePrevMonth();

            } if (scrollPercent >= 66 && scrollLeft != 2) {
                setScrollMiddle(!scrollMiddle);
                setScrollLeft(1);
                handleNextMonth();
            }
        }
    })

    function handleNextMonth() {
        setSelectedDate(selectedDate.add(1, 'month'));
    }

    function buttonNextMonth() {
        scrollRef.current?.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' });
    }

    useEffect(() => {
        setScrollMiddle(!scrollMiddle);
    }, []);
    
    useEffect(() => {
        scrollRef.current?.scrollTo({ left: (scrollRef.current.scrollWidth / 3), behavior: 'instant' });
    }, [scrollMiddle]);
    
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
                            <FaChevronLeft className="flex-1 rounded-lg cursor-pointer dark:text-white" onClick={buttonPrevMonth}/>
                        </div>
                        <div className="flex items-center justify-center space-x-1 max-h-[1.813rem] w-full">
                            <p className="text-xl font-bold leading-7 text-right text-gray-800 dark:text-white">{meses[selectedDate.month()]}</p>
                            <p className="text-xl leading-7 text-gray-800 dark:text-white m-0">{selectedDate.year()}</p>
                        </div>
                        <div className="inline-flex items-center justify-center w-12 p-3 rounded-full">
                            <FaChevronRight className="flex-1 rounded-lg cursor-pointer dark:text-white" onClick={buttonNextMonth}/>
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
                        <ul ref={scrollRef} id="scrollId" className="w-full h-full snap-x flex snap-mandatory snap-center overflow-scroll scroll">
                            <div className="w-full h-full snap-center flex-shrink-0 flex items-center justify-center">
                                <li id="item1" className="flex flex-col items-start p-0 h-[calc(100vh-24rem)] md:h-[calc(100vh-21rem)] w-full overflow-y-auto">
                                   <RenderFakeCalendar selectedDate={selectedDate} nextMonth={false} />
                                </li>
                            </div>
                            <div className="w-full h-full mx-8 snap-center flex-shrink-0 flex items-center justify-center">
                                <li id="item2" className="flex flex-col items-start p-0 h-[calc(100vh-24rem)] md:h-[calc(100vh-21rem)] w-full overflow-y-auto">
                                  <RenderCalendar selectedDate={selectedDate} setOpenDayList={setOpenDayList} open={open} setTreatmentTodayData={setTreatmentTodayData} />
                                </li>
                            </div>
                            <div className="w-full h-full snap-center flex-shrink-0 flex items-center justify-center">
                                <li id="item3" className="flex flex-col items-start p-0 h-[calc(100vh-24rem)] md:h-[calc(100vh-21rem)] w-full overflow-y-auto">
                                    <RenderFakeCalendar selectedDate={selectedDate} nextMonth={true} />
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}