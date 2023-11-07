import { Sora } from "next/font/google";
import Image from 'next/image';
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

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
    <div className='flex px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl gap-3 items-center'>
        {Icon&&<Icon className='w-10 h-10 text-white'/>}
        <div className='flex flex-col w-auto'>
        <span className="text-center text-white text-lg font-semibold">
            {title}
        </span>
        <span className={twMerge(sora.className,"max-w-[14rem] opacity-80 text-white text-xs font-normal leading-none")}>
            {description}
        </span>
        </div>
    </div>
  )
}

export function CartInfo2({title, description}:IHomeProps){
    return(
        <div className="p-8 w-80 bg-white rounded-3xl shadow flex-col justify-start items-start gap-3 inline-flex">
            <span className="text-center text-black text-2xl font-medium leading-tight">
                {title}
            </span>
            <span className={twMerge(sora.className," text-slate-500 text-sm font-normal leading-tight")}>
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
        <div className="max-w-[18rem] p-8 bg-white rounded-3xl flex-col justify-start items-start gap-6 inline-flex shadow">
            <Image src={imagem} width={360} height={360} className="rounded-full" alt='avatar_integrantes' />
            <div className="flex-col gap-3 flex">
                <span className="mx-auto text-center text-black text-2xl font-semibold leading-tight">
                    {title}
                </span>
                <span className={twMerge(sora.className,"text-slate-500 text-sm font-normal leading-tight")}>
                    {description}
                </span>
            </div>
            <button className={twMerge(sora.className,
                "mx-auto h-14 px-7 py-4 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full shadow justify-end items-center inline-flex")}
                onClick={()=>window.open(urlLinkedin,"_blank")}
            >
                <div className="text-white text-lg font-semibold whitespace-nowrap">Acessar Linkedin</div>
            </button>
        </div>
    )
}