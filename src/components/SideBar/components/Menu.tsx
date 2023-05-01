import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { Input } from "../../elementTag/input";

export function MenuSideBar({open, setOpen}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    const {data}:any = useSession();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{
        if(!open) setIsOpen(false);
    },[open])

    return(
        <Fragment>
            <div className="fixed">
                <div className={`${open?'block': 'hidden'} fixed top-0 bottom-0 left-0 right-0 opacity-75`} onClick={()=>setOpen(e=>!e)} />
                <aside
                    className={`transform duration-500 ease-in-out fixed top-0 left-0 w-64 h-screen
                    bg-gray-400  dark:bg-gray-800 dark:border-gray-700`}
                    style={{transform: `${open ? 'translateX(0%)' : 'translateX(-100%)'}`}}
                    aria-label="Sidebar"> {/*dark:bg-gray-800*/}
                    <div className="h-full overflow-y-auto dark:bg-gray-800 text-gray-50"> {/* dark:bg-blue-300 text-gray-800*/}
                        <Input type="text" placeholder="Pesquisar" className="mt-12 relative block w-full appearance-none border-blue-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                        <ul className="space-y-2">
                        {data?.menu?.map((menu: any, i: number) => (
                            <li key={i}>
                                {menu?.pages?.length > 0 && !menu?.url ? (
                                    <div
                                        className={`flex items-center text-sm p-3 hover:bg-blue-500 font-poppins ${
                                            isOpen ? "bg-blue-500 text-white" : ""
                                        }`}
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        {/* <div>
                                            <Icon name={menu?.icon} size={20} className=""/>
                                        </div> */}
                                        <h2>{menu?.namePage}</h2>
                                    </div>
                                ) : (
                                    <Link
                                        href={menu?.url}
                                        key={i}
                                        className={` flex items-center text-sm p-3 hover:bg-blue-500  font-poppins`}
                                    >
                                        {/* <div>
                                            <Icon name={menu?.icon} size={20} className=""/>
                                        </div> */}
                                        <h2>{menu?.namePage}</h2>
                                    </Link>
                                )}
                                <ul
                                    className={` ${
                                    isOpen ? "opacity-100 transition-all" : "opacity-0 h-0"
                                    } bg-slate-700`}
                                >
                                    {menu?.pages?.map((page: any, e: number) => (
                                    <li key={`${i}-${e}`}>
                                        <Link
                                        href={page?.url}
                                        key={`${i}-${e}`}
                                        className={` flex items-center text-sm p-3 hover:bg-blue-500 font-poppins`}
                                        >
                                            {/* <div>
                                                <Icon name={menu?.icon} size={20} className=""/>
                                            </div> */}
                                            <h2>{page?.namePage}</h2>
                                        </Link>
                                    </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                        </ul>
                        <div className="fixed top-3 right-3">
                            <button onClick={()=>setOpen(e=>!e)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <svg className="w-3 h-3" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </Fragment>
    )
}