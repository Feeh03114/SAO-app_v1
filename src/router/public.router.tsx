import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SideBar } from "../components/SideBar/SideBar";
import Home from "../pages/HomePage/home";
import { Login } from "../pages/Login/login";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<SideBar title="SAO | Home"><Home/></SideBar>}/>
            </Routes>
        </BrowserRouter>
    )
}