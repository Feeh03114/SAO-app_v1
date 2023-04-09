import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { SideBar } from "../components/SideBar/SideBar";
import { useAuth } from "../hook/auth";

export const ProtectedRoute = ():JSX.Element => {
  const { user, menu, signOut } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/" />;
  }

  if(menu.length === 0)
  {
    toast.info("Você não tem permissão para acessar o sistema", {autoClose: 5000, position: "top-center"});
    signOut();
    return <Navigate to="/" />;
  }
  
  if(location.pathname === "/")
    return <Navigate to={menu[0]?.url} />;

  const PageMenu = menu.filter((e) => location.pathname.includes(e.url));
  if(PageMenu.length > 0){
    const page = PageMenu[0];
    if(page?.isCreate && location.pathname.includes(`${page.url}/add`))
      return <Page name={page.namePage}/>;

    if(page?.isEdit && location.pathname.includes(`${page.url}/edit`))
      return <Page name={page.namePage}/>;
    
    if(page?.isRead && location.pathname.includes(`${page.url}/view`))
      return <Page name={page.namePage}/>;

    if(location.pathname === page?.url)  
      return <Page name={page.namePage}/>;
    
    return <Navigate to="/" />; 
  }

  toast.info("Você não tem permissão para acessar essa página", {autoClose: 5000, position: "top-center"});  
  return <Navigate to="/" />;
};

function Page({name}:{name:string}){
  return(<SideBar title={name}>
    <Outlet />
  </SideBar>)
}