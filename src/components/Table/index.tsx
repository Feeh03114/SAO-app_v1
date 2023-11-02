import { ComponentProps } from "react";
import { AiOutlineEye } from "react-icons/ai";

export interface RegisterModelProps {
    children?: React.ReactNode;
    hiddenInMobile?: boolean;
}

function TableRoot({
    children,
}:RegisterModelProps): JSX.Element {
    return(
        <div className="w-screen flex items-center justify-centers h-[calc(100vh-24rem)]">
            <table className="w-full m-6 border dark:border-slate-700 border-solid border-gray-200 shadow-sm rounded-lg overflow-hidden border-separate table-fixed">
                {children}
            </table>
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

interface ModalBodyPropsTh extends ComponentProps<'th'> {}

const TableCellHeader = ({children, hiddenInMobile}:RegisterModelProps) => {
    return(
        <th className={`px-6 py-3 text-start font-Inter text-xs font-medium leading-4 tracking-wide text-gray-500 dark:text-gray-200 ${hiddenInMobile && 'hidden md:table-cell'}`}>
            {children}
        </th>
    )
}

const TableRow = ({children, ...resp}:ModalBodyPropsTr) => {
    return(
        <tr>
            {children}
            <th className="w-24 h-full py-2 border border-x-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center">
                <div className="px-2 py-1 border rounded-md dark:border-slate-600">
                    <AiOutlineEye className="w-5 h-5 text-teal-500 cursor-pointer"/>
                </div>
            </th>
        </tr>
    )
}

const TableCell = ({children, hiddenInMobile}:RegisterModelProps) => {
    return(
        <td className={`px-6 py-3 border font-Inter border-x-0 border-gray-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-normal leading-5 text-gray-500 dark:text-gray-200 ${hiddenInMobile && 'hidden md:table-cell'}`}>
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