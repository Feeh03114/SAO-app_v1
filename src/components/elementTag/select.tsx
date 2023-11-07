/* eslint-disable @typescript-eslint/no-empty-function */
import { Control, Controller } from "react-hook-form";

export interface Option {
    id: number;
    name: string;
}

export interface RegisterModelProps {
    label: string;
    placeHolder?: string;
    data?: Option[];
    children?: React.ReactNode;
    control: Control;
}

function Select({ label, placeHolder, data, control }:RegisterModelProps & { control: Control }): JSX.Element {
    return(
        <Controller
            name='servico'
            control={control}
            render={({ field }) => (
                <>
                    <label className="pl-4 text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-white">{label}</label>
                    <select 
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full h-7 md:h-10 px-4 py-0 md:py-2 text-sm shadow-sm border rounded-lg border-gray-300 dark:border-gray-500 truncate placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400"
                        placeholder="Selecione o serviço odontológico"
                    >
                        <option value="" disabled selected>{placeHolder}</option>
                        {Array.isArray(data) && data.map((item: Option) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </>
            )}
        />
    );
}

export default Select;