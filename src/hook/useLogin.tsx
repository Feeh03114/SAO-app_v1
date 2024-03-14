
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export function useLogin(){
  const router = useRouter();
  const loginSchema = yup.object({
      ru: yup.string().required("Por favor, insira seu registro universitário"),
      password: yup.string().required("Por favor, insira sua senha")
          //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial"),	
    });
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm({
      resolver: yupResolver(loginSchema),
    });

  async function ValidCredentials(credentials:any){
    const resp = await signIn('credentials',{
        ru: credentials.ru,
        password: credentials.password,
        rememberPassword: credentials.remember_me,
        redirect: false,
      }
    );
    
    if(resp?.error) 
      if(!resp.error.includes('connect ECONNREFUSED')) toast.error(resp.error);
      else toast.error('Erro ao conectar com o servidor');
    else router.push('/schedule');
  }
  
  return{
    register,
    handleSubmit,
    ValidCredentials,
    errors,
    isSubmitting
  }
}
