
import { GetIcon } from "@/util/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import { MdChevronRight } from "react-icons/md";

export function MenuSideBar({open, setOpen}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    const {data} = useSession();
    const router = useRouter();
    const [menu, setMenu] = React.useState<any[]>([]);

    function validRouter(url:string){
        if(url === router.pathname) return true;
        return false;
    }

    useEffect(() => {
        const rotesMobile = ['/schedule', '/waiting-line', '/patients']
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if(isMobile) setMenu(data?.menu?.filter((x:any)=>rotesMobile.includes(x?.url))||[]);
        else setMenu(data?.menu||[]);

        window.addEventListener('resize', ()=>{
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if(isMobile) setMenu(data?.menu?.filter((x:any)=>rotesMobile.includes(x?.url))||[]);
            else setMenu(data?.menu||[]);
        })
        return () => {
            window.removeEventListener('resize', ()=>{
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if(isMobile) setMenu(data?.menu?.filter((x:any)=>rotesMobile.includes(x?.url))||[]);
                else setMenu(data?.menu||[]);
            });
        }
    }, [data]);

    return(
        <Fragment>
            <div className="fixed z-10 h-full bg-white dark:bg-gray-800">
                <div className="bg-white dark:bg-gray-800 transform duration-500 ease-in-out fixed inline-flex flex-col items-start justify-start md:w-56 w-full shadow md:dark:shadow-gray-400 h-full" 
                    style={{transform: `${open ? 'translateX(0%)' : 'translateX(-100%)'}`}}
                    aria-label="Sidebar">
                    <div className="flex flex-col space-y-10 items-start justify-start w-full pt-5 pb-4">
                        <div className="inline-flex space-x-4 items-center justify-start w-full px-4">
                            <div className="flex items-center justify-center flex-1">
                                <Image className="w-12 h-full" src="/assets/logo1.png" width={157} height={32} alt="logo"/>
                            </div>
                            <MdChevronRight className="transform -rotate-180 rounded-lg cursor-pointer dark:text-white" size={24} onClick={()=>setOpen((e)=>!e)}/>
                        </div>
                        <div className="flex flex-col space-y-6 items-start justify-start w-full flex-1 px-2 ">
                            {menu?.map((menu: any, i: number) => (
                                <Link 
                                    href={menu?.url||"/"} 
                                    onClick={()=>setOpen(false)}
                                    key={i}
                                    className={`inline-flex items-center justify-start w-full py-2 pl-2 pr-3 rounded-md no-underline ${validRouter(menu?.url) && "bg-teal-50 dark:bg-teal-700"}`}
                                >
                                    <div className="flex space-x-3 items-center justify-start">
                                        <GetIcon iconText={menu.icon} className={`w-1/6 h-full ${validRouter(menu?.url)? 'text-teal-500': 'text-gray-600 dark:text-gray-400'}`}/>
                                        <p className={`text-base font-medium leading-normal whitespace-nowrap ${validRouter(menu?.url) ? "text-gray-900 dark:text-gray-50": 'text-gray-600 dark:text-gray-400'}`}>{menu?.namePage}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}