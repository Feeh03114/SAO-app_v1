
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
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
    const session:any = useSession();
    return(
        <>
            <Head>
                <title>
                    {session?.data?.menu?.find((x:any)=>x?.url==router?.pathname)?.namePage || title}
                </title>
            </Head>
            <MenuSideBar open={isOpenNavbar} setOpen={setIsOpenNavbar}/>
            <div className="h-full flex flex-col">
                <header style={{
                    display: !session?.data?'none':'block',
                }}>
                    <nav className="z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ">
                        <div className="px-3 py-3 lg:px-5 lg:pl-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-start">
                                    <button onClick={()=>setIsOpenNavbar(e=>!e)} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                        </svg>
                                    </button>
                                    <Image src='/assets/SVG/logo.svg' className="h-8 mr-3 flex ml-2 md:mr-24" alt="FlowBite Logo" width={130} height={130}/>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center ml-3">
                                        <div>
                                            <button onClick={()=>setIsOpenUser(e=>!e)} type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                                                <Image className="w-8 h-8 rounded-full" src='/assets/Nlogouniso.png' alt="avatar" width={10} height={10}/>
                                            </button>
                                            <MenuAvatar open={isOpenUser} onClose={()=>setIsOpenUser(e=>!e)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </>
    )
}

            /*  */