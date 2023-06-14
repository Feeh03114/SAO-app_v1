/* eslint-disable react/jsx-no-undef */
import { useLogin } from '@/hook/useLogin';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { Input } from '../../components/elementTag/input';

export default function Login(): JSX.Element{
    const { register, handleSubmit, ValidCredentials, errors, isSubmitted } = useLogin();
    
    return(
        <div className="flex items-center justify-end h-screen w-full">
            <div className='hidden h-full w-2/4 md:flex items-start justify-start relative'>
                <Image className='object-cover w-full bg-teal-400' src="/assets/Odonto.png" width={150} height={150} alt="admUniso"/>
            </div>

            <div className='w-full md:w-2/4'> {/* py-44*/}
                <div className="w-full justify-center items-center text-center">
                    <form className="inline-flex flex-col space-y-8 items-center justify-center px-32 py-10 bg-white dark:bg-teal-800 w-full max-w-2xl"
                        id='loginForm'
                        onSubmit={handleSubmit(ValidCredentials)}
                    >
                        <div className="flex flex-col space-y-1 items-center justify-center w-full">
                            <p className="text-lg md:text-2xl font-bold leading-loose text-gray-900 dark:text-white">Bem-vindo ao Painel Odontológico</p>
                            <p className="text-sm leading-none text-gray-500">Insira suas credenciais e acesse a plataforma.</p>
                        </div>
                        <div className="flex flex-col space-y-4 items-start justify-start w-full">
                            <div className="flex flex-col space-y-1 items-start justify-start w-full ">
                                <div className="inline-flex items-center justify-start pl-4  w-full">
                                    <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Registro Universitário (RU)</p>
                                </div>
                                {/*<input className="text-sm leading-tight text-gray-500 px-4 py-2 bg-white shadow border rounded-lg border-indigo-500" style={{width: 464, height: 38,}} placeholder="8484842132184165"></input> */}
                                <Input 
                                    id="ru"
                                    type="text"
                                    required
                                    className="
                                        w-full appearance-none rounded-lg px-4 py-2 shadow border border-teal-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                    placeholder="Registro Universitário"
                                    {...register("ru")}
                                    error={errors.ru}
                                />
                            </div>
                            <div className="flex flex-col space-y-1 items-start justify-start  w-full">
                                <div className="inline-flex items-center justify-start pl-4 w-full">
                                    <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Senha</p>
                                </div>
                                {/* <input className="text-sm leading-tight text-gray-500 px-4 py-2 bg-white shadow border rounded-lg border-gray-300" style={{width: 464, height: 38,}} placeholder="*************"></input> */}
                                <Input 
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full appearance-none rounded-lg px-4 py-2 shadow border border-teal-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                    placeholder="Senha"
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
                            {isSubmitted? 
                            <p className="text-base font-medium leading-normal text-white">
                                Carregando...
                            </p>
                            :<p className="text-base font-medium leading-normal text-white">Entrar</p>}
                        </button>
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
  