import { fieldsProps, optionsProps } from ".";
import { Input } from '../elementTag/input';
import { Modal } from "../elementTag/modal";
interface FilterProps{
    fields: fieldsProps[];
    isFilterOpen: boolean;
    setIsFilterOpen: (value: boolean) => void;
    filter:(value: any) => void;
}

export function Filter({fields, isFilterOpen, setIsFilterOpen, filter}: FilterProps){
    function gridSpan(field: fieldsProps | optionsProps){
        let classStyle = "";
        for (const [key, value] of Object.entries(field)) {
            if(key.startsWith("gridColumns")) {
                const breakpoint = key.replace("gridColumns", "") ? `${key.replace("gridColumns", "")}:` : "";
                classStyle += ` ${breakpoint.toLowerCase()}col-span-${value}`;
            }
        }
        return classStyle || " col-span-6";
    }

    return(
        <Modal isOpen={isFilterOpen} onClose={()=>setIsFilterOpen(!isFilterOpen)}>
            <div className="w-full h-full flex-1 bg-white dark:bg-gray-600 dark:text-white ">
                <h1 className=" ml-3 pt-5 text-3xl font-bold">Filtros</h1>
                <div className="grid grid-cols-12 w-full">
                    {fields.filter((column) => column.filter).map((column, index) => (
                        <div key={index+column.property}  
                            className={`m-3 mb-2 mt-5${gridSpan(column)}`}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                {column?.label?.charAt(0).toUpperCase() + column?.label?.slice(1)}
                            </label>
                            <Input
                                /*  onChange={(e)=>setFilter({...filter, [column.property]: e.target.value})}
                                value={filter[column.property]} */
                                type={column?.type || "text"}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                                ${column?.type === "number" ? "text-right" : ""} ${column.options && 'hidden'}`} 
                            />
                            {
                                (column.options && !column.optionsMulti) &&
                                (column.options.length >3?
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                    {column.options.map((option, index) => (
                                        <option key={index+option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>:
                                <div className="grid grid-cols-3">
                                    {column?.options?.map((option, index) => (
                                        <div key={index+option.value} className={`col-span-1 inline-flex items-center ${column.options?.length !== index && 'ml-2'}`}>
                                            <input type="radio" id={option.value} name={option.value} value={option.value} />
                                            <label className="ml-2" htmlFor={option.value}>{option.label}</label>
                                        </div>
                                    ))}
                                </div>)
                            }
                            {
                                column.optionsMulti && (
                                    <div className={`grid grid-cols-${12} w-full`}>
                                        {column?.options?.map((option, index) => (
                                            <div key={index+option.value} className={`${gridSpan(option)} inline-flex items-center`}>
                                                <input type="checkbox" id={option.value} name={option.value} value={option.value} className="rounded"/>
                                                <label className="ml-2" htmlFor={option.value}>{option.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>    
                <div className="flex justify-between m-3 mb-2 mt-5">
                    <div className="inline ml-auto">
                        <button onClick={()=>setIsFilterOpen(!isFilterOpen)}
                            className="border border-teal-700 bg-transparen text-teal-700 font-bold py-2 px-4 rounded mr-1">
                            Cancelar
                        </button>
                        <button onClick={()=>filter('olá')}
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}