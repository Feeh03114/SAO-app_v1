/* eslint-disable react/jsx-no-undef */
import { Dialog, Transition } from "@headlessui/react";
import { signOut, useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import { BsMoon, BsPerson, BsSun } from "react-icons/bs";
import { PiSignOutBold } from "react-icons/pi";

export function MenuAvatar({open, onClose}:{open:boolean, onClose: React.Dispatch<React.SetStateAction<boolean>>}){
    const {data}:any = useSession();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const html = document.querySelector('html') as HTMLElement;
        if (isDarkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [isDarkMode]);

    const handleClick = () => {
        window.location.href = `/users/edit/${data?.user?.id}`;
    };

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches)
            setIsDarkMode(true);
        else
            setIsDarkMode(false);
    }, []);

    return(
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className={`${open?'block': 'hidden'}`} onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel className={`rounded-lg bg-white dark:bg-gray-800 text-left transition-all fixed top-0 right-0 mt-20 mr-2 md:mr-28 w-56 z-50 shadow-lg flex justify-start`}>
                        <ul className="py-1" role="none">
                            <li>
                                <button
                                    className="w-56 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-teal-900 dark:hover:text-teal-100 flex justify-start"
                                    onClick={handleClick}
                                >
                                    <BsPerson className="inline-block w-5 h-5 mr-3"/>
                                    Perfil
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>setIsDarkMode(!isDarkMode)}
                                    className="w-56 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-teal-900 dark:hover:text-teal-100 flex justify-start"
                                >
                                    {isDarkMode ? <BsSun className='inline-block w-5 h-5 mr-3'/> : <BsMoon className='inline-block w-5 h-5 mr-3'/>}
                                    {isDarkMode ? 'Light' : 'Dark'}
                                </button>
                            </li>
                            <li>
                                <button onClick={()=>signOut()}
                                    className="w-56 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600 dark:text-gray-300 dark:hover:bg-teal-900 dark:hover:text-teal-100 flex justify-start"
                                >
                                    <PiSignOutBold className="inline-block w-5 h-5 mr-3"/>
                                    Sign out
                                </button>
                            </li>
                        </ul>
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition.Root>
    )
}