import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

export interface RegisterModelProps {
    children?: React.ReactNode;
    hiddenInMobile?: boolean;
    hiddenInDesktop?: boolean;
    tableHeight?: string;
    style?: string;
    label?: string;
}

function TableRoot({ children, tableHeight, style, label } : RegisterModelProps): JSX.Element {
    const style1 = style == undefined ? "" : style;
    const style2 = style == undefined ? "m-6" : "";
    style == undefined && "m-6";
    if (tableHeight == undefined) {
        tableHeight = "calc(100vh-24rem)";
    } else {
        tableHeight = `${Number(tableHeight) * 48 + 42}px`;
    }

    return(
        <div className={`${style1} w-screen flex items-center justify-centers flex-col flex-wrap ${tableHeight == undefined && 'h-[calc(100vh-24rem)]'}`}>
            {label != undefined &&
                <div className="w-full pl-4 inline-flex items-center justify-start">
                    <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-gray-300 truncate">{label}</p>
                </div>
            }
            <div className={`${style2} flex items-start justify-centers flex-col flex-wrap border bg-gray-50 dark:bg-slate-800 dark:border-slate-700 border-solid border-gray-200 shadow-md rounded-lg overflow-hidden border-separate`}   
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

const TableHeader = ({children, style} : RegisterModelProps) => {
    return (
        <thead className="bg-gray-100 dark:bg-slate-700">
            <tr className="overflow-auto">
                {children}
                <th className={twMerge("w-32", style)}></th>          
            </tr>
        </thead>
    )
}

const TableCellHeader = ({children, hiddenInMobile, hiddenInDesktop, style}:RegisterModelProps) => {
    const [styleCell, setStyleCell] = useState("");

    useEffect(() => {
        if (hiddenInMobile && hiddenInDesktop) {
            setStyleCell("hidden");
        } else if ((!hiddenInMobile || hiddenInMobile == undefined)  && hiddenInDesktop) {
            setStyleCell("md:hidden");
        } else if (hiddenInMobile && (!hiddenInDesktop || hiddenInMobile == undefined)) {
            setStyleCell("hidden md:table-cell");
        } else {
            setStyleCell("table-cell");
        }
    }, [hiddenInMobile, hiddenInDesktop]);

    const finalStyle = styleCell + " " + style;

    return(
        <th className={twMerge("px-6 py-3 text-start font-Inter text-xs font-medium leading-4 tracking-wide text-gray-500 dark:text-gray-200", finalStyle)}>
            {children}
        </th>
    )
}

interface TableRowProps extends RegisterModelProps {
    onView?: () => void;
    onDelete?: () => void;
}

const TableRow = ({children, style, onView, onDelete }:TableRowProps) => {
    return(
        <tbody>
            <tr className="h-12">
                {children}
                <td className={twMerge("h-full px-0 border font-Inter border-x-0 bg-white border-gray-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-normal leading-5 text-gray-500 dark:text-gray-200 aria-hidden:hidden", style)}
                    aria-hidden={(onView == undefined && onDelete == undefined) ? true : false}
                >
                    <div className="flex items-center justify-end">
                        <button className="h-full mr-4 px-3 py-2 border dark:border-gray-500 rounded-md cursor-pointer aria-hidden:hidden"
                            onClick={onView}
                            aria-hidden={onView == undefined ? true : false}
                        >
                            <AiOutlineEye className="w-5 h-5 text-teal-500"/>
                        </button>
                        <button className="h-full mr-4 px-3 py-2 border dark:border-gray-500 rounded-md cursor-pointer aria-hidden:hidden"
                            onClick={onDelete}
                            aria-hidden={onDelete == undefined ? true : false}    
                        >
                            <FiTrash2 className="w-5 h-5 text-teal-500"/>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    )
}

const TableCell = ({children, hiddenInMobile, hiddenInDesktop, style}:RegisterModelProps) => {
    const [styleCell, setStyleCell] = useState("");

    useEffect(() => {
        if (hiddenInMobile && hiddenInDesktop) {
            setStyleCell("hidden");
        } else if ((!hiddenInMobile || hiddenInMobile == undefined)  && hiddenInDesktop) {
            setStyleCell("md:hidden");
        } else if (hiddenInMobile && (!hiddenInDesktop || hiddenInMobile == undefined)) {
            setStyleCell("hidden md:table-cell");
        } else {
            setStyleCell("table-cell");
        }
    }, [hiddenInMobile, hiddenInDesktop]);

    const finalStyle = styleCell + " " + (style||'');
    return(
        <td className={twMerge("pl-6 font-Inter text-sm font-normal leading-5 text-gray-500 dark:text-gray-200 border border-x-0 bg-white border-gray-200 dark:border-slate-700 dark:bg-slate-800", finalStyle)}>
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