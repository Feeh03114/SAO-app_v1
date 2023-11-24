import { HiFilter, HiOutlineCheck, HiOutlinePencilAlt, HiOutlinePlus, HiX } from 'react-icons/hi';
import { ImFilesEmpty } from 'react-icons/im';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
    children?: React.ReactNode;
    title: string;
    subtitle: string;
}

function Root({children, title, subtitle}:HeaderProps) {
    return (
        <div className="w-full flex mt-8 items-center max-h-[3.125rem] px-[2rem] my-[2rem] justify-between">
            <div className='pr-4 text-start'>
                <p className="text-sm md:text-2xl font-bold leading-loose text-gray-900 dark:text-white">{title}</p>
                <p className="text-xs leading-none text-gray-400">{subtitle}</p>
            </div>
            <div className="flex">
               {children}
            </div>
        </div>
    );
}

interface ButtomProps {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    typeButton?: 'add' | 'edit' | 'confirm' | 'filter' |'files' |'delete';
    style?: string;
    textStyle?: string;
}

function Button({text, disabled, onClick, typeButton, style, textStyle} : ButtomProps) {
    function renderButton() {
        switch (typeButton) {
            case 'add':
                return <HiOutlinePlus className="w-5 h-full rounded-lg text-white"/>
            case 'edit':
                return <HiOutlinePencilAlt className="w-5 h-full rounded-lg text-white"/>
            case 'confirm':
                return <HiOutlineCheck className="w-5 h-full rounded-lg text-white"/>
            case 'filter':
                return <HiFilter className="w-5 h-full rounded-lg dark:text-white"/>
            case 'files':
                return <ImFilesEmpty className="w-5 h-full rounded-lg text-black"/>
            case 'delete':
                return <HiX className="w-5 h-full rounded-lg text-white"/>
        }
    }

    return (
        <button className={twMerge("flex space-x-2 items-center justify-center py-2 pl-3 pr-4 dark:bg-gray-700 border rounded-md border-gray-300 dark:border-none cursor-pointer mr-[1rem]", style)}
            disabled={disabled}
            onClick={onClick}
        >
            {renderButton()}
            <p className={twMerge("sm-mobile:hidden md:block text-sm font-medium leading-tight dark:text-white", textStyle)}>{text}</p>
        </button>
    )
}

const Header = {
    Root: Root,
    Button: Button,
}

export default Header;
