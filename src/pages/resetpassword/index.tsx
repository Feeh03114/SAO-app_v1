/* eslint-disable react/jsx-no-undef */
import { Input } from '@/components/elementTag/input';
import { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';

export default function ResetPassword(): JSX.Element{

    return(
        <div className="w-full h-screen flex items-center justify-center">
            <Head>
                <title>
                    SAO - Redefinir Senha
                </title>
            </Head>
            <div className="w-screen flex items-center justify-center">
                <div className="p-6 space-y-6 md:border rounded-lg md:shadow-md overflow-auto dark:bg-slate-800 border-gray-300 dark:border-gray-500">
                    <div className="w-full flex justify-center items-center">
                        <Image className='h-24 w-24 dark:hidden' src="/assets/logo4.png" width={150} height={150} alt="logoMobile"/>
                        <Image className='h-24 w-24 hidden dark:block' src="/assets/logo_white.png" width={150} height={150} alt="logoMobile"/>
                    </div>
                    <div className="w-96 h-full mt-4 bg-white dark:bg-gray-800 text-left">
                        <p className="text-3xl font-Inter font-extrabold leading-9 text-gray-900 dark:text-white">Criar nova senha</p>
                        <p className="text-lg font-Inter font-medium leading-6 text-gray-500 dark:text-gray-300">Sua senha nova devera ser diferente das senhas utilizadas anteriormente</p>
                    </div>
                    
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
                        />
                    </div>

                    <p className="dark:text-gray-300"> <span className="text-red-500">Atenção:</span> Sua senha deverá possuir ao menos 8 caracteres,<br/>
                        sendo eles obrigatórios:<br/>
                    &emsp;1 Letra maiúscula<br/>
                    &emsp;1 Letra minúscula<br/>
                    &emsp;1 Número<br/>
                    &emsp;1 Caractere especial (!@#$%&*)
                    </p>
                  
                    <button 
                        className="h-10 inline-flex items-center justify-center px-4 py-2 bg-teal-400 shadow rounded-md w-full transition-all duration-500 aria-hidden:hidden"
                        type='button'
                    >
                        <p className="text-base font-medium leading-normal text-white">Redefinir senha</p>
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