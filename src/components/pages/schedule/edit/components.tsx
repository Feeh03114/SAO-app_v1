
interface FieldProps {
    size: string;
    label: string;
    data: string;
}

function Field({ size, label, data }:FieldProps) {
    return (
        <div className={`w-1/2 mt-4 ${size}`}>
            <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">{label}</label>
            <div className="mx-2 text-sm p-1 pl-2 leading-6 rounded-lg dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-500 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400">
                {data}
            </div>
        </div>
    )
}

import { AiOutlineArrowLeft, AiOutlineClockCircle } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { DateObject } from 'react-multi-date-picker';


interface HeaderProps {
    title: string;
    subtitle: string;
    textLeft?: string;
    textMiddle?: string;
    textRight?: string;
    onClickLeft?: () => void;
    onClickMiddle?: () => void;
    onClickRight?: () => void;
    typeButtonRight?: 'add' | 'edit' | 'confirm' ;
}

function HeaderSchedule({title, subtitle, textLeft, textMiddle, textRight, onClickLeft, onClickMiddle, onClickRight }:HeaderProps) {
    return (
        <div className="flex items-center max-h-12 w-full px-[2rem] my-[2rem] justify-between">
            <div className='text-start md:mx-6'>
                <p className="text-base md:text-2xl font-bold leading-6 text-gray-900 dark:text-white">{title}</p>
                <p className="text-sm leading-3 text-gray-500">{subtitle}</p>
            </div>
            <div className="flex md:mx-6">
                <div className="flex items-center justify-center p-2 bg-white border rounded-md border-gray-300 cursor-pointer mr-2"
                    onClick={onClickLeft}
                    style={{
                        display: onClickLeft ? 'flex':'none',
                    }}
                >
                    <AiOutlineArrowLeft className="w-5 h-5 rounded-lg text-gray-400 md:hidden"/>
                    <p className="text-sm font-medium leading-tight text-gray-700 hidden md:block">{textLeft}</p>
                </div>

                <div className="flex items-center justify-center p-2 bg-teal-500 border rounded-md border-teal-500 cursor-pointer mr-2"
                    onClick={onClickMiddle}
                    style={{
                        display: onClickMiddle ? 'flex' : 'none',
                    }}
                >
                    <AiOutlineClockCircle className="w-5 h-5 rounded-lg text-white"/>
                    <p className="sm-mobile:hidden ml-2 md:block text-sm font-medium leading-tight text-white">{textMiddle}</p>
                </div>

                <div className="flex items-center justify-center p-2 bg-teal-500 border rounded-md border-teal-500 cursor-pointer"
                    onClick={onClickRight}
                    style={{
                        display: onClickRight ? 'flex' : 'none',
                    }}
                >
                    <HiOutlinePencilAlt className="w-5 h-5 rounded-lg text-white"/>
                    <p className="sm-mobile:hidden ml-2 md:block text-sm font-medium leading-tight text-white">{textRight}</p>
                </div>
            </div>
        </div>
    );
}

interface HeaderScheduleProps {
    date: DateObject;
    selectedDate: DateObject | DateObject[];
    currentMonth: object;
    isSameDate: (arg1: DateObject, arg2: DateObject) => boolean;
    excludes?: DateObject[];
    weekDays?: number[];
}

const daySchedule = ({ date, selectedDate, currentMonth, isSameDate, excludes = [], weekDays = [] }: HeaderScheduleProps) => {
    const isWeekend = weekDays.includes(date.weekDay.index);

    if(excludes.some(exclude => isSameDate(date, exclude))) return {
        disabled: true,
        style: {
            color: 'gray',
            backgroundColor: 'transparent',
            hover:{
                backgroundColor: 'transparent',
            }
        },
        className: 'cursor-default',
    };

    if(!isWeekend) return {
        disabled: true,
        style: {
            color: 'gray',
            backgroundColor: 'transparent',
            hover:{
                backgroundColor: 'transparent',
            }
        },
        className: 'cursor-default',
    };
    
    return {}
}

export { Field, HeaderSchedule, daySchedule };

