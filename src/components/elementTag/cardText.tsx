import { InputHTMLAttributes } from "react";
import { HiOutlinePlus } from "react-icons/hi";

export interface CardTextProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode;
    label?: string;
    text?: string;
    width?: string;
    onClickButton?: () => void;
}

function CardRoot({children} : CardTextProps): JSX.Element {
    return(
        <div className="md:mx-10 md:mb-10 px-3 md:pt-6 pb-6 flex items-center justify-centers flex-row flex-wrap md:border border-gray-200 dark:border-gray-500 shadow-sm rounded-lg overflow-y-auto">
           {children}
        </div>
    );
}

const CardText = ({label, text, width} : CardTextProps) => {
    return (
        <div className={`${width} mb-3 md:mb-6 px-3 flex items-center justify-centers flex-col flex-wrap`}>
            <div className="w-full pl-4 inline-flex items-center justify-start">
                <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-gray-300 truncate">{label}</p>
            </div>
            <div className="w-full h-7 md:h-10 px-4 py-2 shadow-sm border rounded-lg border-gray-300 dark:border-gray-500">
                <p className="text-xs md:text-sm font-Inter font-normal leading-tight text-gray-500 truncate">{text}</p>
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

const CardSelected = ({children, label, width} : CardTextProps) => {
    return (
        <div className={`${width} mb-3 md:mb-6 px-3 flex items-center justify-centers flex-col flex-wrap`}>
            <div className="w-full pl-4 inline-flex items-center justify-start">
                <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-gray-300 truncate">{label}</p>
            </div>
            <div className="w-full h-24 px-3 py-4 flex flex-wrap items-start justify-start shadow-sm border rounded-lg border-gray-300 dark:border-gray-500">
                {children}
            </div>
        </div>
    )
}

const TextSelected = ({text} : CardTextProps) => {
    return (
        <div className="px-2 m-1 border rounded-2xl bg-teal-100">
            <p className="text-xs font-Inter font-medium leading-4 text-teal-800">{text}</p>
        </div>
    )
}

const Card = {
    Root: CardRoot,
    Text: CardText,
    Button: CardButton,
    CardSelected: CardSelected,
    TextSelected: TextSelected
}

export default Card;