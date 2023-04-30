/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
import axios, { AxiosInstance } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { getUppercaseFirstLetter } from '../../util/util';
import { Input } from '../elementTag/input';
import { fieldsProps, metaDataCreateEditProps, optionsProps } from './type';
interface FilterProps{
    axios?:AxiosInstance
    endpoint?: string;
    metaData?: metaDataCreateEditProps;
    datas?: any[];
}

export function CreateEditTable({
    endpoint = "", 
    axios:axiosProperty = axios,
    metaData = {title: "Dynamic Table", fields: []},
    datas = [],
    
}: FilterProps){
    const [metadata, setMetadata] = useState<metaDataCreateEditProps>(metaData);
    const [data, setData] = useState<any>(datas);
    const router = useRouter();
    const {id} = router.query;

    function gridSpan(field: fieldsProps | optionsProps): string{
        let classStyle = "";
        for (const [key, value] of Object.entries(field)) {
            if(key.startsWith("gridColumns")) {
                const breakpoint = key.replace("gridColumns", "") ? `${key.replace("gridColumns", "")}:` : "";
                classStyle += ` ${breakpoint.toLowerCase()}col-span-${value}`;
            }
        }
        return classStyle || " col-span-6"; //sm-mobile:col-span-12 md-mobile:col-span-12 lg-mobile:col-span-12 xl-mobile:col-span-12
    }

    async function getDatasAPI(){
        try {
            const {data:dataAPI} = await axiosProperty.get(endpoint+"/"+id);
            setData(dataAPI);
        } catch (error:any) {
            if(error?.response?.data?.mensagem)
                toast.error(error?.response?.data?.mensagem, {position: "top-center", autoClose: 5000 });
            else console.error(error?.response?.data?.mensagem)
        }
    }

    async function getMetadataAPI(){
        try {
            const {data:MetadataAPI} = await axiosProperty.get(endpoint+"/metadata",
            {
                params: {
                    type: id ? "edit":"create"
                }
            });
            const newFields = [];
            for (const field of MetadataAPI?.fields as fieldsProps[]) {
                if(field?.endpoint && !field?.options && field?.optionsMulti && field?.type === "list"){
                    field.options = [];
                    const {data:optionsAPI} = await axiosProperty.get(field.endpoint);
                    field.options = [];
                    for (const item of optionsAPI) {
                        field.options.push(item);
                    }
                }
                newFields.push(field);
            };

            setMetadata({...MetadataAPI, fields: newFields});
        } catch (error: any) {
            if(error?.response?.data?.mensagem)
                toast.error(error?.response?.data?.mensagem, {position: "top-center", autoClose: 5000 });
            else console.error(error?.response?.data?.mensagem)
        }
    }

    useEffect(() => {
        if(!endpoint) return;
        if(!axiosProperty){
            toast.info("Axios não informado!", {position: "top-center", autoClose: 5000 });
            return;
        }
        getMetadataAPI();
        if(id) getDatasAPI();
    }, []);

    function save(newItem=false){
        if(id){
            axiosProperty.put(endpoint+"/"+id, data)
            .then((resp)=>{
                toast.success("Registro atualizado com sucesso!", {position: "top-center", autoClose: 5000 });
                newItem? setData({} as any):
                router.back();
            })
            .catch((error:any)=>{
                if(error?.response?.data?.mensagem)
                    toast.error(error?.response?.data?.mensagem, {position: "top-center", autoClose: 5000 });
                else console.error(error?.response?.data?.mensagem)
            });
        }else{
            axiosProperty.post(endpoint, data)
            .then((resp)=>{
                toast.success("Registro criado com sucesso!", {position: "top-center", autoClose: 5000 });
                newItem? setData({} as any):
                router.back();
            })
            .catch((error:any)=>{
                if(error?.response?.data?.mensagem)
                    toast.error(error?.response?.data?.mensagem, {position: "top-center", autoClose: 5000 });
                else console.error(error?.response?.data?.mensagem)
            });
        }
    }

    function multiSelected(option:optionsProps, column: fieldsProps){

        let checked = column?.propertyDTO? data[column?.property]?.includes(option.value) : data[column?.property]?.includes(option.value);
        function change(checked: boolean){
            if(column?.propertyDTO){
                const newValue = data[column?.propertyDTO] ?? [];
                if(checked)
                    newValue.push(option.value);
                else{
                    const index = newValue.findIndex((value: any) => value === option.value);
                    newValue.splice(index, 1);
                }
                setData({ ...data, [column?.propertyDTO]: newValue })
            }else{
                const newValue = data[column?.property] ?? [];
                if(checked)
                    newValue.push(option.value);
                else{
                    const index = newValue.findIndex((value: any) => value === option.value);
                    newValue.splice(index, 1);
                }
                setData({ ...data, [column?.property]: newValue })
            }
        }
        return (
            <div className={`${gridSpan(option)} inline-flex items-center`}>
                <input
                    key={option.value}
                    checked={checked}
                    onChange={(e) => change(e.target.checked)}
                    disabled={column?.disabled}
                    type="checkbox"
                    name={option.value}
                    className="rounded disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                />
                <label className="ml-2" htmlFor={option.value}>{getUppercaseFirstLetter(option?.label)}</label>
            </div>
        );
    }

    return(
        <>
            <ToastContainer />
            <div className="w-full bg-white dark:bg-gray-600 dark:text-white overflow-auto">
                <h1 className=" ml-3 pt-5 text-3xl font-bold">{metadata.title}</h1>
                <div className="flex sm:flex-end mt-1 mr-2">
                    <div className="sm:inline sm:ml-auto sm-mobile:w-full">
                        {
                            metadata?.actions?.map((action, index) => (
                                <button key={index+action.type} className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded disabled:bg-teal-900 disabled:text-white disabled:cursor-not-allowed
                                    ${metaData?.actions?.length !== index && 'ml-1'}
                                    sm-mobile:w-full sm-mobile:mb-1 sm:w-auto sm:mr-1 sm:mb-0
                                    `}
                                    onClick={async ()=>{
                                        switch (action.type) {
                                            case 'save':
                                                save();
                                                break;
                                            case 'save&new':
                                                save(true);
                                                break;
                                            case 'cancell':
                                                router.back();
                                                break;
                                        }
                                    }}
                                    //disabled={(action?.type === 'save' || action?.type === 'save&new') && !data}
                                >
                                    {action?.label ?getUppercaseFirstLetter(action?.label) : getUppercaseFirstLetter(action?.type)}
                                </button>
                            ))
                        }
                    </div>
                </div>
                <div className="grid grid-cols-12 overflow-y-scroll"
                 style={{
                    height: "calc(100vh - 15rem)",
                }}>
                    {metadata.fields.map((column) => (
                        <div
                            className={`m-3${gridSpan(column)} mb-10`}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                {getUppercaseFirstLetter(column?.label)}
                            </label>
                            <Input
                                onChange={(e)=>setData({...data, [column.property]: e.target.value})}
                                value={data[column.property]||""}
                                type={column?.type || "text"}
                                disabled={column?.disabled}
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                                ${column?.type === "number" ? "text-right" : ""} ${(column.options || column.optionsMulti || column?.type === "boolean" ) && 'hidden'}
                                disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
                                `} 
                            />
                            {
                                (column.options && !column.optionsMulti) &&
                                (column.options.length >3?
                                <select 
                                    onChange={(e)=>setData({...data, [column.property]: e.target.value})}
                                    value={data[column.property]||""}
                                    disabled={column?.disabled}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 
                                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
                                    disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                                >
                                    <option selected disabled>Selecione uma opção</option>
                                    {column.options.map((option) => (
                                        <option value={option.value}>{getUppercaseFirstLetter(column?.label)}</option>
                                    ))}
                                </select>:
                                <div className="grid grid-cols-3 gap-x-4 ">
                                    {column?.options?.map((option) => (
                                        <div className={`col-span-1 inline-flex items-center`}>
                                            <input 
                                                onChange={(e)=>setData({...data, [column.property]: e.target.value})}
                                                checked={(data[column.property] === option.value)||false}
                                                value={option.value}
                                                type="radio"
                                                disabled={column?.disabled}
                                                name={option.value}
                                                className="disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
                                            />
                                            <label className="ml-2" htmlFor={option.value}>{getUppercaseFirstLetter(column?.label)}</label>
                                        </div>
                                    ))}
                                </div>)
                            }
                            {
                                column.optionsMulti && (
                                    <div className={`grid grid-cols-12 gap-x-5`} key={column.property}>
                                        {column?.options ? column?.options?.map((option) => (
                                        multiSelected(option, column)
                                        )) :
                                        (<div className="col-span-12" key={column.property}>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                                Nenhuma opção disponível
                                            </label>
                                        </div>)
                                    }
                                    </div>
                                )
                            }
                            {
                                column?.type === "boolean" && (
                                    <div className="flex items-center">
                                        <button
                                            id={column.property}
                                            key={column.property}
                                            disabled={column?.disabled}
                                            className={`relative inline-flex items-center justify-center px-6 py-2 rounded-full ${
                                                data[column.property] ? "bg-teal-500" : "bg-teal-300"
                                            } disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed`}
                                            onClick={()=> setData({ ...data, [column.property]: !data[column.property] })}
                                        >
                                            <span
                                                className={`inline-block w-5 h-5 rounded-full bg-white shadow transform transition-all duration-300 ease-in-out`}
                                                style={{transform: `${(data[column.property]||false) ? 'translateX(100%)' : 'translateX(-100%)'}`}}
                                            />
                                        </button>
                                </div>
                                )    
                            }
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}