import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hook/auth";

export const ProtectedRoute = ():JSX.Element => {
  const { user, menu, signOut } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/" />;
  }

  if(menu.length === 0)
  {
    alert("Você não tem permissão para acessar o sistema");
    signOut();
    return <Navigate to="/" />;
  }
  
  if(location.pathname === "/")
    return <Navigate to={menu[0]?.url} />;
  
  if(menu.filter((e) => e.url === location.pathname).length !== 0)
    return <Outlet />;

  alert("Você não tem permissão para acessar essa página");
  return <Navigate to="/" />;
};