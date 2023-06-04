import Header from "@/components/Header";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'; // importar localização em português
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

dayjs.locale('pt-br');

export default function Schedule(){
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [events, setEvents] = useState([
        { title: 'Evento 1', date: dayjs().startOf('day'), horario: '10:00' },
        { title: 'Evento 2', date: dayjs().startOf('day'), horario: '11:00' },
        { title: 'Evento 5', date: dayjs().startOf('day'), horario: '12:00' },
        { title: 'Evento 4', date: dayjs().startOf('day'), horario: '13:00' },
        { title: 'Evento 3', date: dayjs().add(1, 'day').startOf('day'), horario: '12:00' },
    ]);

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

    function getEventsForDay(date: dayjs.Dayjs) {
        return events.filter((event) => isSameDay(event.date, date));
    }

    function renderCalendarDays() {
        const daysInMonth = selectedDate.daysInMonth();
        const startOfMonth = selectedDate.startOf('month').day();
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
          const date = selectedDate.date(i);
          const eventsForDay = getEventsForDay(date);
          days.push(
            <td
              key={date.format('YYYY-MM-DD')}
              className="p-1 h-34 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 rounded-lg
                overflow-auto transition cursor-pointer duration-500 ease 
                hover:bg-teal-300 dark:hover:bg-teal-700"
              onClick={() => console.log('click date')}
            >
                <div className="flex flex-col h-34 mx-auto xl:w-40 lg:w-30 md:w-30 
                    sm:w-full w-10 overflow-hidden"
                >
                    <div className={`top h-5 w-full text-center ${
                        isSameDay(date, dayjs()) ? 'text-blue-800' : ''
                        }`}
                    >
                        <div className="font-bold">{date.format('DD')}</div>
                    </div>
                    <div className="bottom flex-grow h-24 py-1 w-full cursor-pointer">
                        {eventsForDay.map((event, index) => 
                            {
                                if(index > 2) return;

                                if(event.title.length > 10)
                                    event.title = event.title.substring(0, 10) + '...';
                                
                                if(eventsForDay.length > 2 && index === 2)
                                    return (
                                        <div 
                                            key={event.title}
                                            className="bg-purple-700 text-white 
                                            rounded text-sm mb-1 justify-between
                                            text-center text-[10px] font-bold"
                                        >
                                            <span>+ Clica Aqui +</span>
                                        </div>
                                    );
                                
                                return (
                                    <div 
                                        key={event.title}
                                        className="bg-purple-400 text-white 
                                        rounded p-1 text-sm mb-1 justify-between
                                        text-center"
                                    >
                                        <span>{event.title}</span>
                                        <span>  </span>
                                        <span>{event.horario}</span>
                                    </div>
                                );
                            }
                        )}
                        
                    </div>
                </div>
            </td>
          );
        }
        for (let i = 0; i < startOfMonth; i++) {
          days.unshift(<td key={`empty-${i}`} className="bg-teal-100 rounded-lg"></td>);
        }
        const rows = [];
        let cells:any = [];
        days.forEach((day, i) => {
          if (i % 7 !== 0) {
            cells.push(day);
          } else {
            rows.push(<tr key={i / 7}>{cells}</tr>);
            cells = [day];
          }
        });
        rows.push(<tr key={days.length / 7}>{cells}</tr>);
        return rows;
    }
    

    return(
        <div className="w-full bg-white dark:bg-gray-600 dark:text-white text-center ">
            <Header 
                title="Página Inicial"
                subtitle="Agendamento de Consultas"
                isFilterVisibled
                textLeft="Filtros"
                textRight="Adicionar Consulta"
                onClickLeft={()=> console.log('filter')}
                onClickRight={()=> console.log('add consult')}
            />
            <div className="w-full max-h-[39.625rem] border-1 border-black rounded p-[2rem] pt-0 border-solid"
                /* style={{
                    border: '1px solid #000',
                }} */
            >
                <div className="inline-flex flex-col space-y-4 items-start justify-start pb-4 max-h-[6.875rem] w-full">
                    <div className="inline-flex space-x-4 items-center justify-center max-h-[3rem] w-full">
                        <div className="flex items-center justify-center w-12 h-full p-3 bg-white rounded-full">
                            <FaChevronLeft className="flex-1 h-full rounded-lg"/>
                        </div>
                        <div className="flex space-x-1 items-center justify-center max-h-[1.813rem] w-full">
                            <p className="text-xl font-bold leading-7 text-right text-gray-800">Janeiro </p>
                            <p className="text-xl leading-7 text-gray-800">2023</p>
                        </div>
                        <div className="flex items-center justify-center w-12 h-full p-3 bg-white rounded-full ">
                            <FaChevronRight className="flex-1 h-full rounded-lg"/>
                        </div>
                    </div>
                    <div className="bg-black bg-opacity-10 h-1 w-full"/>
                    <div className="inline-flex space-x-0.5 items-start justify-start opacity-50 max-h-[1.438rem] w-full">
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">SEG</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">TER</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">QUA</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">QUI</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">SEX</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">SÁB</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">DOM</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* <div 
                className="max-w-7xl mx-2 py-6 sm:px-6 lg:px-8 
                border rounded-lg bg-teal-100 dark:bg-teal-900 overflow-scroll h-[65vh]"
            >
                <table className="table-auto w-full ">
                    <thead className="text-teal-500 dark:text-teal-400 ">
                    <tr>
                        <th className="">Dom</th>
                        <th className="">Seg</th>
                        <th className="">Ter</th>
                        <th className="">Qua</th>
                        <th className="">Qui</th>
                        <th className="">Sex</th>
                        <th className="">Sáb</th>
                    </tr>
                    </thead>
                    <tbody className="overflow-scroll">{renderCalendarDays()}</tbody>
                </table>
            </div> */