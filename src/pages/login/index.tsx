/* eslint-disable react/jsx-no-undef */
import IsLoading from '@/components/elementTag/isLoading';
import { useLogin } from '@/hook/useLogin';
import { useRegister } from '@/hook/useRegister';
import api from '@/service/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiArrowLeft } from 'react-icons/hi';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { Input } from '../../components/elementTag/input';
const shemaForgo = yup.object({
    email: yup.string().required('É obrigatório')
    .test('email', 'Insira um e-mail válido', (val) => {
        if(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i.test(val)) return false;
        else return true;
    })
})

export default function Login(): JSX.Element{
    const { register, handleSubmit, ValidCredentials, errors, isSubmitting } = useLogin();
    const { register: register2, handleSubmit: handleSubmit2, newUserStudent: newUserStudent, errors: errors2, isSubmitting: isSubmitting2  } = useRegister();
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isSendedEmail, setIsSendedEmail] = useState(false);
    const form = useForm({
        resolver: yupResolver(shemaForgo)
    });

    async function onReset(data:any){
        try {
            const resp = await api.post('api/users/reset-password',{
                email: `${data.email}@aluno.uniso.br`
            });
            toast.success(resp.data.mensagem);
            setIsSendedEmail(true);
        }catch (error:Error|any) {
            if(error?.response?.data?.mensagem)
                toast.error(error.response.data.mensagem);
            else
                toast.error('Erro ao conectar com o servidor');
       }
    }

    return(
        <div className="w-screen h-screen flex justify-around items-center bg-white dark:bg-slate-800">
            <div className="w-full h-5 m-4 flex absolute top-0 left-0 z-10">
                <button className="w-1/2" onClick={() => router.push('/')}>
                    <HiArrowLeft className="w-5 h-5 text-white"/>
                </button>
                <button className="hidden md:block md:w-1/2" onClick={() => router.push('/')}>
                    <HiArrowLeft className="w-5 h-5 text-white"/>
                </button>
            </div>

            <Head>
                <title>
                    SAO - Login
                </title>
            </Head>

            <div className={`transition ease-in-out duration-1000 ${isResetPassword ? "translate-x-full" : "translate-x-0"} hidden z-10 left-0 h-full w-1/2 md:flex items-start justify-start fixed`}>
                <Image className='absolute origin-right object-cover h-full w-full bg-teal-400 object-center' src="/assets/Odonto.png" width={150} height={150} alt="admUniso"/>
            </div>

            <form className={`${isResetPassword ? "block" : "hidden md:block"} w-full md:w-1/2 px-12 space-y-8 inline-flex flex-col items-center justify-center md:px-[calc(100vw*0.08)] lg:px-32 bg-white dark:bg-slate-800 max-w-2xl`}
                id='restPasswordForm'
                onSubmit={form.handleSubmit(onReset)}
            >
                <div className="dark:hidden w-full flex justify-center items-center">
                    <Image className='h-24 w-24' src="/assets/logo4.png" width={150} height={150} alt="logoMobile"/>
                </div>
                <div className="dark:flex hidden w-full justify-center items-center">
                    <Image className='h-24 w-24' src="/assets/logo3.png" width={150} height={150} alt="logoMobile"/>
                </div>

                <div className="w-full flex flex-col items-center justify-center text-center">
                    <p className={`text-2xl font-bold leading-8 text-slate-900 dark:text-white`}>{isSendedEmail ? "Instruções enviadas com sucesso!" : "Redefinir senha"}</p>
                    <p className="text-sm font-normal leading-none text-slate-400">{isSendedEmail ? "Por favor, verifique sua caixa de e-mail universitário" : "Redefina a sua senha para acessar a plataforma"}</p>
                </div>

                <div className="w-full relative flex flex-wrap items-stretch">
                    <Input
                        email="@aluno.uniso.br"
                        required
                        id="email"
                        type="text"
                        className="w-3/5 left-0 rounded-l-lg rounded-r-none"
                        placeholder="Insira seu RU"
                        {...form.register('email')}
                        error={form.formState.errors.email}
                    />
                </div>

                <button 
                    className="h-10 inline-flex items-center justify-center px-4 py-2 bg-teal-200 shadow rounded-md w-full"
                    form='restPasswordForm'
                    type='submit'
                    disabled={form.formState.isSubmitting}	
                >
                    <IsLoading
                        isVisible={form.formState.isSubmitting}
                        textLoading={isSendedEmail? 'Renviando...': 'Enviando...'}
                        className='text-white'
                    />
                    <p 
                        className="text-base font-medium leading-normal text-teal-700 aria-hidden:hidden"
                        aria-hidden={form.formState.isSubmitting}
                    >
                        {
                        isSendedEmail? 
                        'Renviar Email': 
                        'Enviar instruções'
                        }
                    </p>
                </button>

                <button 
                    className="h-10 inline-flex items-center justify-center px-4 py-2 
                    bg-white shadow border border-teal-100 rounded-md w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500"
                    onClick={() => {setIsResetPassword(false), setIsSendedEmail(false)}}
                    type='button'
                    disabled={form.formState.isSubmitting}
                >
                    <p className="text-base font-medium leading-normal text-teal-700">Voltar ao login</p>
                </button>
            </form>

            <div className={`${isResetPassword ? "hidden md:block" : "block"} w-full md:w-1/2 px-12 lg:px-32 md:px-[calc(100vw*0.08)] max-w-2xl flex flex-col flex-nowrap items-center`}>
                <div className={`w-full h-screen py-4 flex flex-col flex-nowrap justify-center items-center overflow-auto`}>
                    <div className="w-full h-24 flex justify-center items-center">
                        <Image className="w-24 h-24 dark:hidden" src="/assets/logo4.png" width={150} height={150} alt="logoMobile"/>
                        <Image className="w-24 h-24 hidden dark:flex" src="/assets/logo3.png" width={150} height={150} alt="logoMobile"/>
                    </div>
                    <form className={` w-full flex flex-col flex-nowrap justify-center items-center bg-white dark:bg-slate-800`}
                        id='loginForm'
                        onSubmit={handleSubmit(ValidCredentials)}
                    >
                        <div className="w-full flex flex-col items-center justify-center text-center">
                            <p className="text-2xl font-bold leading-8 text-slate-900 dark:text-white">Bem-vindo ao Painel Odontológico</p>
                            <p className="text-sm font-normal leading-none text-slate-400">Insira suas credenciais e acesse a plataforma</p>
                        </div>
                        <div className={`transition-all duration-1000 ease-in-out ${isLogin ? (errors.ru || errors.password) ? (errors.ru && errors.password) ? "h-[224.5px]" : "h-[204.5px]" : "h-[184.5px]" : "h-0"} w-full flex flex-col justify-start overflow-auto`}>
                            <div className="w-full pt-4 flex flex-col items-start justify-start">
                                <div className="flex flex-col items-start justify-start w-full px-1">
                                    <div className="inline-flex items-center justify-start pl-4 w-full mt-4">
                                        <p className="text-sm font-medium leading-tight text-slate-700 dark:text-slate-300">Registro Universitário (RU)</p>
                                    </div>
                                    <Input 
                                        id="ru"
                                        type="text"
                                        required
                                        className="w-full h-10 text-sm font-normal leading-tight rounded-lg px-4 py-2 shadow border border-slate-300 text-slate-900 placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400"
                                        placeholder="Registro Universitário"
                                        {...register("ru")}
                                        error={errors.ru}
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-start w-full px-1">
                                    <div className="inline-flex items-center justify-start pl-4 w-full mt-4">
                                        <p className="text-sm font-medium leading-tight text-slate-700 dark:text-slate-300">Senha</p>
                                    </div>
                                    <Input 
                                        id="password"
                                        autoComplete="current-password"
                                        required
                                        className="w-full"
                                        placeholder="Insira sua senha"
                                        {...register("password")}
                                        password
                                        error={errors.password}
                                    />
                                    <div className="inline-flex items-center justify-start pl-4 w-full mt-1">
                                        <p className="text-sm font-medium leading-tight text-slate-700 dark:text-slate-300 cursor-pointer hover:text-teal-500"
                                            onClick={() => setIsResetPassword(true)}>Redefinir Senha</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className={`${isLogin ? "block" : "hidden"} h-10 inline-flex items-center justify-center px-4 py-2 bg-teal-400 shadow rounded-md w-full transition-all duration-500 mt-8`}
                            type="submit"
                            disabled={isSubmitting}
                            form='loginForm'
                        >
                            <IsLoading
                                isVisible={isSubmitting}
                                textLoading='Entrando...'
                                className='text-white'
                            />
                            <p className="text-base font-medium leading-normal text-white aria-hidden:hidden"
                                aria-hidden={isSubmitting}
                            >
                                Entrar
                            </p>
                        </button>

                        <button 
                            className={`${isLogin ? "hidden" : "inline-flex"} h-10 inline-flex items-center justify-center px-4 py-2 bg-teal-400 shadow rounded-md w-full transition-all duration-500 mt-8`}
                            onClick={() => {setIsLogin(true)}}
                            type='button'
                        >
                            <p className="text-base font-medium leading-normal text-white">Entrar</p>
                        </button>
                    </form>

                    <div className="my-4 flex flex-col transition-all overflow-auto w-full max-h-max">
                        <hr className="border-slate-300"></hr>
                    </div>

                    <form className={`justify-start w-full inline-flex flex-col items-center bg-white dark:bg-slate-800`}
                        id='registerForm'
                        onSubmit={handleSubmit2(newUserStudent)}
                    >
                        <div className="flex flex-col items-center justify-center w-full">
                            <p className="text-2xl font-bold leading-8 text-slate-900 dark:text-white">Crie sua conta na plataforma</p>
                            <p className="text-sm font-normal leading-none text-slate-500">Registre-se na plataforma.</p>
                        </div>
                        <div className={`transition-all duration-1000 ease-in-out ${!isLogin ? (errors2.nome || errors2.email) ? (errors2.nome && errors2.email) ? "h-[171px]" : "h-[151px]" : "h-[131px]" : "h-0"} overflow-auto w-full`}>
                            <div className="flex flex-col items-start justify-start w-full transition-all duration-500">
                                <div className="flex flex-col items-start justify-start w-full px-1">
                                    <div className="inline-flex items-center justify-start pl-4 w-full">
                                        <p className="text-sm font-medium leading-tight text-slate-700 dark:text-slate-300">Nome</p>
                                    </div>
                                    <Input 
                                        id="nome"
                                        type="text"
                                        required
                                        className="w-full text-sm font-medium leading-tight rounded-lg px-4 py-2 shadow border border-slate-300 text-slate-900 placeholder-slate-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Insira seu nome"
                                        {...register2("nome")}
                                        error={errors2.nome}
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-start w-full px-1" role="group" >
                                    <div className="inline-flex items-center justify-start pl-4 w-full mt-4">
                                        <p className="text-sm font-medium leading-tight text-slate-700 dark:text-slate-300">E-mail</p>
                                    </div>
                                    <div className="w-full relative flex flex-wrap items-stretch">
                                        <Input
                                            email="@aluno.uniso.br"
                                            id="email"
                                            type="text"
                                            required
                                            className="w-3/5 left-0 rounded-l-lg rounded-r-none"
                                            placeholder="Insira seu RU"
                                            {...register2("email")}
                                            error={errors2.email}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="h-10 mt-8 inline-flex items-center justify-center px-4 py-2 bg-teal-200 shadow rounded-md w-full transition-all duration-500 aria-hidden:hidden"
                            type="submit"
                            form='registerForm'
                            aria-hidden={isLogin}
                            disabled={isSubmitting2}
                        >
                            <IsLoading
                                isVisible={isSubmitting2}
                                textLoading='Enviando...'
                                className='text-white'
                            />
                            <p className="text-base font-medium leading-normal text-teal-700 aria-hidden:hidden"
                                aria-hidden={isSubmitting2}
                            >
                                Criar minha conta
                            </p>
                        </button>
                        <button className="h-10 mt-8 inline-flex items-center justify-center px-4 py-2 bg-teal-200 shadow rounded-md w-full transition-all duration-500 aria-hidden:hidden"
                            onClick={() => setIsLogin(false)}
                            aria-hidden={!isLogin}
                            type='button'
                        >
                            <p className="text-base font-medium leading-normal text-teal-700">Criar minha conta</p>
                        </button>
                    </form>              
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const session = await getSession(ctx);
    if(session === null) {
           return {
            props: {
                session,
            },
        }
    } else {
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
    }
};