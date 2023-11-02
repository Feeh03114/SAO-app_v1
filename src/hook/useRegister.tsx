
import api from '@/service/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export function useRegister(){
  const registerSchema = yup.object({
      nome: yup.string().required("Por favor, insira seu nome"),
      email: yup.string().typeError('O e-mail deve usar somente números').required("Por favor, insira seu email")
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  async function newUserStudent(credentials:any){
    try {
      const response = await api.post('api/users/create-student', {
          name: credentials.nome,
          email: `${credentials.email}`,
          ru: 'sadsad45s',//credentials.email,
      });
      if(response?.data?.message)
        toast.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  }
  
  return{
    register,
    handleSubmit,
    newUserStudent,
    errors,
    isSubmitting
  }
}
