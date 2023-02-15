import { BrowserRouter, Route, Routes } from "react-router-dom";

import Diary from "../pages/Diary/diary";
import Home from "../pages/HomePage/home";
import { Login } from "../pages/Login/login";
import { FormularioRegistro } from "../pages/Regiostrationv2/formularioRegistro";
import { SignupForm } from "../pages/Registration/RegistrationPage";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/diary" element={<Diary/>}/>
                <Route path="/SignupForm" element={<SignupForm/>}/>
                <Route path="/FormularioRegistro" element={<FormularioRegistro/>}/>
            </Routes>
        </BrowserRouter>
    )
}