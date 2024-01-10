import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef, useEffect, useRef, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { VscTriangleDown } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
    label?: string;
    required?: boolean;
}

function hourCalc(minutes: number): number {
    return Math.floor(minutes / 60);
}

function minuteCalc(minutes: number): string {
    return (minutes % 60).toString().padStart(2, '0');
}

const mock = {
    "start": 540,
    "end": 1080,
    "durationMedio": 30,
    "times": [],
}

function timeToMinutes(time: string): number {
    let hour = parseInt(time.split(":")[0]);
    let minute = parseInt(time.split(":")[1]);
    return hour * 60 + minute;
}

const ClockBase:ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ error = null, label, className, required, ...rest }, ref) => {
    const [openClock, setOpenClock] = useState(false);
    const [inputValue, setInputValue] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [times, setTimes] = useState<any>([]);
    const clockRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: any) => {
            if (!clockRef.current?.contains(event.target)) {
                setOpenClock(false);
            }
        }
        document.addEventListener("mousedown", handler);
    });

    function handleOpenClock() {
        setOpenClock(!openClock);
    }

    function allTime(mock: any): void {
        let result = [];
        for (let i = mock.start; i <= mock.end; i += mock.durationMedio) {
            if (i <= mock.end - mock.durationMedio) {
                let isBusy = false;
                mock.times.forEach((item: any) => {
                    if (item == i) {
                        isBusy = true;
                    }
                });
                !isBusy && result.push(hourCalc(i) + ":" + minuteCalc(i));
            }
        }
        setTimes(result);
    }

    function initialTime(): number {
        let date = new Date();
        let dateInMinutes = date.getHours() * 60 + date.getMinutes();
        
        for (let index = 0; index < times.length; index++) {
            const item = times[index];
            console.log("item: " + timeToMinutes(item) + " index: " + index + " dateInMinutes: " + dateInMinutes);
        
            if (timeToMinutes(item) > dateInMinutes) {
              console.log("Resultado: " + index);
              return index;
            }
        }

        return 0;
    }

    useEffect(() => {
        allTime(mock);
    }, []);

    useEffect(() => {
        openClock ? setTime(initialTime) : setInputValue(times[time]?.padStart(5, '0'));
    }, [openClock]);

    return(
        <div className="flex flex-col justify-center items-center">
            {openClock &&
                <> 
                    <div ref={clockRef} className="z-10 absolute w-20 h-32 mb-[164px] flex flex-col justify-center bg-slate-800 border rounded-lg border-slate-400 focus:border-teal-400 focus:ring-teal-400 select-none" autoFocus onFocus={() => console.log("focus")}>
                        <div className="flex flex-row justify-center items-center focus:border-teal-400 focus:ring-teal-400">
                            <div className="w-9 h-9 text-teal-500 hover:text-slate-200 text-4xl hover:bg-teal-500 rounded-full cursor-pointer"
                                onClick={() => time + 1 >= times.length ? setTime(times.length - 1) : setTime(time + 1)}
                            >
                                <HiChevronUp/>
                            </div>
                        </div>

                        <div className="flex flex-row justify-center items-center">
                            <div className="w-7 h-10 text-slate-200 text-xl flex justify-center items-center">{times[time]}</div>
                        </div>

                        <div className="flex flex-row justify-center items-center focus:border-teal-400 focus:ring-teal-400">
                            <div className="w-9 h-9 text-teal-500 hover:text-slate-200 text-4xl hover:bg-teal-500 rounded-full cursor-pointer"
                                onClick={() => time - 1 < 0 ? setTime(0) : setTime(time - 1)}
                            >
                                <HiChevronDown/>
                            </div>
                        </div>
                    </div>
                    <div className="absolute z-10 -mt-7">
                        <VscTriangleDown className="w-6 h-6 text-white" />
                    </div>
                </>
            }
            <label className={`${label == undefined && "hidden"} w-full text-left pl-4 text-sm font-Inter font-medium leading-tight text-slate-700 dark:text-white truncate`}>{label}<span className={`${required == undefined && "hidden"} text-red-500`}>*</span></label>
            <input className={twMerge("w-full h-10 mt-1 px-4 py-3 text-sm font-medium leading-tight truncate dark:text-white placeholder-slate-500 dark:placeholder-white shadow-sm border rounded-lg border-slate-300 dark:border-slate-500 dark:bg-slate-700 focus:border-teal-400 focus:ring-teal-400", className)}
                {...rest}
                ref={ref}
                value={inputValue}
                onClick={handleOpenClock}
            />
            {!!error && (
				<p className="text-red-500 text-sm">{error?.message?.toString()}</p>
			)}
        </div>
    )
}

export const Clock = forwardRef(ClockBase);