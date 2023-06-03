
import { GetIcon } from "@/util/icons";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { MdChevronRight } from "react-icons/md";

export function MenuSideBar({open, setOpen}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    const {data}:any = useSession();
    const router = useRouter();

    function validRouter(url:string){
        if(url === router.pathname) return true;
        return false;
    }

    return(
        <Fragment>
            <div className="fixed z-10 h-full">
                <div className="transform duration-500 ease-in-out fixed inline-flex flex-col items-start justify-start w-56 bg-white shadow h-full" 
                    style={{transform: `${open ? 'translateX(0%)' : 'translateX(-100%)'}`}}
                    aria-label="Sidebar">
                    <div className="flex flex-col space-y-10 items-start justify-start w-full pt-5 pb-4">
                        <div className="inline-flex space-x-4 items-center justify-start w-full px-4">
                            <div className="flex items-center justify-start flex-1">
                                <Image className="w-40 h-full rounded-lg" src="/assets/log1.png" width={157} height={32} alt="logo"/>
                            </div>
                            <MdChevronRight className="transform -rotate-180 w-5 h-5 rounded-lg cursor-pointer" onClick={()=>setOpen((e)=>!e)}/>
                        </div>
                        <div className="flex flex-col space-y-6 items-start justify-start w-full flex-1 px-2">
                            {data?.menu?.map((menu: any, i: number) => (
                                <Link 
                                    href={menu?.url||"/"} 
                                    key={i}
                                    className={`inline-flex items-center justify-start w-full py-2 pl-2 pr-3 rounded-md ${validRouter(menu?.url) && "bg-teal-50"}`}
                                >
                                    <div className="flex space-x-3 items-center justify-start">
                                        <GetIcon iconText={menu.icon} className={`w-1/6 h-full rounded-lg ${validRouter(menu?.url)? 'bg-teal-500': 'bg-teal-400'}`}/>
                                        <p className={`text-base font-medium leading-normal ${validRouter(menu?.url) ? "text-gray-900": 'text-gray-600'}`}>{menu?.namePage}</p>
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