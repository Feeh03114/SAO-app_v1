
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export function useRegister(){
  const registerSchema = yup.object({
      nome: yup.string().required("Por favor, insira seu nome"),
      email: yup.number().typeError('O e-mail deve usar somente números').required("Por favor, insira seu email").positive("O número deve ser positivo").integer("O número deve ser inteiro")
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  async function ValidCredentials(credentials:any){
    await signIn('credentials',{
        nome: credentials.nome,
        email: credentials.email,
      }
    );
  }
  
  return{
    register,
    handleSubmit,
    ValidCredentials,
    errors,
    isSubmitting
  }
}
