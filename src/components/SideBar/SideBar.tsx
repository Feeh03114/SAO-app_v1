
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { TbBell } from 'react-icons/tb';
import { MenuSideBar } from "./components/Menu";


interface SidebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    title: string;
    children: ReactNode;
}

export function SideBar({title, children, ...rest}:SidebarProps){
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const [isOpenUser, setIsOpenUser] = useState(false);
    const router = useRouter();
    const session:any = useSession();

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const html = document.querySelector('html') as HTMLElement;
        if (isDarkMode) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }, [isDarkMode]);

    return(
        <>
            <Head>
                <title>
                    {session?.data?.menu?.find((x:any)=>x?.url==router?.pathname)?.namePage || title}
                </title>
            </Head>
            <MenuSideBar open={isOpenNavbar} setOpen={setIsOpenNavbar}/>
            <div className="h-full flex flex-col">
                <div className="bg-white shadow-md max-h-[4.75rem] w-full" style={{
                    display: !session?.data?'none':undefined,
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
                }}>
                    <div className="inline-flex items-center justify-start p-4 max-h-[4.75rem] w-full">
                        <div className="flex items-center justify-start">
                            <button onClick={()=>setIsOpenNavbar(e=>!e)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="flex space-x-6 items-center justify-end pl-4 pr-8 max-h-[2.75rem] w-full">
                            <div className="flex items-center justify-center p-1 bg-white rounded-full">
                                <TbBell className="flex-1 h-full rounded-lg"/>
                            </div>
                            <div className="flex items-center justify-center p-1 bg-white rounded-full">
                                { isDarkMode?  <FaMoon className="flex-1 h-full rounded-lg" onClick={()=>setIsDarkMode(!isDarkMode)}/> : <FaSun className="flex-1 h-full rounded-lg" onClick={()=>setIsDarkMode(!isDarkMode)}/> }
                            </div>
                            <div className="flex space-x-3 items-center justify-start">
                                <Image className="w-10 h-10 rounded-lg" src="/assets/Nlogouniso.png" alt="avatar" width={40} height={40}/>
                                <div className="inline-flex flex-col items-start justify-start">
                                    <p className="text-base font-medium leading-normal text-gray-800">{session.data?.user?.nome}</p>
                                    <p className="text-sm font-medium leading-tight text-gray-500">{session.data?.user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </>
    )
}
