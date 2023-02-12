import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SideBar } from "../components/SideBar/SideBar";
import { Title } from "../components/elementTag/title";
import Diary from "../pages/Diary/diary";
import Home from "../pages/HomePage/home";
import { Login } from "../pages/Login/login";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Title title={"SAO | Login"}><Login/></Title>}/>
                <Route path="/home" element={<SideBar title="Home"><Home/></SideBar>}/>
                <Route path="/diary" element={<Diary/>}/>
            </Routes>
        </BrowserRouter>
    )
}