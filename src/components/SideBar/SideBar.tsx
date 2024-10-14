import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { ReactNode, useState } from "react";
import { MenuSideBar } from "./components/MenuLef";
import { MenuTop } from './components/MenuTop';

interface SidebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    title: string;
    children: ReactNode;
}

export function SideBar({title, children, ...rest}:SidebarProps){
    const [isOpenNavbar, setIsOpenNavbar] = useState(false);
    const router = useRouter();
    const session = useSession();

    return(
        <>
            <Head>
                <title>
                    {session?.data?.menu?.find((x:any)=>x?.url==router?.pathname)?.namePage || title}
                </title>
            </Head>
            <div className="w-screen h-screen flex flex-col overflow-y-auto">
                <MenuTop setIsOpenNavbar={setIsOpenNavbar}/>
                <div className={`${Object.keys(session?.data || {}).length===0 ? "mt-0" : "mt-20"} w-full flex flex-row`}>
                    <MenuSideBar open={isOpenNavbar} setOpen={setIsOpenNavbar}/>
                    <main className={`${Object.keys(session?.data || {}).length===0 ? "w-full" : (isOpenNavbar ? 'w-screen md:w-[calc(100%-240px)] transform duration-500 ease-in-out' : 'w-screen md:w-full transform duration-500 ease-in-out h-[calc(100vh-80px)] overflow-hidden')} dark:bg-slate-900`}>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}