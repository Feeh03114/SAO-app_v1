import { BrowserRouter, Route, Routes } from "react-router-dom";

import Diary from "../pages/Diary/diary";
import Home from "../pages/HomePage/home";
import { Login } from "../pages/Login/login";
import { RegistrationPage } from "../pages/Registration/RegistrationPage";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/diary" element={<Diary/>}/>
                <Route path="/registrationPage" element={<RegistrationPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}