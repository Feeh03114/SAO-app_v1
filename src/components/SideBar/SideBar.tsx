
import packageJson from '@/../package.json';
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { HiOutlineMenu } from 'react-icons/hi';
import { TbBell } from 'react-icons/tb';
import { MenuSideBar } from "./components/Menu";
import { MenuAvatar } from "./components/MenuAvatar";

interface SidebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    title: string;
    children: ReactNode;
}

export function SideBar({title, children, ...rest}:SidebarProps){
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const [isOpenUser, setIsOpenUser] = useState(false);
    const router = useRouter();
    const session = useSession();

    return(
        <>
            <Head>
                <title>
                    {session?.data?.menu?.find((x:any)=>x?.url==router?.pathname)?.namePage || title}
                </title>
            </Head>
            <MenuSideBar open={isOpenNavbar} setOpen={setIsOpenNavbar}/>
            <div className="h-screen flex flex-col">
                <div className="bg-teal-400 dark:bg-gray-800 shadow-md w-full aria-hidden:hidden" style={{
                    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
                }}
                    aria-hidden={Object.keys(session?.data || {}).length===0}
                >
                    <div className="inline-flex items-center justify-start p-4 max-h-[4.75rem] w-full">
                        <div className="flex items-center justify-start">
                            <HiOutlineMenu className="cursor-pointer text-white" size={24} onClick={()=>setIsOpenNavbar(e=>!e)}/>
                        </div>
                        <div className="flex space-x-6 items-center justify-end pl-4 pr-4 md:pr-8 max-h-[2.75rem] w-full">
                            <div className="flex items-center justify-center p-1 rounded-full">
                                <TbBell className="flex-1 h-full rounded-lg text-white w-[1.5rem]"/>
                            </div>
                            <div className="flex space-x-3 items-center justify-start">
                                <Image className="w-10 h-10 rounded-full cursor-pointer" onClick={() => setIsOpenUser(true)} src="/assets/Nlogouniso.png" alt="avatar" width={40} height={40}/>
                                
                                <div className="flex-col items-start justify-start hidden md:inline-flex">
                                    <p className="text-base font-medium leading-normal text-white dark:text-white">{session.data?.user?.name}</p>
                                    <p className="text-sm font-medium leading-tight text-gray-100 dark:gray-500">{session.data?.user?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MenuAvatar open={isOpenUser} onClose={setIsOpenUser}/>
                <main className="flex-1 dark:bg-gray-900 overflow-y-auto">
                    <span className="absolute bottom-0 right-2">{`v ${packageJson.version}`}</span>
                    {children}
                </main>
            </div>
        </>
    )
}
