
import { AuthProvider, useAuth } from './hook/auth';
import Router from "./router/index";
import PublicRouter from "./router/public.router";


export default function App(): JSX.Element{
  const { user } = useAuth();
  return(
    <AuthProvider>
      { user ? <Router/> : <PublicRouter/> }
    </AuthProvider>
  )
}