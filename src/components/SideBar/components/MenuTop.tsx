import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { TbBell } from "react-icons/tb";
import { MenuAvatar } from "./MenuAvatar";


export function MenuTop({setIsOpenNavbar}:{setIsOpenNavbar:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [isOpenUser, setIsOpenUser] = useState(false);
    const session = useSession();

    return(
        <div className={`w-full absolute z-10`}>
            <div className="w-full h-20 bg-teal-400 dark:bg-slate-800 shadow-md aria-hidden:hidden" style={{
                boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
            }}
                aria-hidden={Object.keys(session?.data || {}).length===0}
            >
                <div className="inline-flex items-center justify-start p-4 h-20 w-full">
                    <div className="z-10 flex items-center justify-start">
                        <HiOutlineMenu className={`cursor-pointer text-white`} size={24} onClick={()=>setIsOpenNavbar(e=>!e)}/>
                    </div>
                    <div className="z-10 flex space-x-6 items-center justify-end pl-4 pr-4 md:pr-8 max-h-[2.75rem] w-full">
                        <div className="flex items-center justify-center p-1 rounded-full">
                            <TbBell className="flex-1 h-full rounded-lg text-white w-[1.5rem]"/>
                        </div>
                        <div className="flex space-x-3 items-center justify-start">
                            <Image className="w-10 h-10 rounded-full cursor-pointer" onClick={() => setIsOpenUser(true)} src="/assets/Nlogouniso.png" alt="avatar" width={40} height={40}/>
                            
                            <div className="flex-col items-start justify-start hidden md:inline-flex">
                                <p className="text-base font-medium leading-normal text-white dark:text-white">{session.data?.user?.name}</p>
                                <p className="text-sm font-medium leading-tight text-slate-100 dark:slate-500">{session.data?.user?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MenuAvatar open={isOpenUser} onClose={setIsOpenUser}/>
        </div>
    )
}