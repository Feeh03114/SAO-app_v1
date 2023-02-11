// import { AiOutlineMenuFold } from "@react-icons/all-files/ai/AiOutlineMenuFold";
// import { BiHomeCircle } from "@react-icons/all-files/bi/BiHomeCircle";
// import { BiSend } from "@react-icons/all-files/bi/BiSend";
// import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
// import { GrMoney } from "@react-icons/all-files/gr/GrMoney";
// import { HiOutlineNewspaper } from "@react-icons/all-files/hi/HiOutlineNewspaper";

import React, { ReactNode } from "react";
import { MenuSideBartai } from "./components/MenuTai";

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const menus =[
//     {name: "Pagina Inicial", link:'/', icon: BiHomeCircle, margin:true},
//     {name: "Agenda", link:'/', icon: BsCalendarFill, margin:true},
//     {name: "Encaminhamento", link:'/', icon: BiSend, margin:true},
//     {name: "Financeiro", link:'/', icon: GrMoney, margin:true},
//     {name: "Exames", link:'/', icon: HiOutlineNewspaper, margin:true},

// ];

// // eslint-disable-next-line react-hooks/rules-of-hooks
// const [open, setOpen] = useState(true)
// export function Home(): JSX.Element{
//     return(
//         <section classNameName="flex gap-6">
//     <div classNameName={`bg-[#ffff] min-h-screen ${open ? 'w-72': 'w-16'} duration-500 text-black px-4 shadow-sm`}>
//                 <div classNameName="py-20 flex justify-end">
//                     <AiOutlineMenuFold size={26} classNameName='cursor-point' onClick={()=>setOpen(!open)}/>
//                 </div>
//                 <div classNameName="mt-20 flex flex-col gap-4 relative">
//                     {
//                         menus?.map((menu,i) => (
//                         <Link to={menu?.link} key={i} classNameName={`${menu?.margin && 'mt-5'} flex items-center text-sm gap-3.5 p-3 hover:bg-blue-300 rounded-md font-poppins`}>
//                             <div>
//                                 {React.createElement(menu.icon, {size:'20'})}
//                             </div>
//                             <h2>{menu?.name}</h2>
//                         </Link>
//                         ))
//                     }

//                 </div>
//             </div>
//             <div classNameName="font-semibold">Teste</div>
//         </section>
//     )
// }

interface SidebarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    title: string;
    children: ReactNode;
}

/* export function SideBar({title, children, ...rest}:SidebarProps): JSX.Element{
    
    return(
        <section className="flex">
            <head>SAO | {title}</head>
            <MenuSideBar/>
            
            <div className="w-full flex-col items-center pt-2">
                <div className="container flex flex-wrap items-center justify-between mx-5 bg-slate-800">
                    <div className="items-center ">
                        <button data-target="#navbar-menu" type="button" 
                            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                            aria-controls="navbar-menu"
                            data-toggle="collapse"
                        >
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        </button>
                        <strong className="ml-5 text-center ">
                            SAO | {title}
                        </strong>
                    </div>
                   
                    <button className="items-center">
                        <img className="mx-auto h-12 w-auto" src={logo} alt="avatar"/>
                    </button>
                </div>
                <div className="font-semibold" {...rest}>{children}</div>
            </div>
        </section>
    )
} */


export function SideBar({title, children, ...rest}:SidebarProps){
    return(
        <>
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <a href="https://flowbite.com" className="flex ml-2 md:mr-24">
                                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Flowbite</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ml-3">
                                <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo"/>
                                </button>
                                </div>
                                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                                <div className="px-4 py-3" role="none">
                                    <p className="text-sm text-gray-900 dark:text-white" role="none">
                                        Neil Sims
                                    </p>
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                                        neil.sims@flowbite.com
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                                    </li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <MenuSideBartai />
        </>
        
    )
}