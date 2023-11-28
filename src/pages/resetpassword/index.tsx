/* eslint-disable react/jsx-no-undef */
import { Input } from '@/components/elementTag/input';
import IsLoading from '@/components/elementTag/isLoading';
import api from '@/service/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const shemaNewPassword = yup.object().shape({
    password: yup.string()
    .required('Senha é obrigatória').min(8, 'Senha deve possuir ao menos 8 caracteres')
    .test('uppercase', 'Senha deve possuir ao menos uma letra maiúscula', (value:string) => {
        if(value) return /[A-Z]/.test(value)
    })
    .test('lowercase', 'Senha deve possuir ao menos uma letra minúscula', (value:string) => {
        if(value) return /[a-z]/.test(value)
    })
    .test('number', 'Senha deve possuir ao menos um número', (value:string) => {
        if(value) return /[0-9]/.test(value)
    })
    .test('specialCharacter', 'Senha deve possuir ao menos um caractere especial (!@#$%&*)', (value:string) => {
        if(value) return /[!@#$%&*]/.test(value)
    }),
    confirmPassword: yup.string()
    .required('Confirmação de senha é obrigatória')
    .min(8, 'Senha deve possuir ao menos 8 caracteres')
    .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais')
});

export default function ResetPassword(): JSX.Element{
    const router = useRouter()
    const { token } = router.query
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(shemaNewPassword),
    });
    const onSave = async (event: any) => {
        try {
            const resp = await api.post(`api/users/reset-password/${token}`,{
                passwordNew: event.password,
                passwordNewConfirm: event.confirmPassword
            });
            toast.success('Senha redefinida com sucesso!');
            router.push('/login');
        } catch (error:Error|any) {
            if(error?.response?.data?.mensagem)
                toast.error(error.response.data.mensagem);
            else 
                toast.error('Erro ao redefinir senha');
        }
    }

    return(
        <div className="w-full h-screen flex items-center justify-center">
            <Head>
                <title>
                    SAO - Redefinir Senha
                </title>
            </Head>
            <div className="w-screen flex items-center justify-center">
                <div className="p-6 space-y-6 md:border rounded-lg md:shadow-md overflow-auto">
                    <div className="w-full flex justify-center items-center">
                        <Image className='h-24 w-24' src="/assets/logo4.png" width={150} height={150} alt="logoMobile"/>
                    </div>
                    <div className="w-96 h-full mt-4 bg-white dark:bg-gray-800 text-left">
                        <p className="text-3xl font-Inter font-extrabold leading-9 text-gray-900">Criar nova senha</p>
                        <p className="text-lg font-Inter font-medium leading-6 text-gray-500">Sua senha nova devera ser diferente das senhas utilizadas anteriormente</p>
                    </div>
                    <form id='formResetPassword' onSubmit={handleSubmit(onSave)} className="w-full flex flex-col space-y-6">
                        <div>
                            <div className="w-full inline-flex items-center justify-start pl-4">
                                <p className="text-lg font-Inter font-medium leading-6 text-gray-700 dark:text-gray-300">Senha</p>
                            </div>
                            <Input 
                                id="password"
                                required
                                className="w-full h-10 px-4 text-lg font-Inter font-normal leading-5 text-gray-500 rounded-lg border border-gray-300 shadow placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400"
                                placeholder="Insira sua senha"
                                password
                                {...register('password')}
                                error={errors.password}
                            />
                        </div>

                        <div>
                            <div className="w-full inline-flex items-center justify-start pl-4">
                                <p className="text-lg font-Inter font-medium leading-6 text-gray-700 dark:text-gray-300">Confirme a sua senha</p>
                            </div>
                            <Input 
                                id="confirmPassword"
                                required
                                className="w-full h-10 px-4 text-lg font-Inter font-normal leading-5 text-gray-500 rounded-lg border border-gray-300 shadow placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400"
                                placeholder="Digite novamente sua senha"
                                password
                                {...register('confirmPassword')}
                                error={errors.confirmPassword}
                            />
                        </div>

                        <p className=""> <span className="text-red-500">Atenção:</span> Sua senha deverá possuir ao menos 8 caracteres,<br/>
                            sendo eles obrigatórios:<br/>
                        &emsp;1 Letra maiúscula<br/>
                        &emsp;1 Letra minúscula<br/>
                        &emsp;1 Número<br/>
                        &emsp;1 Caractere especial (!@#$%&*)
                        </p>
                    </form>
                    <button 
                        className="h-10 inline-flex items-center justify-center px-4 py-2 bg-teal-400 shadow rounded-md w-full transition-all duration-500 aria-hidden:hidden"
                        type='submit'
                        form='formResetPassword'
                    >
                        <IsLoading
                            isVisible={isSubmitting}
                            textLoading='Redefinindo senha...'
                            className='text-white'
                        />
                        <p className="text-base font-medium leading-normal text-white aria-hidden:hidden"
                            aria-hidden={isSubmitting}
                        >
                            Redefinir senha
                        </p>
                    </button>
                </div>
            </div>
        </div>
    )
} 

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const session = await getSession(ctx);
    if(session === null)
      return {
        props: {
          session,
        },
      }
    else
      if(session?.menu?.length === 0) signOut({callbackUrl: '/login'});
  
      return {
        redirect: {
          permanent: false,
          destination: session?.menu[0].url,
        },
        props: {
          session,
        },
      }
  };