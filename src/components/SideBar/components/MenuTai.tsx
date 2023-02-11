import { BiHomeCircle } from "@react-icons/all-files/bi/BiHomeCircle";
import { BiSend } from "@react-icons/all-files/bi/BiSend";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { HiOutlineNewspaper } from "@react-icons/all-files/hi/HiOutlineNewspaper";
import { MdAttachMoney } from "@react-icons/all-files/md/MdAttachMoney";
import React from "react";
import { Link } from "react-router-dom";

export function MenuSideBartai(){
    const menus =[
        {name: "Pagina Inicial", link:'/', icon: BiHomeCircle, margin:true},
        {name: "Agenda", link:'/', icon: BsCalendarFill, margin:true},
        {name: "Encaminhamento", link:'/', icon: BiSend, margin:true},
        {name: "Financeiro", link:'/', icon: MdAttachMoney, margin:true},
        {name: "Exames", link:'/', icon: HiOutlineNewspaper, margin:true},
    ];

    return(
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar font-poppins"> {/*dark:bg-gray-800*/}
            <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 text-gray-50"> {/* dark:bg-blue-300 text-gray-800*/}
                <ul className="space-y-2">
                    {
                        menus?.map((menu,i) => (
                            <li>
                                <Link to={menu?.link} key={i} className={`${menu?.margin && 'mt-5'} flex items-center text-sm gap-3.5 p-3 hover:bg-blue-500 rounded-md font-poppins`}>
                                    <div>
                                        {React.createElement(menu.icon, {size:'20'})}
                                    </div>
                                    <h2>{menu?.name}</h2>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}