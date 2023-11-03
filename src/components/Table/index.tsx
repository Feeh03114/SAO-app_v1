import { ComponentProps } from "react";
import { AiOutlineEye } from "react-icons/ai";

export interface RegisterModelProps {
    children?: React.ReactNode;
    hiddenInMobile?: boolean;
    tableHeight?: string;
}

function TableRoot({ children, tableHeight } : RegisterModelProps): JSX.Element {
    if (tableHeight == undefined) {
        tableHeight = "calc(100vh-24rem)";
    } else {
        tableHeight = `${Number(tableHeight) * 48 + 42}px`;
    }
    console.log(tableHeight);
    return(
        <div className={`w-screen flex items-center justify-centers flex-col flex-wrap ${tableHeight == undefined && 'h-[calc(100vh-24rem)]'}`}>
            <div className="m-6 flex items-start justify-centers flex-col flex-wrap border bg-gray-50 dark:bg-slate-800 dark:border-slate-700 border-solid border-gray-200 shadow-sm rounded-lg overflow-hidden border-separate"    
                style={{
                    height: tableHeight,
                }}>
                <table className="w-full table-fixed">
                    {children}
                </table>
            </div>
        </div>
    );
}

interface ModalBodyPropsTr extends ComponentProps<'tr'> {}

const TableHeader = ({children, ...resp}:ModalBodyPropsTr) => {
    return (
        <thead className="bg-gray-50 dark:bg-slate-700">
            <tr className=" overflow-auto">
                {children}
                <th className="w-24"></th>        
            </tr>
        </thead>
    )
}

const TableCellHeader = ({children, hiddenInMobile}:RegisterModelProps) => {
    return(
        <th className={`px-6 py-3 text-start font-Inter text-xs font-medium leading-4 tracking-wide text-gray-500 dark:text-gray-200 ${hiddenInMobile && 'hidden md:table-cell'}`}>
            {children}
        </th>
    )
}

const TableRow = ({children, ...resp}:ModalBodyPropsTr) => {
    return(
        <tbody>
            <tr className="h-12">
                {children}
                <td className={`px-6 border font-Inter border-x-0 truncate bg-white border-gray-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-normal leading-5 text-gray-500 dark:text-gray-200`}>
                    <div className="h-full px-3 py-2 border rounded-md cursor-pointer">
                        <AiOutlineEye className="w-5 h-5 text-teal-500"/>
                    </div>
                </td>
            </tr>
        </tbody>
       
    )
}

const TableCell = ({children, hiddenInMobile}:RegisterModelProps) => {
    return(
        <td className={`px-6 border font-Inter border-x-0 truncate bg-white border-gray-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-normal leading-5 text-gray-500 dark:text-gray-200 ${hiddenInMobile && 'hidden md:table-cell'}`}>
            {children}
        </td>
    )
}

const Table = {
    Root: TableRoot,
    Header: TableHeader,
    CellHeader: TableCellHeader,
    Row: TableRow,
    CellBody: TableCell
}

export default Table;