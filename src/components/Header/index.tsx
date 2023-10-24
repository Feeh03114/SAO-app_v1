import { BiFilterAlt } from 'react-icons/bi';
import { HiOutlineCheck, HiOutlinePencilAlt, HiOutlinePlus } from 'react-icons/hi';

interface HeaderProps {
    title: string;
    subtitle: string;

    isFilterVisibled?: React.ReactNode;

    textLeft?: string;
    textRight?: string;
    onClickLeft?: () => void;
    onClickRight?: () => void;
    typeButtonRight?: 'add' | 'edit' | 'confirm' ;
}

export default function Header({title, subtitle, textLeft, textRight,  onClickLeft, onClickRight, typeButtonRight = 'add' , isFilterVisibled = false, }:HeaderProps) {

    function renderButtonRight() {
        switch (typeButtonRight) {
            case 'add':
                return <HiOutlinePlus className="w-5 h-full rounded-lg text-white"/>
            case 'edit':
                return <HiOutlinePencilAlt className="w-5 h-full rounded-lg text-white"/>
            case 'confirm':
                return <HiOutlineCheck className="w-5 h-full rounded-lg text-white"/>
        }
    }

    return (
        <div className="flex items-center max-h-[3.125rem] w-full px-[2rem] my-[2rem] justify-between">
            <div className='text-start'>
                <p className="text-2xl font-bold leading-loose text-gray-900 dark:text-white">{title}</p>
                <p className="text-sm leading-none text-gray-500">{subtitle}</p>
            </div>
            <div className="flex">
                <div className="flex space-x-2 items-center justify-center py-2 pl-3 pr-4 bg-white border rounded-md border-gray-300 cursor-pointer mr-[1rem] "
                    onClick={onClickLeft}
                    style={{
                        display: onClickLeft ? 'flex':'none',
                    }}
                >
                    <BiFilterAlt className="w-5 h-full rounded-lg" style={{
                        display: isFilterVisibled ? 'block' : 'none',
                    }}/>
                    <p className="sm-mobile:hidden md:block text-sm font-medium leading-tight text-gray-700">{textLeft}</p>
                </div>
                <div className="flex space-x-2 items-center justify-center py-2 pl-3 pr-3 bg-teal-500 border rounded-md border-teal-500 cursor-pointer"
                    onClick={onClickRight}
                    style={{
                        display: onClickRight ? 'flex' : 'none',
                    }}
                >
                    {renderButtonRight()}
                    <p className="sm-mobile:hidden md:block text-sm font-medium leading-tight text-white">{textRight}</p>
                </div>
            </div>
        </div>
    );
}