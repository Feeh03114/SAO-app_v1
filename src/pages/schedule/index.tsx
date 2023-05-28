import { getUppercaseFirstLetter } from "@/util/util";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'; // importar localização em português
import { useState } from "react";

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
        <div className="w-full flex-1 bg-white dark:bg-gray-600 dark:text-white text-center">
            <h1 className="ml-3 pt-5 text-3xl font-bold">Agenda</h1>
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 
                lg:px-8 flex justify-between items-center"
            >
                <button
                    className="bg-teal-100 hover:bg-teal-300 dark:hover:bg-teal-700
                     text-white font-bold py-2 px-4 rounded focus:outline-none 
                     focus:shadow-outline"
                    onClick={handlePrevMonth}
                >
                    Anterior
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                    {getUppercaseFirstLetter(selectedDate.format('MMMM YYYY'))}
                </h1>
                <button
                    className="bg-teal-100 hover:bg-teal-300 dark:hover:bg-teal-700
                     text-white font-bold py-2 px-4 rounded focus:outline-none 
                     focus:shadow-outline"
                    onClick={handleNextMonth}
                >
                    Próximo
                </button>
            </div>
            <div 
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
            </div>
            {/* nao deletar */}
        </div>
    )
}