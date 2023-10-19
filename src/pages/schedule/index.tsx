import Header from "@/components/Header";
import { withSSRAuth } from "@/util/withSSRAuth";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { GetServerSideProps } from "next";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ScheduleModal from "./ScheduleModal";

dayjs.locale('pt-br');

export default function Schedule(){
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [ isDarkMode, setIsDarkMode ] = useState(false);
    const [events, setEvents] = useState([
        { title: 'Evento 1', date: dayjs().startOf('day'), horario: '10:00' },
        { title: 'Evento 2', date: dayjs().startOf('day'), horario: '11:00' },
        { title: 'Evento 5', date: dayjs().startOf('day'), horario: '12:00' },
        { title: 'Evento 4', date: dayjs().startOf('day'), horario: '13:00' },
        { title: 'Evento 3', date: dayjs().add(1, 'day').startOf('day'), horario: '12:00' },
        { title: 'Evento 6', date: dayjs().startOf('day').add(2, 'day'), horario: '13:00' },
    ]);
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    const daysInMonth = selectedDate.daysInMonth();
    const startOfMonth = selectedDate.startOf('month').day();
    const ultimoDiaMes = selectedDate.endOf('month').day();

    useEffect(() => {
        function getTailwindMode() {
            if(typeof window === 'undefined') return 'unknown';
            const rootElement = window.document.documentElement;
            const isDarkMode = rootElement.classList.contains('dark');
            setIsDarkMode(isDarkMode);
        }
        getTailwindMode();
    }, []);

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

    function hasEventForDay(eventsForDay: any[]) {
        if (eventsForDay.length > 0) return true;
    }

    function isDifferentToday(date1: dayjs.Dayjs, date2: dayjs.Dayjs) {
        const tomorrow = date2.add(1, 'day');
    
        return date1.isAfter(tomorrow) || date1.isSame(tomorrow, 'day');
    }

    function getEventsForDay(date: dayjs.Dayjs) {
        return events.filter((event) => isSameDay(event.date, date));
    }

    function getLastDaysOfPreviousMonth() {
        const days = [];
        const lastMonth = selectedDate.subtract(1, 'month');
        const daysInLastMonth = lastMonth.daysInMonth();
        for (let i = daysInLastMonth - startOfMonth + 1; i <= daysInLastMonth; i++) {
            const date = lastMonth.date(i);
            days.push(date);
        }
        return days.reverse();
    }

    function renderCalendarDays() {

        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
          const date = selectedDate.date(i);
          const eventsForDay = getEventsForDay(date);
          const week = date.format('dddd');
          days.push(
            <div
                className={`flex flex-col text-start w-full h-14 cursor-pointer p-2 sm:pt-1 sm:pl-1 ${isSameDay(dayjs(), date) ? 'bg-teal-400' : hasEventForDay(eventsForDay) ? 'bg-teal-200 dark:bg-teal-900' : ''} hover:border-black hover:border hover:border-2
                    ${week === 'sábado'? 'border-r-0':'border-r'} ${i >= (daysInMonth-ultimoDiaMes)? 'border-b-0': 'border-b'} border-solid border-black/10 dark:border-white/10`}
                key={date.format('YYYY-MM-DD')}
                onClick={() => setOpen(true)}
            >
                <p className={`w-full text-center sm:text-start text-sm sm:text-base font-semibold dark:text-white ${isSameDay(dayjs(), date) ? 'text-white' : 'text-slate-700'}`}>
                    {date.format('DD')}
                </p>
            </div>
          );
        }

        for (let i = 0; i < startOfMonth; i++) {
            const date = selectedDate.date(i);
            const week = date.format('dddd');
            const lastDays = getLastDaysOfPreviousMonth();
            days.unshift(
                <div key={`empty-${i}`} className={`flex flex-col text-start w-full h-14 cursor-default p-2 sm:pt-1 sm:pl-1
                    ${week === 'sábado'? 'border-r-0':'border-r'} ${i >= (daysInMonth-ultimoDiaMes)? 'border-b-0': 'border-b'} border-solid border-black/10 dark:border-white/10`}
                >
                    <p className={`w-full text-center sm:text-start text-sm sm:text-base font-semibold dark:text-white/25 text-slate-700/25`}>
                        {lastDays[i].format('DD')}
                    </p>
                </div>
            );
        }

        for (let i = 0; i < 7 - ultimoDiaMes - 1; i++) {
            const date = selectedDate.date(i);
            const week = date.format('dddd');
            days.push(
                <div key={`empty-${i}`} className={`flex flex-col text-start w-full h-14 cursor-default p-2 sm:pt-1 sm:pl-1
                    border-l border-solid border-black/10 dark:border-white/10`}     
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
            if(cells.length > 0) rows.push(<div key={i / 7} className="flex flex-row items-start p-0 h-full w-full h-full">{cells}</div>);
            cells = [day];
          }
        });
        rows.push(<div key={days.length / 7} className="flex flex-row items-start p-0 h-full w-full h-full">{cells}</div>);

        return rows;
    }
    
    return(
        <div className="w-full h-full text-center ">
            <ScheduleModal open={open} setOpen={setOpen} cancelButtonRef={cancelButtonRef}/>
            <Header 
                title="Página Inicial"
                subtitle="Agendamento de Consultas"
                isFilterVisibled
                textLeft="Filtros"
                textRight="Adicionar Consulta"
                onClickLeft={()=> alert('Filtros em desenvolvimento')}
                onClickRight={()=> alert('Adicionar Consulta em desenvolvimento')}
            />
            <div className="bg-white dark:bg-gray-800 border border-solid border-gray-300 rounded-lg mx-1 sm:m-[2rem] sm:px-[3rem] py-[1rem] pb-4 h-full">
                <div className="inline-flex flex-col space-y-4 items-start justify-start h-full w-full">
                    <div className="inline-flex space-x-4 items-center justify-center max-h-[3rem] w-full">
                        <div className="flex items-center justify-center w-12 p-3 rounded-full">
                            <FaChevronLeft className="flex-1 rounded-lg cursor-pointer dark:text-white" onClick={handlePrevMonth}/>
                        </div>
                        <div className="inline-flex space-x-1 items-center justify-center max-h-[1.813rem] w-full">
                            <p className="text-xl font-bold leading-7 text-right text-gray-800 dark:text-white">{meses[selectedDate.month()]}</p>
                            <p className="text-xl leading-7 text-gray-800 dark:text-white">{selectedDate.year()}</p>
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
                    <div className="flex flex-col items-start p-0 h-70 w-full h-full overflow-y-auto">
                        {renderCalendarDays()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();