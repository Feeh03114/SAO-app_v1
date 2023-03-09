import { Route, Routes } from "react-router-dom";

import { SideBar } from "../components/SideBar/SideBar";
import Diary from "../pages/Diary/diary";
import Home from "../pages/HomePage/home";
import { Login } from "../pages/Login/login";
import { FormularioRegistro } from "../pages/Regiostrationv2/formularioRegistro";
import { SignupForm } from "../pages/Registration/RegistrationPage";

export default function Router(){        
    return( 
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={
                <SideBar title="Home">
                    <Home/>
                </SideBar>
            }/>
            <Route path="/diary" element={<Diary/>}/>
            <Route path="/SignupForm" element={<SignupForm/>}/>
            <Route path="/FormularioRegistro" element={<FormularioRegistro/>}/>
        </Routes>
    )
}

{/* <ProtectedRoute>
                    <SideBar title="Home">
                        <Home/>
                    </SideBar>
                </ProtectedRoute> */}