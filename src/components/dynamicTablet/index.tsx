/* eslint-disable react/jsx-key */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
import axios, { AxiosInstance } from "axios";
import dayjs from 'dayjs';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaListAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip';
import { getUppercaseFirstLetter } from "../../util/util";
import { ModalFilter } from './modalFilter';
import { actionProps, metaDataProps, typeProps } from "./type";

interface TableProps {
    axios?:AxiosInstance
    endpoint?: string;
    metaData?: metaDataProps;
    datas?: any[];
}

export default function DynamicTablet(
    {
        endpoint = "",
        axios:axiosProperty = axios,
        metaData = {title: "Dynamic Table", fields: []},
        datas = []
    }
    : TableProps
    ){
    const [datasTablAll, setDataTableAll] = useState<any[]>(datas);
    const [datasTable, setDataTable] = useState<any[]>(datas);
    const [metadata, setMetadata] = useState<metaDataProps>(metaData);

    const [search, setSearch] = useState<string>("");
    const [selected, setSelected] = useState<Array<any>>([]);
    const [filterSelected, setFilterSelected] = useState<any>({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const router = useRouter();
    function Search(){
        const searchProperty = metaData.fields.filter(x=>x.search)
        if(searchProperty.length === 0) {
            toast.info("Nenhuma propriedade de busca informada!", {position: "top-center", autoClose: 5000 });
            return;
        }
        if(searchProperty.length > 1) {
            toast.info("Mais de uma propriedade de busca informada!", {position: "top-center", autoClose: 5000 });
            return;
        }
        setDataTable(datasTablAll.filter((item) => item[searchProperty[0].property].toLowerCase().includes(search.toLowerCase())));
    }

   /*  useEffect(() => {
        setDataTable(orderTable(datas, metadata));
        setDataTableAll(orderTable(datas, metadata));

        const fields: fieldsProps[] = [];
        for (const item of metaData.fields) {
            const field = {...item};
            field.directionSort = "asc";
            fields.push({...field});
        }
        setMetadata({...metaData, fields: fields});
    }, [datas,metaData]);*/

    async function getDatasAPI(){
        try {
            const resp = await axiosProperty.get(endpoint);
            setDataTable(orderTable(resp.data, metadata));
            setDataTableAll(orderTable(resp.data, metadata));
        } catch (error:any) {
            if(error?.response?.data?.mensagem)
                toast.error(error?.response?.data?.mensagem, {position: "top-center", autoClose: 5000 });
            else console.error(error?.response?.data?.mensagem)
        }
    }

    async function getMetadataAPI(){
        try {
            const resp = await axiosProperty.get(endpoint+"/metadata",
            {
                params: {
                    type: "list"
                }
            });
            setMetadata(resp.data);
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
        getDatasAPI()
    }, [endpoint,axiosProperty]);

    function Select(all:boolean, data?:any){
        if(all){
            if(selected.length === datasTable.length) setSelected([]);
            else setSelected(datasTable);
        }else
            if(data) 
                if(selected.includes(data)) setSelected(selected.filter(item => item !== data));
                else setSelected([...selected, data]);
    }

    async function Delete(action: actionProps){
        if(!action.selectable) {
            alert("Ação não selecionável!");
            return;
        }
        if(selected.length === 0) {
            alert("Nenhum item selecionado!");
            return;
        }
        let delatado = false;
        let isApi = false;
        try {
            if(!action?.axios && action?.endpoint) {
                const resp = await axiosProperty.delete(action?.endpoint, {data: selected});
                if(resp.status === 200)delatado = true;
                else delatado = true;
                isApi = true;
            }
            else if(action?.axios && action?.endpoint)  {
                const resp = await action?.axios.delete(action?.endpoint, {data: selected});
                if(resp.status === 200)delatado = true;
                else delatado = true;
                isApi = true;
            }else if(axiosProperty && metaData?.endpoint) {
                const resp = await axiosProperty.delete(metaData?.endpoint, {data: selected});
                if(resp.status === 200)delatado = true;
                else delatado = true;
                isApi = true;
            }else if(axiosProperty && endpoint) {
                const resp = await axiosProperty.delete(endpoint, {data: selected});
                if(resp.status === 200)delatado = true;
                else delatado = true;
                isApi = true;
            }else if(action?.action){
                action.action(selected);
                isApi = false;
            }
                
            if(delatado && isApi){
                toast.success("Deletado com sucesso!", {position: "top-center", autoClose: 5000 });
                setDataTable(datasTable.filter(item => !selected.includes(item)));
            }else if(isApi) toast.error("falha ao deletar!", {position: "top-center", autoClose: 5000 });
            
            setSelected([]);
        } catch (error:any) {
            console.error(error?.response?.data?.mensagem)
        }
    }

    function orderTable(dataTable: any, metadata?: metaDataProps, sortField?: string, directionSort: 'asc' | 'desc' = 'asc') {
        const direction = directionSort === 'asc' ? 1 : -1;
        const sortFieldobjet = metadata?.fields?.find(field => field.sort);
        if (sortFieldobjet) {
          dataTable.sort((a:any, b:any) => {
            if (a[sortFieldobjet.property] > b[sortFieldobjet.property]) return direction;
            if (a[sortFieldobjet.property] < b[sortFieldobjet.property]) return -direction;
            return 0;
          });
        }
        if(sortField) {
            dataTable.sort((a:any, b:any) => {
                if (a[sortField] > b[sortField]) return direction;
                if (a[sortField] < b[sortField]) return -direction;
                return 0;
            });

            setMetadata(e=>{
                return {...e , 
                    fields: e.fields.map(f=>f.property === sortField ? {...f, directionSort: directionSort === 'asc'? 'desc': 'asc'} : f)}});
        }

        return dataTable;
    }

    function parameterFilter(key: string, value?: string){
        const data = metadata?.fields?.find(x=>x.property === key);
        let title = '';
        let filter = '';
        if(data) {
            title = data?.label.charAt(0).toUpperCase() + data?.label.slice(1);
            filter = data?.options? 
            value ? data?.options?.find(x=>x.value === value)?.label :
            data.options?.find(x=>x.value === filterSelected[key])?.label : filterSelected[key];
        }

        return(
            <div className="flex flex-row items-center justify-center pl-3">
                <span className="text-sm font-bold">
                    {title}
                </span>
                <span className="text-sm font-bold">:</span>
                <span className="text-sm font-bold ml-1">{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
            </div>
        )
    }

    function formatText(text: any, type?:typeProps){
        switch(type) {
            case 'date':
              return text && dayjs(text).format('DD/MM/YYYY');
            case 'datetime':
              return text && dayjs(text).format('DD/MM/YYYY HH:mm:ss');
            case 'time':
              return text && dayjs(text).format('HH:mm:ss');
            case 'boolean':
              return text ? 'Sim' : 'Não';
            case 'currency':
              return text && text.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            case 'list':
                let list = "";
                if(!text) return list;
                if(!Array.isArray(text)) return text;

                text.forEach((item: any, index: number) => {
                    if(index === 0) list = item?.role?.charAt(0).toUpperCase() + item?.role?.slice(1);
                    else list = list + ", " + item?.role?.charAt(0).toUpperCase() + item?.role?.slice(1);
                });

              return (
                <>
                    <Tooltip anchorSelect=".list" className="bg-teal-800 p-2 rounded-xl text-white arre" />
                    <FaListAlt data-tooltip-content={list} className="list text-2xl cursor-pointer text-teal-500 hover:text-teal-800"/>
                </>
              )
                    
            default:
              return getUppercaseFirstLetter(text);
        }
    }

    function GetisKey(){
        const iskey = metadata?.fields?.filter(x=>x.key);
        if(iskey?.length > 1){
            toast.error("Apenas um campo pode ser chave!");
            return false;
        }
        if(iskey?.length === 0){
            toast.error("Nenhum campo foi definido como chave!");
            return false;
        }
        return true;
    }

  /*   if(location.pathname.includes('add'))
        return <Outlet />

    if(location.pathname.includes('edit'))
        return <Outlet /> */

    /* if(location.pathname.includes('view'))
        return <Outlet /> */

    return(
        <div className="w-full h-full flex-1 bg-white dark:bg-gray-600 dark:text-white">
            <h1 className=" ml-3 pt-5 text-3xl font-bold">{metadata.title}</h1>
            <div className=" justify-between m-3 mb-2 mt-5 sm-mobile:hidden sm:flex">
                <div className="inline">
                    {
                        metadata?.actions?.map((action, index) => (
                            <button key={index+action.type} className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded disabled:bg-teal-900 disabled:text-white disabled:cursor-not-allowed
                                ${metaData?.actions?.length !== index && 'ml-1'}`}
                                onClick={async ()=>{
                                    switch (action.type) {
                                        case 'adicionar':
                                            {router.push(`${location.pathname}/add`)};
                                            break;
                                        case 'editar':
                                            if(Object.keys(selected).length === 1 && GetisKey()) {router.push(`${location.pathname}/edit/${selected[0][metadata?.fields?.find(x=>x.key)?.property||'']}`)};
                                            break;
                                        case 'deletar':
                                            await Delete(action)
                                            break;
                                    }
                                }}
                                disabled={(action.selectable && selected.length === 0) || (action.type !== 'adicionar' && selected.length === 0) || (action.type === 'editar' && selected.length !== 1) || (action.type === 'deletar' && selected.length === 0)}
                            >
                                {action?.label ?getUppercaseFirstLetter(action?.label) : getUppercaseFirstLetter(action?.type)}
                            </button>
                        ))
                    }
                </div>
                <div className="text-center align-center">
                    <div className="inline-block relative mr-1">
                        <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search" />
                        <svg 
                            onClick={Search}
                            className="h-5 w-5 text-teal-400 absolute inset-y-2 right-1 hover:text-teal-600 cursor-pointer" 
                            fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    {metadata?.keepFilters &&
                        <button 
                            onClick={()=>setIsFilterOpen(!isFilterOpen)}
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                            Filter
                        </button>
                    }
                </div>
            </div>
            <div className="sm:hidden">
                <div className="w-full justify-center">
                    {
                        metadata?.actions?.map((action, index) => (
                            <button key={index+action.type} className={`bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded disabled:bg-teal-900 disabled:text-white disabled:cursor-not-allowed
                                ${metaData?.actions?.length !== index && 'ml-1'}`}
                                onClick={async ()=>{
                                    switch (action.type) {
                                        case 'adicionar':
                                            {router.push(`${location.pathname}/add`)};
                                            break;
                                        case 'editar':
                                            if(Object.keys(selected).length === 1 && GetisKey()) {router.push(`${location.pathname}/edit/${selected[0][metadata?.fields?.find(x=>x.key)?.property||'']}`)};
                                            break;
                                        case 'deletar':
                                            await Delete(action)
                                            break;
                                    }
                                }}
                                disabled={(action.selectable && selected.length === 0) || (action.type !== 'adicionar' && selected.length === 0) || (action.type === 'editar' && selected.length !== 1) || (action.type === 'deletar' && selected.length === 0)}
                            >
                                {action?.label ?getUppercaseFirstLetter(action?.label) : getUppercaseFirstLetter(action?.type)}
                            </button>
                        ))
                    }
                </div>
                <div className="text-center align-center m-1">
                    <div className="relative ">
                        <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search" />
                        <svg 
                            onClick={Search}
                            className="h-5 w-5 text-teal-400 absolute inset-y-2 right-1 hover:text-teal-600 cursor-pointer" 
                            fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                    {metadata?.keepFilters &&
                        <button 
                            onClick={()=>setIsFilterOpen(!isFilterOpen)}
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-1">
                            Filter
                        </button>
                    }
                </div>
            </div>
            <div className={`${Object.keys(filterSelected).length === 0 && 'hidden'} w-full mb-2`}>
                <div className=" mx-3 border border-teal-400 rounded-lg">
                    <div className="ml-5">
                        <strong>Apresentando resultados filtrados por:</strong>
                    </div>
                    <div className="flex flex-wrap overflow-hidden">
                        <div className="flex flex-row items-center justify-center m-1 border border-teal-200 rounded-xl">
                            <button
                                onClick={()=>setFilterSelected({})}
                                className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded-xl">
                                Remover todos
                            </button>
                        </div>
                        {
                            Object.keys(filterSelected).map((key) => 
                                Array.isArray(filterSelected[key]) ?
                                filterSelected[key].map((value:any) =>
                                    <div className="flex flex-row items-center justify-center m-1 border border-teal-200 rounded-xl">
                                    {parameterFilter(key, value)}
                                    <button
                                        onClick={()=>setFilterSelected((e:any)=>{
                                            const newFilter = {...e};
                                            if(newFilter[key].length === 1) delete newFilter[key];
                                            else newFilter[key] = newFilter[key].filter((x:any)=>x !== value);
                                            return newFilter;
                                        })}
                                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 ml-1 rounded-r-xl">
                                        X
                                    </button>
                                    </div>
                                )
                                :
                                <div className="flex flex-row items-center justify-center m-1 border border-teal-200 rounded-xl">
                                    {parameterFilter(key)}
                                    <button
                                    onClick={()=>setFilterSelected((e:any)=>{
                                        const newFilter = {...e};
                                        delete newFilter[key];
                                        return newFilter;
                                    })}
                                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 ml-1 rounded-r-xl">
                                        X
                                    </button>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="sm:flex justify-center overflow-auto border rounded-lg mx-1 max-h-[60vh] md:max-h-[70vh]" >
                <table className="overflow-scroll table-auto w-full" >
                    <thead className=" bg-teal-100 dark:bg-teal-900 rounded-lg w-full z-0">{/* fixed */}
                        <tr key="headerTable">
                            <th 
                                key='selectColumn'
                                className={
                                `w-1 sticky-top p-3 text-center
                                ${(metadata?.actions?.filter((action:actionProps) => action.selectable === true || action.selectableAll).length === 0) && 'hidden'}`}
                            > 
                                <label className={`ml-1  ${(metadata?.actions?.filter((action:actionProps) => action.selectableAll).length === 0) && 'hidden'}`}>
                                    <input
                                        checked={selected?.length === datasTable?.length}
                                        onChange={()=>Select(true)}
                                        type="checkbox" 
                                        className="form-checkbox rounded"
                                    />
                                </label>
                            </th> 
                            {
                                metadata?.fields?.filter(x=>x?.visible === undefined || x?.visible).map((column) => (
                                    <th key={column.property} className="sticky-top p-3 text-center align-center mx-auto">
                                        <div className="flex align-center">
                                            <strong className="text-teal-500 dark:text-teal-400 ">
                                                {getUppercaseFirstLetter(column?.label)}
                                            </strong>
                                            {column?.sortable && 
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={() => setDataTable(data => orderTable(data,undefined,column.property, column.directionSort))}
                                                className={`h-5 w-5 transition-all duration-300 
                                                    ${column.directionSort === 'asc' ? 'rotate-0' : 'rotate-180'}
                                                    text-teal-500 dark:text-teal-400
                                                    flex items-center justify-center ml-1 cursor-pointer hover:text-teal-600`}
                                                fill="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M7 9l5 5 5-5"
                                                />
                                            </svg>
                                            }
                                        </div>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="p-">
                        {
                            datasTable.map((row:any, index:number) => (
                                <tr key={metadata?.fields.find(x=>x?.key)?.property !== undefined ? row[metadata.fields.find(x=>x.key)?.property||""]: index} 
                                    className={`${index % 2 === 0 ? 'bg-teal-50 dark:bg-teal-400 ' : 'bg-teal-200 dark:bg-teal-500'} 
                                    hover:bg-teal-300 dark:hover:bg-teal-700 p-3 items-center text-center `}>
                                    {
                                    metadata?.fields?.filter(x=>x?.visible === undefined || x?.visible).map((column, indexColumn) => 
                                        (metadata?.actions?.filter((action:actionProps) => action.selectable === true || action.selectableAll).length !== 0) && indexColumn === 0?
                                            <>
                                                <td key={indexColumn+'select'+index} className="border-b-2 border-gray-400 py-2 px-3 w-2 "> 
                                                    <label className="ml-1">
                                                        <input 
                                                            checked={selected?.includes(row)}
                                                            onChange={()=>Select(false, row)}
                                                            type="checkbox" 
                                                            className="form-checkbox rounded"
                                                        />
                                                    </label>
                                                </td>
                                                <td key={`${column.property}-${index}`} className="border-b-2 border-gray-400 py-2 px-3">
                                                    <div className="flex align-center">
                                                    {
                                                        formatText(row[column.property], column?.type)
                                                    }
                                                    </div>
                                                </td>
                                            </>
                                        :
                                            <td key={`${column.property}-${index}`} className="border-b-2 border-gray-400 py-2 px-3">
                                                <div className="flex align-center">
                                                    {
                                                    formatText(row[column.property], column?.type)
                                                    }
                                                </div>
                                            </td>
                                        )
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {isFilterOpen&&<ModalFilter
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                fields={metadata.fields}
                filterSelected={filterSelected}
                filter={(e)=>setFilterSelected(e)}
            />}
        </div>
    )
}