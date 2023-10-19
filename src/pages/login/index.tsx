/* eslint-disable react/jsx-no-undef */
import { useLogin } from '@/hook/useLogin';
import { useRegister } from '@/hook/useRegister';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { Input } from '../../components/elementTag/input';

export default function Login(): JSX.Element{
    const { register, handleSubmit, ValidCredentials, errors, isSubmitted } = useLogin();
    const { register: register2, handleSubmit: handleSubmit2, ValidCredentials: ValidCredentials2, errors: errors2, isSubmitted: isSubmitted2  } = useRegister();
    const [isLogin, setIsLogin] = useState(true);

    return(
        <div className="flex items-center justify-end h-screen w-full">
            <Head>
                <title>
                    SAO - Login
                </title>
            </Head>
            <div className='hidden h-full w-2/4 md:flex items-start justify-start relative'>
                <Image className='object-cover w-full bg-teal-400' src="/assets/Odonto.png" width={150} height={150} alt="admUniso"/>
            </div>

            <div className='w-full md:w-2/4'>
                <div className="w-full justify-center items-center text-center">
                    <form className="inline-flex flex-col space-y-8 items-center justify-center px-12 md:px-32 lg:px-32 bg-white dark:bg-teal-800 w-full max-w-2xl"
                        id='loginForm'
                        onSubmit={handleSubmit(ValidCredentials)}
                    >
                        <div className="flex flex-col space-y-1 items-center justify-center w-full">
                            <p className="text-lg md:text-2xl font-bold leading-loose text-gray-900 dark:text-white">Bem-vindo ao Painel Odontológico</p>
                            <p className="text-sm leading-none text-gray-500">Insira suas credenciais e acesse a plataforma.</p>
                        </div>
                        {isLogin ? (
                            <>
                                <div className="flex flex-col space-y-4 items-start justify-start w-full transition-all duration-500">
                                    <div className="flex flex-col space-y-1 items-start justify-start w-full">
                                        <div className="inline-flex items-center justify-start pl-4 w-full">
                                            <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Registro Universitário (RU)</p>
                                        </div>
                                        <Input 
                                            id="ru"
                                            type="text"
                                            required
                                            className="w-full appearance-none rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                            placeholder="Registro Universitário"
                                            {...register("ru")}
                                            error={errors.ru}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1 items-start justify-start w-full">
                                        <div className="inline-flex items-center justify-start pl-4 w-full">
                                            <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Senha</p>
                                        </div>
                                       <Input 
                                            id="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            className="w-full appearance-none rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                            placeholder="Insira sua senha"
                                            {...register("password")}
                                            password={true}
                                            error={errors.password}
                                        />
                                    </div>
                                </div>
                                <button className="inline-flex items-center justify-center px-4 py-2 bg-teal-400 shadow rounded-md w-full"
                                    type="submit"
                                    disabled={isSubmitted}
                                >
                                    {/* {isSubmitted? 
                                    <p className="text-base font-medium leading-normal text-white">
                                        Carregando...
                                    </p>
                                    :<p className="text-base font-medium leading-normal text-white">Entrar</p>} */}
                                    <p className="text-base font-medium leading-normal text-white">Entrar</p>
                                </button>
                            </>
                        ):  
                            <button className="inline-flex items-center justify-center px-4 py-2 bg-teal-400 shadow rounded-md w-full transition-all duration-500" onClick={() => {setIsLogin(true)}}>
                                <p className="text-base font-medium leading-normal text-white">Entrar</p>
                            </button>
                        }
                    </form>

                    <div className="my-8 px-12 md:px-32 lg:px-32 max-w-2xl">
                        <hr className="border-gray-300"></hr>
                    </div>

                    <form className="inline-flex flex-col items-center justify-center px-12 space-y-8 md:px-32 lg:px-32 bg-white dark:bg-teal-800 w-full max-w-2xl"
                        id='registerForm'
                        onSubmit={handleSubmit2(ValidCredentials2)}
                    >
                        <div className="flex flex-col space-y-1 items-center justify-center w-full">
                            <p className="text-lg md:text-2xl font-bold leading-loose text-gray-900 dark:text-white">Crie sua conta na plataforma</p>
                            <p className="text-sm leading-none text-gray-500">Registre-se na plataforma.</p>
                        </div>
                        {!isLogin ? (
                            <>
                                <div className="flex flex-col space-y-4 items-start justify-start w-full transition-all duration-500">
                                    <div className="flex flex-col space-y-1 items-start justify-start w-full">
                                        <div className="inline-flex items-center justify-start pl-4 w-full">
                                            <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Nome</p>
                                        </div>
                                       <Input 
                                            id="nome"
                                            type="text"
                                            required
                                            className="w-full appearance-none rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                            placeholder="Insira seu nome"
                                            {...register2("nome")}
                                            error={errors2.nome}
                                        />
                                    </div>
                                    <div className="flex flex-col space-y-1 items-start justify-start w-full" role="group">
                                        <div className="inline-flex items-center justify-start pl-4 w-full">
                                            <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">E-mail</p>
                                        </div>
                                        <div className="w-full relative mb-4 flex flex-wrap items-stretch">
                                            <Input 
                                                id="email"
                                                type="text"
                                                required
                                                className="w-3/5 appearance-none left-0 rounded-l-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                                placeholder="Insira seu e-mail"
                                                {...register2("email")}
                                                error={errors2.email}
                                            />
                                            <div className="w-2/5 absolute right-0 py-2 inline-flex justify-evenly bg-gray-100 rounded-r-lg shadow border border-l-0 border-gray-300 text-gray-900 placeholder-gray-500">
                                                <MdEmail className="text-gray-400 text-xl hidden sm:block"/>
                                                <p className="truncate hover:text-clip"> @aluno.uniso.br</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-teal-200 shadow rounded-md w-full"
                                    type="submit"
                                    disabled={isSubmitted2}
                                >
                                    {/* {isSubmitted2? 
                                    <p className="text-base font-medium leading-normal text-teal-700">
                                        Carregando...
                                    </p>
                                    :<p className="text-base font-medium leading-normal text-teal-700">Criar minha conta</p>} */}
                                    <p className="text-base font-medium leading-normal text-teal-700">Criar minha conta</p>
                                </button>
                            </>
                        ):  
                            <button className="px-4 py-2 bg-teal-200 shadow rounded-md w-full transition-all duration-500" onClick={() => {setIsLogin(false)}}
                            >
                                <p className="text-base font-medium leading-normal text-teal-700">Criar minha conta</p>
                            </button>
                        }
                    </form>               
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
    const session = await getSession(ctx);
    if(session !== null)
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
        props: {
          session,
        },
      }
    else
      return {
        props: {
          session,
        },
      };
};
  