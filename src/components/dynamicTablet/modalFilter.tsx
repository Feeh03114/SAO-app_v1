/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { getUppercaseFirstLetter } from '../../util/util';
import { Input } from '../elementTag/input';
import { Modal } from "../elementTag/modal";
import { fieldsProps, optionsProps } from "./type";
interface FilterProps{
    fields: fieldsProps[];
    isFilterOpen: boolean;
    setIsFilterOpen: (value: boolean) => void;
    filterSelected: any;
    filter:(value: any) => void;
}

export function ModalFilter({fields, isFilterOpen, setIsFilterOpen, filterSelected, filter}: FilterProps){
    const [filterSelect, setFilterSelect] = useState<any>(filterSelected);
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
    useEffect(() => {
        setFilterSelect(filterSelected);
    }, [filterSelected])
    /* useEffect(async () => {
        const newFields = [];
        for (const field of fields as fieldsProps[]) {
            if(field?.endpoint && !field?.options && field?.optionsMulti && field?.type === "list"){
                field.options = [];
                const {data} = await axios.get(field.endpoint);
                field.options = [];
                for (const item of data) {
                    console.log(item);
                    field.options.push({value: item?.id, label: item?.role});
                }
            }
            newFields.push(field);
        };
        fields = newFields;
    }, [filterSelect]) */
    return(
        <Modal isOpen={isFilterOpen} onClose={()=>setIsFilterOpen(!isFilterOpen)}>
            <div className="w-full h-full flex-1 bg-white dark:bg-gray-600 dark:text-white ">
                <h1 className=" ml-3 pt-5 text-3xl font-bold">Filtros</h1>
                <div className="grid grid-cols-12 w-full">
                    {fields.filter((column) => column.filter).map((column) => (
                        <div
                            className={`m-3 mb-2 mt-5${gridSpan(column)}`}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                {getUppercaseFirstLetter(column?.label)}
                            </label>
                            <Input
                                onChange={(e)=>setFilterSelect({...filterSelect, [column.property]: e.target.value})}
                                value={filterSelect[column.property]}
                                type={column?.type || "text"}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                                ${column?.type === "number" ? "text-right" : ""} ${column.options && 'hidden'}`} 
                            />
                            {
                                (column.options && !column.optionsMulti) &&
                                (column.options.length >3?
                                <select 
                                    onChange={(e)=>setFilterSelect({...filterSelect, [column.property]: e.target.value})}
                                    value={filterSelect[column.property]}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option selected disabled>Selecione uma opção</option>
                                    {column.options.map((option) => (
                                        <option value={option.value}>{getUppercaseFirstLetter(option.label)}</option>
                                    ))}
                                </select>:
                                <div className="grid grid-cols-3 gap-x-4">
                                    {column?.options?.map((option) => (
                                        <div className={`col-span-1 inline-flex items-center`}>
                                            <input 
                                                onChange={(e)=>setFilterSelect({...filterSelect, [column.property]: e.target.value})}
                                                checked={filterSelect[column.property] === option.value}
                                                value={option.value}
                                                type="radio"
                                                name={option.value}

                                            />
                                            <label className="ml-2" htmlFor={option.value}>{getUppercaseFirstLetter(option.label)}</label>
                                        </div>
                                    ))}
                                </div>)
                            }
                            {
                                column.optionsMulti && (
                                    <div className={`grid grid-cols-12 gap-x-5`}>
                                        {column?.options?.map((option) => (
                                            <div className={`${gridSpan(option)} inline-flex items-center`}>
                                                <input 
                                                  checked={filterSelect[column.property]?.includes(option.value)}
                                                  onChange={(e) => {
                                                    const newValue = e.target.checked ? [...(filterSelect[column.property] ?? []), option.value] : (filterSelect[column.property] ?? []).filter((value: any) => value !== option.value);
                                                    setFilterSelect({ ...filterSelect, [column.property]: newValue })
                                                  }}
                                                    type="checkbox"
                                                    name={option.value}
                                                    className="rounded"
                                                />
                                                <label className="ml-2" htmlFor={option.value}>{getUppercaseFirstLetter(option.label)}</label>
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
                        <button 
                            onClick={()=>{
                                console.log(filterSelect);
                                filter(filterSelect)
                                setIsFilterOpen(!isFilterOpen)
                            }}
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                            Aplicar
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}