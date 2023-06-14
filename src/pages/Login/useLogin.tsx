
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAuth } from "../../hook/auth";

export function useLogin(){
    const { signIn } = useAuth();
    const loginSchema = yup.object({
        ru: yup.string().required("Por favor, insira seu registro universitário"),
        password: yup.string().required("Por favor, insira sua senha").min(8, "A senha deve ter no mínimo 8 caracteres")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial"),	
      });
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(loginSchema),
      });

    const [isRegister, setIsRegister] = useState(false);

    async function ValidCredentials(credentials:any){
        console.log(credentials)
        //await signIn(credentials);
    }

    return{
        register,
        handleSubmit,
        ValidCredentials,
        errors,
        isRegister,
        setIsRegister
    }
}

