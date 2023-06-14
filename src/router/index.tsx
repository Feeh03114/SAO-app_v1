import { BrowserRouter, Route, Routes } from "react-router-dom";

import { RegisterStudent } from "../pages/CadastroAluno/RegisterStudent";
import Diary from "../pages/Diary/diary";
import Home from "../pages/HomePage/home";
import { Login } from "../pages/Login/login";
import { SignupForm } from "../pages/RegisterPacient/RegistrationPage";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/diary" element={<Diary/>}/>
                <Route path="/SignupForm" element={<SignupForm/>}/>
                <Route path="/CadastroAluno" element={<RegisterStudent/>}/>
            </Routes>
        </BrowserRouter>
    )
}