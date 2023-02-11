import { ReactNode, createContext, useState } from "react";

interface AuthProps{
    auth: boolean;
    setAuth: (e:boolean) => void;
}


interface AuthProviderProps{
    children:ReactNode
}


export const AuthContext = createContext({} as AuthProps);

// const filho extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
//     title:boolean;
//     children: ReactNode;
// }
export default function AuthProvider({children}:AuthProviderProps){
    const [auth, setAuth] = useState(false)
    
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}