import { Route } from "react-router-dom";
import DynamicTablet from "../../components/dynamicTablet";
import { CreateEditTable } from "../../components/dynamicTablet/createEditTable";
import api from "../../service/api";

export default function Home(){
    return(
        <>
            <Route path="/" element={<DynamicTablet endpoint="api/users" axios={api} />}/>
            <Route path="/home/add" element={<CreateEditTable endpoint="api/users" axios={api} />}/>
            <Route path="/home/edit/:id" element={<CreateEditTable endpoint="api/users" axios={api} />}/>
        </>
    );
}

