import { Poppins, Sora } from "next/font/google";
import Image from 'next/image';
import { useState } from "react";
import { IconType } from "react-icons";
import { IoIosArrowDown } from 'react-icons/io';
import { twMerge } from "tailwind-merge";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900" ]
})

const sora = Sora({
    subsets: ['latin'],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800" ]
})

interface IHomeProps {
    icon?: IconType;
    title: string;
    description: string;
}


export function CartInfo({icon:Icon, title, description}:IHomeProps){
    return(
    <div className='w-80 lg:w-auto h-14 lg:h-20 flex px-4 bg-gradient-96 from-teal-500 to-teal-600 rounded-xl gap-3 items-center'>
        {Icon&&<Icon className='w-10 h-10 text-white'/>}
        <div className='flex flex-col w-auto'>
        <span className="text-white text-sm lg:text-lg font-semibold leading-normal">
            {title}
        </span>
        <span className={twMerge(sora.className,"hidden lg:block max-w-[14rem] opacity-80 text-white text-xs font-normal leading-none")}>
            {description}
        </span>
        </div>
    </div>
  )
}

export function CartInfo2({title, description}:IHomeProps){
    return(
        <div className="flex p-8 w-80 bg-white rounded-3xl shadow flex-col justify-start items-start gap-3">
            <span className="text-center text-black text-xl md:text-2xl font-medium leading-tight">
                {title}
            </span>
            <span className={twMerge(sora.className,"text-slate-500 text-sm font-normal leading-tight")}>
                {description}
            </span>
        </div>
    )
}

export function CartInfo2Mobile({title, description}:IHomeProps){
    const [isExpanded, setIsExpanded] = useState(true);
    
    return(
        <div className="w-80 p-8 flex flex-col justify-center items-center bg-white rounded-3xl shadow gap-3"
            onClick={() => setIsExpanded(!isExpanded)}>
            <div className="flex flex-row justify-center items-center">
                <span className="mr-12 text-center text-xl md:text-2xl font-medium leading-tight text-black">
                    {title}
                </span>
                <IoIosArrowDown/>
            </div>
            <span className={twMerge(sora.className,"aria-hidden:hidden mt-2 text-center text-slate-500 text-sm font-normal leading-tight")}
                aria-hidden={isExpanded}>
                {description}
            </span>
        </div>
    )
}

interface ICartIntegrantesProps {
    imagem: string;
    title: string;
    description: string;
    urlLinkedin:string;
}

export function CartIntegrantes({imagem = '/assets/avatar_doutor.png', title, description, urlLinkedin}:ICartIntegrantesProps){
    return(
        <div className="max-w-[18rem] p-6 md:p-8 md:bg-white md:rounded-3xl flex-col justify-start items-center gap-3 md:gap-6 inline-flex md:shadow">
            <Image src={imagem} width={360} height={360} className="w-20 md:w-72 rounded-full" alt='avatar_integrantes' />
            <div className="flex-col gap-3 flex">
                <span className={twMerge("mx-auto text-center text-black text-xl md:text-2xl font-semibold leading-tight", poppins.className)}>
                    {title}
                </span>
                <span className={twMerge("text-slate-500 text-sm font-normal leading-tight", sora.className)}>
                    {description}
                </span>
            </div>
            <button className={twMerge("mx-auto h-12 md:h-14 px-7 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-end items-center inline-flex", sora.className)}
                onClick={()=>window.open(urlLinkedin,"_blank")}
            >
                <div className="text-white text-sm md:text-lg font-semibold whitespace-nowrap">Acessar Linkedin</div>
            </button>
        </div>
    )
}