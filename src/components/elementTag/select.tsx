/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Control, Controller, FieldError, FieldErrorsImpl, FieldValues, Merge } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export interface Option {
    id: number;
    name: string;
}

export interface RegisterModelProps {
    name: string;
    label?: string;
    placeHolder?: string;
    valueDefault?:any;
    data?: Option[];
    children?: React.ReactNode;
    control: Control<FieldValues>;
    disabled?: boolean;
    className?: string;
    valueTypeName?: boolean;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | null;
}

function Select({ error, name, label, placeHolder, valueDefault='', data=[], control, disabled, className, valueTypeName=false }:RegisterModelProps & { control: Control }): JSX.Element {
    return(
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <>
                    <label className={`${label === undefined && 'hidden'} pl-4 text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-white`}>{label}</label>
                    <select
                        disabled={disabled}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className={twMerge("aria-checked:mt-5 w-full h-10 px-4 py-0 md:py-2 text-sm shadow-sm dark:text-white border rounded-lg border-gray-300 dark:border-gray-500 truncate placeholder-gray-500 dark:bg-gray-700 focus:border-teal-400 focus:outline-none focus:ring-teal-400", 
                        className)}
                        aria-checked={!label}
                        placeholder="Selecione o serviço odontológico"
                    >
                        <option value={valueDefault} disabled selected>{placeHolder}</option>
                        {Array.isArray(data) && data.map((item: Option) => (
                            <option key={item.id} value={ valueTypeName ? item.name : item.id}>{item.name}</option>
                        ))}
                    </select>
                    {!!error && (
                        <p className="text-red-500 text-sm">{error?.message?.toString()}</p>
                    )}
                </>
            )}
        />
    );
}

export default Select;