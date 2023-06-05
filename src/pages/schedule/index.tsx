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
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]

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

    function isDifferentToday(date1: dayjs.Dayjs, date2: dayjs.Dayjs) {
        const tomorrow = date2.add(1, 'day');
    
        return date1.isAfter(tomorrow) || date1.isSame(tomorrow, 'day');
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
          const week = date.format('dddd');
          days.push(
            <div 
                className={`flex flex-col items-center justify-end h-36 px-2 py-2.5 text-start w-full ${isDifferentToday(date, dayjs())? 'cursor-pointer': 'cursor-not-allowed'}`}
                style={{
                    borderWidth: `0px ${week === 'sábado'? '0px':'1px'} 1px 0px`,
                    borderStyle: 'solid',
                    borderColor: 'rgba(0, 0, 0, 0.07)'
                }}  
                key={date.format('YYYY-MM-DD')}
                onClick={() => console.log('click date')}
                
            >
                <p className={`w-full text-lg font-semibold ${isSameDay(date, dayjs()) ? 'text-teal-800' : isDifferentToday(date, dayjs())? 'text-teal-600' : 'opacity-10 text-gray-800'}`} 
                >
                    {date.format('DD')}
                </p>
                <div className={`bottom flex-grow h-24 py-1 w-full ${eventsForDay.length? 'cursor-pointer': 'cursor-not-allowed'} `}>
                    {eventsForDay.map((event, index) => 
                        {
                            if(index > 2) return;

                            if(event.title.length > 10)
                                event.title = event.title.substring(0, 10) + '...';
                            
                            if(eventsForDay.length > 2 && index === 2)
                                return (
                                    <div 
                                        key={event.title}
                                        className="bg-teal-700 text-white 
                                        rounded text-sm mb-1 justify-between
                                        text-center text-[10px] font-bold"
                                    >
                                        <span>+ Clica Aqui +</span>
                                    </div>
                                );
                            
                            return (
                                <div 
                                    key={event.title}
                                    className="bg-teal-400 text-white 
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
          );
        }
        for (let i = 0; i < startOfMonth; i++) {
            days.unshift(<div key={`empty-${i}`} className="flex flex-col items-center justify-end h-36 px-2 py-2.5 text-start w-full cursor-not-allowed"
                style={{
                    borderWidth: `0px 1px 1px 0px`,
                    borderStyle: 'solid',
                    borderColor: 'rgba(0, 0, 0, 0.07)'
                }}
            ></div>);
        }
        const rows:JSX.Element[] = [];
        let cells:any = [];
        days.forEach((day, i) => {
          if (i % 7 !== 0) {
            cells.push(day);
            if(i === days.length - 1) cells.push(<div key={`empty-${i}`} className="flex flex-col items-center justify-end h-36 px-2 py-2.5 text-start w-full cursor-not-allowed"
                style={{
                    borderWidth: `0px 1px 1px 0px`,
                    borderStyle: 'solid',
                    borderColor: 'rgba(0, 0, 0, 0.07)'
                }}
            ></div>
            );
          } else {
            if(cells.length > 0) rows.push(<div key={i / 7} className="flex flex-row items-start p-0 h-36 w-full">{cells}</div>);
            cells = [day];
          }
        });
        rows.push(<div key={days.length / 7} className="flex flex-row items-start p-0 h-36 w-full">{cells}</div>);

        return rows;
    }
    

    return(
        <div className="w-full bg-white text-center ">
            <Header 
                title="Página Inicial"
                subtitle="Agendamento de Consultas"
                isFilterVisibled
                textLeft="Filtros"
                textRight="Adicionar Consulta"
                onClickLeft={()=> console.log('filter')}
                onClickRight={()=> console.log('add consult')}
            />
            <div className="m-[2rem] border border-solid border-gray-300 rounded-lg px-[3rem] py-[2rem]">
                <div className="inline-flex flex-col space-y-4 items-start justify-start pb-4  w-full">
                    <div className="inline-flex space-x-4 items-center justify-center max-h-[3rem] w-full">
                        <div className="flex items-center justify-center w-12 h-full p-3 bg-white rounded-full">
                            <FaChevronLeft className="flex-1 h-full rounded-lg cursor-pointer" onClick={handlePrevMonth}/>
                        </div>
                        <div className="flex space-x-1 items-center justify-center max-h-[1.813rem] w-full">
                            <p className="text-xl font-bold leading-7 text-right text-gray-800">{meses[selectedDate.month()]}</p>
                            <p className="text-xl leading-7 text-gray-800">{selectedDate.year()}</p>
                        </div>
                        <div className="flex items-center justify-center w-12 h-full p-3 bg-white rounded-full">
                            <FaChevronRight className="flex-1 h-full rounded-lg cursor-pointer" onClick={handleNextMonth}/>
                        </div>
                    </div>
                    <div className="bg-black bg-opacity-10 w-full"/>
                    <div className="inline-flex space-x-0.5 items-start justify-start opacity-50 max-h-[1.438rem] w-full ">
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">DOM</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">SEG</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">TER</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">QUA</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">QUI</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">SEX</p>
                        <p className="flex-1 text-xs font-medium text-center text-gray-800 uppercase">SÁB</p>
                    </div>
                    <div className="flex flex-col items-start p-0 w-full overflow-y-auto h-[19rem]">
                        {renderCalendarDays()}
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