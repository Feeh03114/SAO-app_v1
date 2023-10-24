
interface FieldProps {
    size: string;
    label: string;
    data: string;
}

export function Field({ size, label, data }:FieldProps) {
    return (
        <div className={`w-1/2 mt-4 ${size}`}>
            <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">{label}</label>
            <div className="mx-2 text-sm p-1 pl-2 leading-6 rounded-lg dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-500 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400">
                {data}
            </div>
        </div>
    )
}