import dayjs, { Dayjs } from "dayjs";

interface RenderFakeCalendarProps {
    selectedDate: Dayjs;
    nextMonth: boolean;
}

export default function RenderFakeCalendar({ selectedDate, nextMonth }:RenderFakeCalendarProps): JSX.Element {
    function isSameDay(date1: dayjs.Dayjs, date2: dayjs.Dayjs) {
        return (
            date1.year() === date2.year() &&
            date1.month() === date2.month() &&
            date1.date() === date2.date()
        );
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
    
    return (
        <>
            {rows}
        </>
    );
}