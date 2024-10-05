import { BiFilterAlt } from 'react-icons/bi';
import { HiOutlineCheck, HiOutlinePencilAlt, HiOutlinePlus } from 'react-icons/hi';
import { ImFilesEmpty } from 'react-icons/im';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
    title: string;
    subtitle: string;
    textLeft?: string;
    textRight?: string;
    disabledLeft?: boolean;
    disabledRight?: boolean;
    onClickLeft?: () => void;
    onClickRight?: () => void;
    typeButtonLeft?: 'add' | 'edit' | 'confirm' | 'filter' |'files';
    typeButtonRight?: 'add' | 'edit' | 'confirm' | 'filter' | 'files';
}

export default function Header({title, subtitle, textLeft, textRight, disabledLeft, disabledRight, onClickLeft, onClickRight, typeButtonLeft, typeButtonRight, }:HeaderProps) {

    function renderButtonLeft() {
        switch (typeButtonLeft) {
            case 'add':
                return <HiOutlinePlus className="w-5 h-full rounded-lg text-white"/>
            case 'edit':
                return <HiOutlinePencilAlt className="w-5 h-full rounded-lg text-white"/>
            case 'confirm':
                return <HiOutlineCheck className="w-5 h-full rounded-lg text-white"/>
            case 'filter':
                return <BiFilterAlt className="w-5 h-full rounded-lg dark:text-white"/>
            case 'files':
                return <ImFilesEmpty className="w-5 h-full rounded-lg text-black"/>
        }
    }

    function renderButtonRight() {
        switch (typeButtonRight) {
            case 'add':
                return <HiOutlinePlus className="w-5 h-full rounded-lg text-white"/>
            case 'edit':
                return <HiOutlinePencilAlt className="w-5 h-full rounded-lg text-white"/>
            case 'confirm':
                return <HiOutlineCheck className="w-5 h-full rounded-lg text-white"/>
            case 'filter':
                return <BiFilterAlt className="w-5 h-full rounded-lg text-black"/>
            case 'files':
                return <ImFilesEmpty className="w-5 h-full rounded-lg text-black"/>
        }
    }

    let styleButtomLeft = "";
    if (typeButtonLeft === undefined && textLeft !== undefined) {
        styleButtomLeft = "sm-mobile:block";
    }

    return (
        <div className="w-full flex mt-8 items-center max-h-[3.125rem] px-[2rem] my-[2rem] justify-between">
            <div className='pr-4 text-start'>
                <p className="text-sm md:text-2xl font-bold leading-loose text-slate-900 dark:text-white">{title}</p>
                <p className="text-xs leading-none text-slate-400">{subtitle}</p>
            </div>
            <div className="flex">
                <button className="flex space-x-2 items-center justify-center py-2 pl-3 pr-4 dark:bg-slate-700 border rounded-md border-slate-300 dark:border-none cursor-pointer mr-[1rem] "
                    onClick={onClickLeft}
                    style={{
                        display: onClickLeft ? 'flex':'none',
                    }}
                    disabled={disabledLeft}
                >
                    {renderButtonLeft()}
                    <p className={twMerge("sm-mobile:hidden md:block text-sm font-medium leading-tight dark:text-white", styleButtomLeft)}>{textLeft}</p>
                </button>
                <button className="flex space-x-2 items-center justify-center py-2 pl-3 pr-3 bg-teal-500 border rounded-md border-teal-500 cursor-pointer"
                    onClick={onClickRight}
                    style={{
                        display: onClickRight ? 'flex' : 'none',
                    }}
                    disabled={disabledRight}
                >
                    {renderButtonRight()}
                    <p className="sm-mobile:hidden md:block text-sm font-medium leading-tight text-white">{textRight}</p>
                </button>
            </div>
        </div>
    );
}