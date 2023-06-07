
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export function useLogin(){
  //const route = useRouter();
  const loginSchema = yup.object({
      ru: yup.string().required("Por favor, insira seu registro universitário"),
      password: yup.string().required("Por favor, insira sua senha").min(6, "A senha deve ter no mínimo 8 caracteres")
          //.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial"),	
    });
  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(loginSchema),
    });

  async function ValidCredentials(credentials:any){
    await signIn('credentials',{
        ru: credentials.ru,
        password: credentials.password,
        rememberPassword: credentials.remember_me,
        //redirect: false,
      }
    );
  }
  
  return{
    register,
    handleSubmit,
    ValidCredentials,
    errors
  }
}
