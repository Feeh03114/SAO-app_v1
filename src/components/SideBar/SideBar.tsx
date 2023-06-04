
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { MdChevronRight } from "react-icons/md";
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
                            <MdChevronRight className="cursor-pointer" onClick={()=>setIsOpenNavbar(e=>!e)}/>
                        </div>
                        <div className="flex space-x-6 items-center justify-end pl-4 pr-8 max-h-[2.75rem] w-full">
                            <div className="flex items-center justify-center p-1 bg-white rounded-full">
                                <TbBell className="flex-1 h-full rounded-lg"/>
                            </div>
                            <div className="flex items-center justify-center p-1 bg-white rounded-full">
                                { isDarkMode?  <FaMoon className="flex-1 h-full rounded-lg cursor-pointer" onClick={()=>setIsDarkMode(!isDarkMode)}/> : <FaSun className="flex-1 h-full rounded-lg cursor-pointer" onClick={()=>setIsDarkMode(!isDarkMode)}/> }
                            </div>
                            <div className="flex space-x-3 items-center justify-start">
                                <Image className="w-10 h-10 rounded-full" src="/assets/Nlogouniso.png" alt="avatar" width={40} height={40}/>
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
