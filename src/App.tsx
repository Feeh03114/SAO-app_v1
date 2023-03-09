
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hook/auth';
import Router from "./router/index";


export default function App(): JSX.Element{
  return(
    <BrowserRouter>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </BrowserRouter>
  )
}