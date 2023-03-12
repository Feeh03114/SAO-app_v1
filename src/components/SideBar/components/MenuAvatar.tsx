/* eslint-disable react/jsx-no-undef */
import { Fragment, useEffect, useState } from "react";
import { FaMoon, FaSignOutAlt, FaSun } from 'react-icons/fa';
import { useAuth } from "../../../hook/auth";


export function MenuAvatar({open, onClose}:{open:boolean, onClose:()=>void}){
    const {signOut, user} = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const html = document.querySelector('html') as HTMLElement;
        if (isDarkMode) {
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
        }
      }, [isDarkMode]);

    //if (!open) return null;

    return(
        <Fragment>
            <div className={`${open?'block': 'hidden'} fixed top-0 bottom-0 left-0 right-0 opacity-75 z-50`} onClick={onClose} />
                <div className={`fixed top-10 right-1 ${open?'block': 'hidden'} z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}>
                    <div className="px-4 py-3" role="none">
                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                        Nome: {user?.nome}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                        E-mail: {user?.email}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                            RU: {user?.ru}
                        </p>
                        {user?.cro &&
                            (
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                    {user?.ru}
                                </p>
                            )
                        }
                    </div>
                    <ul className="py-1" role="none">
                        <li>
                            <button
                                className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={()=>setIsDarkMode(!isDarkMode)}
                            >
                                {isDarkMode ? <FaSun className='inline-block  w-4 h-4 mr-2'/> : <FaMoon className='inline-block mr-1'/>}
                                {isDarkMode ? 'Light' : 'Dark'}
                            </button>
                        </li>
                        <li>
                        <button onClick={signOut}
                            className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                                <FaSignOutAlt className="inline-block w-4 h-4 mr-2" /> {/* tamanho do ícone: w-5 h-5 */}
                                Sign out
                        </button>
                        </li>
                    </ul>
                </div>
        </Fragment>
    )
}