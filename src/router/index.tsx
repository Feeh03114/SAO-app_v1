import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "../auth/protectedRoute";
import DynamicTablet from "../components/dynamicTablet";
import { CreateEditTable } from "../components/dynamicTablet/createEditTable";
import { useAuth } from "../hook/auth";
import Diary from "../pages/Diary";
import { Login } from "../pages/Login";
import { FormularioRegistro } from "../pages/Regiostrationv2/formularioRegistro";
import { SignupForm } from "../pages/Registration";
import api from "../service/api";

export default function Router(){
    const { user } = useAuth();
    return user ? (
        <Routes>
            <Route path="/" element={<ProtectedRoute/>}>
                <Route path="/home" element={
                        <DynamicTablet endpoint="api/users" axios={api} />
                    }>
                    <Route path="/home/add" element={<CreateEditTable endpoint="api/users" axios={api} />}/>
                    <Route path="/home/edit/:id" element={<CreateEditTable endpoint="api/users" axios={api} />}/>
                </Route>
                <Route path="/role" element={
                        <DynamicTablet endpoint="api/role" axios={api} />
                    }>
                    <Route path="/role/add" element={<CreateEditTable endpoint="api/role" axios={api} />}/>
                    <Route path="/role/edit/:id" element={<CreateEditTable endpoint="api/role" axios={api} />}/>
                </Route>
                <Route path="/modulo" element={
                        <DynamicTablet endpoint="api/role" axios={api} />
                    }>
                    <Route path="/modulo/add" element={<CreateEditTable endpoint="api/role" axios={api} />}/>
                    <Route path="/modulo/edit/:id" element={<CreateEditTable endpoint="api/role" axios={api} />}/>
                </Route>
                <Route path="/page" element={
                        <DynamicTablet endpoint="api/role" axios={api} />
                    }>
                    <Route path="/page/add" element={<CreateEditTable endpoint="api/role" axios={api} />}/>
                    <Route path="/page/edit/:id" element={<CreateEditTable endpoint="api/role" axios={api} />}/>
                </Route>
                <Route path="/diary" element={<Diary/>}/>
            </Route>
        </Routes>
    ) : (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/SignupForm" element={<SignupForm/>}/>
            <Route path="/FormularioRegistro" element={<FormularioRegistro/>}/>
            <Route path="/*" element={<Navigate to="/" />}/>
        </Routes>
    )
}