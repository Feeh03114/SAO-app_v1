import { useContext } from 'react';
import AuthProvider, { AuthContext } from './Contexts/AuthContext';

import Router from "./router/index";
import PublicRouter from "./router/public.router";


export function App(): JSX.Element{
  const { auth } = useContext(AuthContext)
  return(
    <AuthProvider>
      { auth ? <Router/> : <PublicRouter/> }
    </AuthProvider>
  )
}