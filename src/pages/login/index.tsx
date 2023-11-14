/* eslint-disable react/jsx-no-undef */
import { useLogin } from '@/hook/useLogin';
import { useRegister } from '@/hook/useRegister';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { Input } from '../../components/elementTag/input';

export default function Login(): JSX.Element{
    const { register, handleSubmit, ValidCredentials, errors, isSubmitting } = useLogin();
    const { register: register2, handleSubmit: handleSubmit2, newUserStudent: newUserStudent, errors: errors2, isSubmitting: isSubmitting2  } = useRegister();
    const [isLogin, setIsLogin] = useState(true);
    const [isResetPassword, setIsResetPassword] = useState(false);
    const [isSendedEmail, setIsSendedEmail] = useState(false);

    return(
        <div className="flex items-center h-screen w-full bg-white dark:bg-slate-800">
            <Head>
                <title>
                    SAO - Login
                </title>
            </Head>
            <div className={`transition ease-in-out duration-1000 ${isResetPassword ? "translate-x-full" : "translate-x-0"} hidden z-10 h-full w-1/2 md:flex items-start justify-start fixed`}>
                <Image className='absolute origin-right object-cover h-full w-full bg-teal-400 object-center' src="/assets/Odonto.png" width={150} height={150} alt="admUniso"/>
            </div>

            <div className={`${isResetPassword ? "hidden md:block" : "block"} w-full right-0 md:w-1/2 text-center fixed`}>
                <div className=" w-full flex justify-center items-center">
                    <Image className='h-24 w-24 dark:hidden' src="/assets/logo4.png" width={150} height={150} alt="logoMobile"/>
                    <Image className='h-24 w-24 hidden dark:flex' src="/assets/logo3.png" width={150} height={150} alt="logoMobile"/>
                </div>
                <form className="inline-flex flex-col items-center justify-center px-12 md:px-[calc(100vw*0.08)] lg:px-32 bg-white dark:bg-slate-800 w-full max-w-2xl"
                    id='loginForm'
                    onSubmit={handleSubmit(ValidCredentials)}
                >
                    <div className="w-full flex flex-col items-center justify-center text-center">
                        <p className="text-2xl font-bold leading-8 text-gray-900 dark:text-white">Bem-vindo ao Painel Odontológico</p>
                        <p className="text-sm font-normal leading-none text-gray-400">Insira suas credenciais e acesse a plataforma</p>
                    </div>
                    <div 
                        className='flex flex-col transition-all ease-in-out duration-700 overflow-auto w-full max-h-max aria-hidden:max-h-0 mt-4'
                        aria-hidden={!isLogin}
                    >
                        <div className="flex flex-col items-start justify-start w-full"
                        >
                            <div className="flex flex-col items-start justify-start w-full">
                                <div className="inline-flex items-center justify-start pl-4 w-full mt-4">
                                    <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Registro Universitário (RU)</p>
                                </div>
                                <Input 
                                    id="ru"
                                    type="text"
                                    required
                                    className="w-full h-10 text-sm font-normal leading-tight rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400"
                                    placeholder="Registro Universitário"
                                    {...register("ru")}
                                    error={errors.ru}
                                />
                            </div>
                            <div className="flex flex-col items-start justify-start w-full">
                                <div className="inline-flex items-center justify-start pl-4 w-full mt-4">
                                    <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Senha</p>
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
                                    <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300 cursor-pointer hover:text-teal-500"
                                        onClick={() => setIsResetPassword(true)}>Redefinir Senha</p>
                                </div>
                            </div>
                        </div>
                        <button className="h-10 inline-flex items-center justify-center px-4 bg-teal-400 shadow rounded-md w-full mt-8"
                            type="submit"
                            disabled={isSubmitting}
                            form='loginForm'
                        >
                            {/* {isSubmitted? 
                            <p className="text-base font-medium leading-normal text-white">
                                Carregando...
                            </p>
                            :<p className="text-base font-medium leading-normal text-white">Entrar</p>} */}
                            <p className="text-base font-medium leading-normal text-white">Entrar</p>
                        </button>
                    </div>

                    <button 
                        className="h-10 inline-flex items-center justify-center px-4 py-2 bg-teal-400 shadow rounded-md w-full transition-all duration-500 aria-hidden:hidden"
                        onClick={() => {setIsLogin(true)}}
                        aria-hidden={isLogin}
                        type='button'
                    >
                        <p className="text-base font-medium leading-normal text-white">Entrar</p>
                    </button>

                    <div className="my-4 flex flex-col transition-all overflow-auto w-full max-h-max">
                        <hr className="border-gray-300"></hr>
                    </div>
                </form>

                <form className="inline-flex flex-col items-center justify-center px-12 md:px-[calc(100vw*0.08)] lg:px-32 bg-white dark:bg-slate-800 w-full max-w-2xl"
                    id='registerForm'
                    onSubmit={handleSubmit2(newUserStudent)}
                >
                    <div className="flex flex-col items-center justify-center w-full">
                        <p className="text-2xl font-bold leading-8 text-gray-900 dark:text-white">Crie sua conta na plataforma</p>
                        <p className="text-sm font-normal leading-none text-gray-500">Registre-se na plataforma.</p>
                    </div>
                    <div className='flex flex-col transition-all ease-in-out duration-700 overflow-auto w-full aria-hidden:max-h-0'
                        aria-hidden={isLogin}
                    >
                        <div className="flex flex-col items-start justify-start w-full transition-all duration-500">
                            <div className="flex flex-col items-start justify-start w-full">
                                <div className="inline-flex items-center justify-start pl-4 w-full">
                                    <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Nome</p>
                                </div>
                                <Input 
                                    id="nome"
                                    type="text"
                                    required
                                    className="w-full text-sm font-medium leading-tight rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                    placeholder="Insira seu nome"
                                    {...register2("nome")}
                                    error={errors2.nome}
                                />
                            </div>
                            <div className="flex flex-col items-start justify-start w-full" role="group">
                                <div className="inline-flex items-center justify-start pl-4 w-full mt-4">
                                    <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">E-mail</p>
                                </div>
                                <div className="w-full relative flex flex-wrap items-stretch">
                                    <Input 
                                        id="email"
                                        type="text"
                                        required
                                        className="w-3/5 left-0 rounded-l-lg rounded-r-none"
                                        placeholder="Insira seu RU"
                                        {...register2("email")}
                                        error={errors2.email}
                                    />
                                    <div className="w-2/5 h-10 right-0 inline-flex justify-evenly items-center bg-gray-100 dark:bg-gray-600 rounded-r-lg shadow border dark:border-gray-500   text-gray-900 placeholder-gray-500">
                                        <MdEmail className=" text-gray-400 dark:bg-gray-600 hidden text-xl md:hidden xl:block"/>
                                        <p className="text-sm dark:text-white dark:bg-gray-600 font-medium leading-tight truncate hover:text-clip"> @aluno.uniso.br</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="h-10 mt-8 inline-flex items-center justify-center px-4 py-2 bg-teal-200 shadow rounded-md w-full transition-all duration-500 aria-hidden:hidden"
                            type="submit"
                            disabled={isSubmitting2}
                        >
                            {/* {isSubmitted2? 
                            <p className="text-base font-medium leading-normal text-teal-700">
                                Carregando...
                            </p>
                            :<p className="text-base font-medium leading-normal text-teal-700">Criar minha conta</p>} */}
                            <p className="text-base font-medium leading-normal text-teal-700">Criar minha conta</p>
                        </button>
                    </div>
                    <button 
                        className="h-10 mt-8 inline-flex items-center justify-center px-4 py-2 bg-teal-200 shadow rounded-md w-full transition-all duration-500 aria-hidden:hidden"
                        onClick={() => {setIsLogin(false)}}
                        aria-hidden={!isLogin}
                        type='button'
                    >
                        <p className="text-base font-medium leading-normal text-teal-700">Criar minha conta</p>
                    </button>
                </form>              
            </div>

            <div className={`${isResetPassword ? "block" : "hidden md:block"} w-full left-0 md:w-1/2 text-center fixed`}>
                <form className="space-y-8 inline-flex flex-col items-center justify-center px-12 md:px-[calc(100vw*0.08)] lg:px-32 bg-white dark:bg-slate-800 w-full max-w-2xl"
                    id='restPasswordForm'
                >
                    <div className="dark:hidden w-full flex justify-center items-center">
                        <Image className='h-24 w-24' src="/assets/logo4.png" width={150} height={150} alt="logoMobile"/>
                    </div>
                    <div className="dark:flex hidden w-full justify-center items-center">
                        <Image className='h-24 w-24' src="/assets/logo3.png" width={150} height={150} alt="logoMobile"/>
                    </div>

                    <div className="w-full flex flex-col items-center justify-center text-center">
                        <p className={`text-2xl font-bold leading-8 text-gray-900 dark:text-white`}>{isSendedEmail ? "Instruções enviadas com sucesso!" : "Redefinir senha"}</p>
                        <p className="text-sm font-normal leading-none text-gray-400">{isSendedEmail ? "Por favor, verifique sua caixa de e-mail universitário" : "Redefina a sua senha para acessar a plataforma"}</p>
                    </div>

                    <div className="w-full relative flex flex-wrap items-stretch">
                        <Input 
                            id="email"
                            type="text"
                            required
                            className="w-3/5 left-0 rounded-l-lg rounded-r-none"
                            placeholder="Insira seu RU"
                        />
                        <div className="w-2/5 h-10 right-0 inline-flex justify-evenly items-center bg-gray-100 dark:bg-gray-600 rounded-r-lg shadow border dark:border-gray-500   text-gray-900 placeholder-gray-500">
                            <MdEmail className=" text-gray-400 dark:bg-gray-600 hidden text-xl md:hidden xl:block"/>
                            <p className="text-sm dark:text-white dark:bg-gray-600 font-medium leading-tight truncate hover:text-clip"> @aluno.uniso.br</p>
                        </div>
                    </div>

                    <button 
                        className="h-10 inline-flex items-center justify-center px-4 py-2 bg-teal-200 shadow rounded-md w-full"
                        onClick={() => {setIsSendedEmail(true)}}
                        type='button'
                    >
                        <p className="text-base font-medium leading-normal text-teal-700">Enviar instruções</p>
                    </button>

                    <button 
                        className="h-10 inline-flex items-center justify-center px-4 py-2 bg-white shadow border border-teal-100 rounded-md w-full"
                        onClick={() => {setIsResetPassword(false), setIsSendedEmail(false)}}
                        type='button'
                    >
                        <p className="text-base font-medium leading-normal text-teal-700">Voltar ao login</p>
                    </button>
                </form>
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