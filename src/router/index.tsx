import { Route, Routes } from "react-router-dom";

import { SideBar } from "../components/SideBar/SideBar";
import Diary from "../pages/Diary/diary";
import Home from "../pages/HomePage/home";
import { Login } from "../pages/Login/login";

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
        </Routes>
    )
}

{/* <ProtectedRoute>
                    <SideBar title="Home">
                        <Home/>
                    </SideBar>
                </ProtectedRoute> */}