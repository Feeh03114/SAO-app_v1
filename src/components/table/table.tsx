import { useEffect, useState } from "react";

interface TableProps {
    title: string;
    property?: data[];
    datas?: any[];
    actions?: action[];
    filter?: boolean;
    search?: boolean;
    propertySearch?: 'label' | 'value' | 'filter' | 'visible';
}
interface action{
    label: string;
    action: () => void;
    selectable?: boolean;
    selectableAll?: boolean;
}

interface data {
    label: string;
    property: string;
    filter: boolean;
    visible: boolean;
}

export function DynamicTablet({title, actions = [], property = [], datas = [], filter: isFilter = false, search:isSearch = false, propertySearch = 'label'}: TableProps){
    const [search, setSearch] = useState<string>("");
    const [datasTablAll, setDataTableAll] = useState<any[]>(datas);
    const [datasTable, setDataTable] = useState<any[]>(datas);
    const [selected, setSelected] = useState<Array<data>>([]);

    function Search(){
        if(!propertySearch) alert("Propriedade de busca não informada!");
        setDataTable(datasTablAll.filter((item) => item[propertySearch].toLowerCase().includes(search.toLowerCase())));
    }

    useEffect(() => {
        setDataTable(datas);
        setDataTableAll(datas);
    }, [datas]);

    useEffect(() => {
        if(!(actions.filter((action:action) => action.selectable === true || action.selectableAll).length > 0)) return;
        if(datasTable[0].label !== "") setDataTable([{label: "", value: "", filter: false, visible: true}, ...datasTable]);
        
    }, [actions, datas, datasTablAll]);

    function Select(all:boolean, data?:data){
        if(all){
            if(selected.length === datasTable.length) setSelected([]);
            else setSelected(datasTable);
        }else
            if(data) 
                if(selected.includes(data)) setSelected(selected.filter(item => item !== data));
                else setSelected([...selected, data]);
    }

    return(
        <div className="w-full flex-1 px-3">
            <h1 className="text-3xl font-bold mb-1">{title}</h1>
            <div className="flex justify-between mb-1">
                <div className="inline">
                    {
                        actions.map((action, index) => (
                            <button key={index} className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
                            ${actions.length !== index && 'ml-1'}`}  onClick={action.action}>
                                {action.label}
                            </button>
                        ))
                    }
                </div>
                <div className="text-center align-center">
                    {isSearch && propertySearch &&
                        <div className="inline-block relative mr-1">
                            <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Search" />
                            <svg onClick={Search} className="h-5 w-5 text-gray-400 absolute inset-y-2 right-1" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    }
                    {isFilter &&       
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Filter
                        </button>
                    }
                </div>
            </div>
            <table className="w-full">
                <thead>
                    {
                        property.map((column, index) => (
                            column?.label === "" ?
                            <th key={index} className="w-1 sticky-top bg-gray-100 p-3 text-center"> 
                                <label className="ml-1">
                                    <input
                                        checked={selected?.length === datasTable?.length}
                                        onClick={()=>Select(true)}
                                        type="checkbox" 
                                        className="form-checkbox rounded"
                                    />
                                </label>
                            </th> :
                            <th key={index} className="sticky-top bg-gray-100 p-3 text-center">{column?.label?.charAt(0).toUpperCase() + column?.label?.slice(1)}</th>
                        ))
                    }
                </thead>
                <tbody className="p-1 table-auto">
                    {
                        datasTable.map((row, index) => (
                            row?.label !== "" &&
                            <tr key={index} className="p-3 items-center text-center">
                                {
                                    property.map((column, index) => 
                                        column?.label === "" ?
                                        <td key={index} className="w-1"> 
                                            <label className="ml-1">
                                                <input 
                                                    checked={selected?.includes(row)}
                                                    onClick={()=>Select(false, row)}
                                                    type="checkbox" 
                                                    className="form-checkbox rounded"
                                                />
                                            </label>
                                        </td> :
                                        <td key={index}>{row[column.property]}</td>
                                    )
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}