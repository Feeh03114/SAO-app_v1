import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/HomePage/home";
import { Login } from "../pages/Login/login";

export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                
            </Routes>
        </BrowserRouter>
    )
}