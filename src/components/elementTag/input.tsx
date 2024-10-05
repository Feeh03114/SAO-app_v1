import { ForwardRefRenderFunction, InputHTMLAttributes, forwardRef, useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    password?: boolean;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
    label?: string;
    required?: boolean;
    email?: string;
}

const InputBase:ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ password = false, error = null, label, className, required, email, ...rest }, ref) => {  
    const [showPassword, setShowPassword] = useState(true);
    return(
        <>
            {
                password?
                    <div className="relative w-full">
                        <input className={twMerge("w-full h-10 px-4 py-3 text-sm font-medium leading-tight truncate dark:text-white placeholder-slate-500 dark:placeholder-white shadow-sm border rounded-lg border-slate-300 dark:border-slate-500 dark:bg-slate-700 focus:border-teal-400 focus:outline-none focus:ring-teal-400", className)}
                            type={showPassword? "password": 'text'}
                            {...rest}
                            ref={ref}
                        />
                        
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                            <svg className={`h-6 dark:text-slate-400 text-slate-700 fill=none ${showPassword&&'invisible hidden'} ${!showPassword&&'block'}`} fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowPassword(!showPassword)}
                            viewBox="0 0 576 512">
                                <path fill="currentColor"
                                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                </path>
                            </svg>
                            <svg className={`h-4 md:h-6 dark:text-slate-400 text-slate-700 ${!showPassword&&'invisible hidden'} ${showPassword&&'block'}`} fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>setShowPassword(!showPassword)}
                            viewBox="0 0 640 512">
                                <path fill="currentColor"
                                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                </path>
                            </svg>
                        </div>
                    </div>
                :
                <>
                    <label className={`${label == undefined && "hidden"} pl-4 text-sm font-Inter font-medium leading-tight text-slate-700 dark:text-white truncate`}>{label}<span className={`${required == undefined && "hidden"} text-red-500`}>*</span></label>
                    <input className={twMerge("w-full h-10 px-4 py-3 text-sm font-medium leading-tight truncate dark:text-white placeholder-slate-500 dark:placeholder-white shadow-sm border rounded-lg border-slate-300 dark:border-slate-500 dark:bg-slate-700 focus:border-teal-400 focus:ring-teal-400", className)}
                        {...rest}
                        ref={ref}
                    />
                    <div className={`${email == undefined ? "hidden" : "inline-flex"} w-2/5 h-10 right-0 inline-flex justify-evenly items-center bg-slate-100 dark:bg-slate-600 rounded-r-lg shadow border dark:border-slate-500 text-slate-900 placeholder-slate-500`}>
                        <MdEmail className=" text-slate-400 dark:bg-slate-600 hidden text-xl md:hidden xl:block"/>
                        <p className="text-sm dark:text-white dark:bg-slate-600 font-medium leading-tight truncate hover:text-clip">{email}</p>
                    </div>
                </>
            }
            {!!error && (
				<p className="text-red-500 text-sm">{error?.message?.toString()}</p>
			)}
        </>
    )
}

export const Input = forwardRef(InputBase);