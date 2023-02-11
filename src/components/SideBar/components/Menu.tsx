import { BiHomeCircle } from "@react-icons/all-files/bi/BiHomeCircle";
import { BiSend } from "@react-icons/all-files/bi/BiSend";
import { BsCalendarFill } from "@react-icons/all-files/bs/BsCalendarFill";
import { GrMoney } from "@react-icons/all-files/gr/GrMoney";
import { HiOutlineNewspaper } from "@react-icons/all-files/hi/HiOutlineNewspaper";
import React from "react";
import { Link } from "react-router-dom";

export function MenuSideBar(){
    const menus =[
        {name: "Pagina Inicial", link:'/', icon: BiHomeCircle, margin:true},
        {name: "Agenda", link:'/', icon: BsCalendarFill, margin:true},
        {name: "Encaminhamento", link:'/', icon: BiSend, margin:true},
        {name: "Financeiro", link:'/', icon: GrMoney, margin:true},
        {name: "Exames", link:'/', icon: HiOutlineNewspaper, margin:true},
    ];

    return(
        <div id="navbar-menu" className={`collapse in hidden bg-[#ffff] min-h-screen w-72 duration-500 text-black px-4 shadow-sm`} >
            <div className="mt-20 flex flex-col gap-4 relative nav navbar-nav navbar-right">
                {
                    menus?.map((menu,i) => (
                        <Link to={menu?.link} key={i} className={`${menu?.margin && 'mt-5'} flex items-center text-sm gap-3.5 p-3 hover:bg-blue-300 rounded-md font-poppins`}>
                            <div>
                                {React.createElement(menu.icon, {size:'20'})}
                            </div>
                            <h2>{menu?.name}</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}