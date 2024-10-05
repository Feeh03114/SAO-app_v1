import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { twMerge } from "tailwind-merge";

export interface RegisterModelProps {
    children?: React.ReactNode;
    hiddenInMobile?: boolean;
    hiddenInDesktop?: boolean;
    tableHeight?: string;
    rowNumber?: number;
    style?: string;
    label?: string;
}

function TableRoot({ children, label, style } : RegisterModelProps): JSX.Element {
    return(
        <div className={twMerge("w-full flex items-center flex-col flex-wrap", style)}>
            {label != undefined &&
                <div className="w-full pl-4 inline-flex items-center justify-start">
                    <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-slate-700 dark:text-slate-300 truncate">{label}</p>
                </div>
            }
            <div className="flex items-start justify-centers flex-col flex-wrap border bg-white dark:bg-slate-800 dark:border-slate-700 border-solid border-slate-200 shadow-md rounded-lg overflow-hidden border-separate">
                <table className="w-full table-fixed">
                    {children}
                </table>
            </div>
        </div>
    );
}

function TableBody({ children, tableHeight, rowNumber } : RegisterModelProps): JSX.Element {
    const newRowNumber = Number(tableHeight) - (rowNumber ?? 0);
    tableHeight = `h-[${Number(tableHeight) * 48}px]`;
   
    return (
        <tbody className={twMerge("table-fixed", tableHeight)}>
            {children}
            {Array(newRowNumber).fill(null).map((_, index) => (
                <tr key={index} className="h-12"></tr>
            ))}
        </tbody>
    );
}

const TableRow = ({children, style, onView, onDelete }:TableRowProps) => {
    return(
        <tr className="h-12">
            {children}
            <td className={twMerge("h-full px-0 border font-Inter border-x-0 bg-white border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm font-normal leading-5 text-slate-500 dark:text-slate-200 aria-hidden:hidden", style)}
                aria-hidden={(onView == undefined && onDelete == undefined) ? true : false}
            >
                <div className="flex items-center justify-end">
                    <button className="h-full mr-4 px-3 py-2 border dark:border-slate-500 rounded-md cursor-pointer aria-hidden:hidden"
                        onClick={onView}
                        aria-hidden={onView == undefined ? true : false}
                    >
                        <AiOutlineEye className="w-5 h-5 text-teal-500"/>
                    </button>
                    <button className="h-full mr-4 px-3 py-2 border dark:border-slate-500 rounded-md cursor-pointer aria-hidden:hidden"
                        onClick={onDelete}
                        aria-hidden={onDelete == undefined ? true : false}    
                    >
                        <FiTrash2 className="w-5 h-5 text-teal-500"/>
                    </button>
                </div>
            </td>
        </tr>
    )
}

const TableHeader = ({children, style} : RegisterModelProps) => {
    return (
        <thead className="bg-teal-400 dark:bg-slate-700">
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
        <th className={twMerge("px-3 md:px-6 py-3 text-start font-Inter text-xs font-medium leading-4 tracking-wide text-white dark:text-slate-200", finalStyle)}>
            {children}
        </th>
    )
}

interface TableRowProps extends RegisterModelProps {
    onView?: () => void;
    onDelete?: () => void;
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
        <td className={twMerge("pl-3 md:pl-6 font-Inter text-sm font-normal leading-5 text-slate-500 dark:text-slate-200 border border-x-0 bg-white border-slate-200 dark:border-slate-700 dark:bg-slate-800", finalStyle)}>
            {children}
        </td>
    )
}

const Table = {
    Root: TableRoot,
    Body: TableBody,
    Header: TableHeader,
    CellHeader: TableCellHeader,
    Row: TableRow,
    CellBody: TableCell
}

export default Table;