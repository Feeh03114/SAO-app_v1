import { InputHTMLAttributes } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export interface CardTextProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    label?: string;
    text?: string;
    width?: string;
    styles?: string;
    onClickButton?: () => void;
}

function CardRoot({children, styles} : CardTextProps): JSX.Element {
    return(
        <div className={twMerge("md:mx-10 md:mb-10 px-3 md:pt-6 pb-6 flex items-center justify-centers flex-row flex-wrap md:border shadow-md border-gray-200 dark:border-gray-500 bg-white dark:bg-slate-800 rounded-lg overflow-y-auto", styles)}>
           {children}
        </div>
    );
}

const CardText = ({label, text, width} : CardTextProps) => {
    return (
        <div className={twMerge("mb-3 md:mb-6 px-3 flex items-center justify-centers flex-col flex-wrap", width)}>
            <div className="w-full pl-4 inline-flex items-center justify-start">
                <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-gray-300 truncate">{label}</p>
            </div>
            <div className="w-full h-10 px-4 flex items-center shadow-sm border rounded-lg border-gray-300 dark:border-gray-500 bg-white dark:bg-slate-700">
                <p className="text-xs md:text-sm font-Inter font-normal leading-tight dark:text-white truncate">{text}</p>
            </div>
        </div>
    )
}

const CardTextArea = ({label, text, width} : CardTextProps) => {
    return (
        <div className={`${width} mb-3 md:mb-6 px-3 flex items-center justify-centers flex-col flex-wrap`}>
            <div className="w-full pl-4 inline-flex items-center justify-start">
                <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-gray-300 truncate">{label}</p>
            </div>
            <div className="w-full h-40 px-4 flex items-start shadow-sm border rounded-lg border-gray-300 dark:border-gray-500 bg-white dark:bg-slate-700">
                <p className="mt-4 text-xs md:text-sm font-Inter font-normal leading-tight dark:text-white break-all">{text}</p>
            </div>
        </div>
    )
}

const CardButton = ({text, width, onClickButton} : CardTextProps) => {
    return (
        <div className={`${width} px-3 flex items-center justify-center flex-row`}>
            <button className={`mb-3 md:mb-6 px-3 py-2 flex items-center justify-center flex-row bg-teal-500 border rounded-md border-teal-500 cursor-pointer`}
                onClick={onClickButton}
            >
                <HiOutlinePlus className="w-5 h-5 rounded-lg text-white"/>
                <p className="hidden md:block pl-2 text-sm font-Inter font-medium leading-tight text-white dark:text-gray-300 truncate">{text}</p>
            </button>
        </div>
    )
}
interface CardLineProps {
    style?: string;
}


const CardLine = ({style} : CardLineProps) => {
    return (
        <div className={twMerge("w-full mb-6 mx-4 border rounded-lg border-gray-200 dark:border-gray-500 bg-white dark:bg-slate-700", style)}/>
    )
}

const CardSelected = ({children, label, styles} : CardTextProps) => {
    return (
        <div className={twMerge("px-2 flex items-center justify-centers flex-col", styles)}>
            <div className="w-full pl-4 inline-flex items-center justify-start">
                <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-gray-300 truncate">{label}</p>
            </div>
            <div className="w-full h-24 px-3 py-4 flex flex-wrap items-start justify-start shadow-sm border rounded-lg border-gray-300 dark:border-gray-500">
                {children}
            </div>
        </div>
    )
}

const TextSelected = ({text, onClick} : CardTextProps) => {
    return (
        <div className="px-2 m-1 border rounded-2xl bg-teal-100 hover:cursor-pointer hover:bg-teal-200"
            onClick={onClick}
        >
            <p className="text-xs font-Inter font-medium leading-4 text-teal-800">{text}</p>
        </div>
    )
}

const Card = {
    Root: CardRoot,
    Text: CardText,
    TextArea: CardTextArea,
    Button: CardButton,
    Line: CardLine,
    CardSelected: CardSelected,
    TextSelected: TextSelected
}

export default Card;