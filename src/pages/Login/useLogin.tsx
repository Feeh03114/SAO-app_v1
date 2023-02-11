import { useContext } from "react";
import { AuthContext } from '../../Contexts/AuthContext';

export function useLogin(){
    const {setAuth, auth} = useContext(AuthContext);
    console.log('auth', auth)
    console.log('setAuth', setAuth)
    return{

    }
}