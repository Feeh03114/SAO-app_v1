/* eslint-disable react/jsx-no-undef */
import { Helmet } from 'react-helmet';
import odonto from '../../assets/img/Odonto.png';
import { Input } from '../../components/elementTag/input';
import { useLogin } from './useLogin';



export function Login(): JSX.Element{
    const { 
        register,
        handleSubmit,
        ValidCredentials,
        errors,
        isRegister,
        setIsRegister 
    } = useLogin();

    return(
    <div className="flex items-center justify-end h-screen w-full">
        <Helmet>
            <title>SAO | Login</title>
        </Helmet>
        <div className='hidden h-full w-2/4 md:flex items-start justify-start relative'>
            <img className='object-cover w-full bg-teal-400' src={odonto} alt="admUniso"/>
            {/* <div className='absolute inset-0 bg-teal-500 opacity-50'></div> */}
        </div>

        <div className='w-full md:w-2/4'> {/* py-44*/}
            <div className="w-full justify-center items-center text-center">
                <div className="inline-flex flex-col space-y-8 items-center justify-center px-32 py-10 bg-white dark:bg-teal-800 w-full max-w-2xl" >
                    <div className="flex flex-col space-y-1 items-center justify-center w-full">
                        <p className="text-lg md:text-2xl font-bold leading-loose text-gray-900 dark:text-white">Bem-vindo ao Painel Odontológico</p>
                        <p className="text-sm leading-none text-gray-500">Insira suas credenciais e acesse a plataforma.</p>
                    </div>
                    <div className="flex flex-col space-y-4 items-start justify-start w-full">
                        <div className="flex flex-col space-y-1 items-start justify-start w-full ">
                            <div className="inline-flex items-center justify-start pl-4  w-full">
                                <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Registro Universitário (RU)</p>
                            </div>
{/*                             <input className="text-sm leading-tight text-gray-500 px-4 py-2 bg-white shadow border rounded-lg border-indigo-500" style={{width: 464, height: 38,}} placeholder="8484842132184165"></input> */}
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
                    <div className="inline-flex items-center justify-center px-4 py-2 bg-teal-400 shadow rounded-md w-full">
                        <p className="text-base font-medium leading-normal text-white">Entrar</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
/*Cabeçalho form Login*/
                /* <div className='inline-flex flex-col space-y-8 items-center justify-cente bg-white shadow border rounded-lg border-gray-200 px-16 py-12'>
                    <div className='flex flex-col space-y-1 items-center justify-center'>
                        /* <img className=" mx-auto h-14"  src={logo} alt="UNISO"/> 
                        <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">Bem-Vindo</h2>
                        <h2 className="mt-0 text-center text-2xl font-semibold tracking-tight text-gray-900">Sistema de Acompanhamento Odontologico</h2>
                        <p className={`mt-2 text-center text-sm font-semibold text-gray-400 ${isRegister&&'hidden'}`}>
                            Acesse a sua conta
                        </p>
                    </div>                    
                    
                    <form className={`flex flex-col space-y-4 ${isRegister&&'hidden'}`} onSubmit={handleSubmit(ValidCredentials)}>
                        <input type="hidden" name="remember" value="true"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div className='mb-4'>
                                <label htmlFor="ru" className='text-sm font-medium leading-tight text-gray-700'>Registro Universitario</label>
                                <Input 
                                    id="ru"
                                    type="text"
                                    required
                                    className="
                                        w-full appearance-none rounded-lg px-4 py-2 shadow border border-teal-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                    placeholder="Registro Universitario"
                                    {...register("ru")}
                                    error={errors.ru}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className='text-sm font-medium leading-tight text-gray-700'>Senha</label>
                                <Input 
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className=" w-full appearance-none rounded-lg px-4 py-2 shadow border border-teal-300 text-gray-900 placeholder-gray-500  focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                    placeholder="Senha"
                                    {...register("password")}
                                    password={true}
                                    error={errors.password}
                                />
                            </div>
                        </div>
                    
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" {...register("remember-me")}/>
                                <label htmlFor="remember-me" className="ml-2 text-sm font-medium leading-tight text-gray-700">Lembrar Senha</label>
                            </div>
                    
                            <div className="text-sm">
                                <a href="#" className="text-sm font-medium leading-tight text-teal-400 hover:text-teal-600">Esqueceu a senha</a>
                            </div>
                        </div>
                    
                        <div>
                            <button type="submit" 
                            className="group relative flex w-full justify-center rounded-md shadow border border-transparent bg-teal-400 py-2 px-4 text-sm font-medium leading-tight text-white hover:bg-teal-400 focus:outline-none focus:ring-2 focus:bg-teal-500 focus:ring-offset-2">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-50 group-hover:text-teal-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                Acessar
                            </button>
                        </div>
                    </form>
                </div> */

                /*Botao para aparecer dados para o login*/
               /*  <button className={` mt-6 group relative flex w-full justify-center 
                    rounded-md border border-transparent bg-teal-300 py-2 px-4 text-sm font-medium text-white
                    first-letter:hover:bg-teal-400 focus:outline-none focus:ring-2 focus:bg-teal-500 focus:ring-offset-2
                    ${!isRegister&& 'hidden'}`}
                    onClick={()=>setIsRegister(e=>!e)}
                >
                        Acessar conta
                </button> */
                
                /*<div className="mt-12">
                    <img src={separador} className='px-2' alt="Separador criar conta"/>
                    <h2 className="mt-12 text-center text-3xl font-bold tracking-tight text-gray-900">Registre-se</h2>
                    <div className="mt-2 text-center text-sm font-semibold text-gray-400">Crie a sua conta para começar a usar o SAO</div>
                    <div className="flex items-center mt-6">
                        <button className={`group relative flex w-full justify-center 
                        rounded-md border border-transparent bg-teal-500 py-2 px-4 text-sm font-medium text-white
                        hover:bg-teal-600 focus:outline-none focus:ring-2 focus:bg-teal-800 focus:ring-offset-2
                        transition-opacity duration-100 ${isRegister? 'animate-fade--in': 'animate-slide-up'}`}
                            onClick={()=>setIsRegister(e=>!e)}
                        >
                                Criar conta
                        </button>

                        <div className={`transition-opacity duration-200 ${isRegister? 'opacity-100 animate-fade-in': 'opacity-0 animate-slide-up'} w-full` } >
                            <div className=''>
                                <form className='mt-0'>
                                    <div className='flex gap-5'>
                                        <div className='w-full'>
                                            <label htmlFor="">Nome</label>
                                            <input id='nome' 
                                                type='text' 
                                                required 
                                                className='relative block w-full appearance-none rounded-lg border border-teal-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                                placeholder="Nome' 
                                            />
                                        </div>
                                        <div className='w-full'>
                                            <label htmlFor="">Sobrenome</label>
                                            <input id='nome' 
                                            type='text' 
                                            required 
                                            className='relative block w-full appearance-none rounded-lg border border-teal-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                            placeholder="Sobrenome' />
                                        </div>
                                    </div>
                                    <div className='flex gap-5 mt-6 items-center'>
                                        <div className=''>
                                            <label className='block' htmlFor="email">E-mail Universitario</label>
                                            <div className='relative w-full inline-flex items-center placeholder-gray-500 rounded-lg border-teal-300  border  focus:border-teal-400 focus:outline-none focus:ring-teal-400 focus:z-10'>
                                                <input 
                                                    type="email" 
                                                    id='email' 
                                                    required 
                                                    className='w-full appearance-none text-gray-900 border-0 sm:text-sm"
                                                    placeholder="E--mail universitario'
                                                />
                                                <span className='mx-5' >@aluno.uniso.br</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className={` '}`}>
                                            Criar
                                    </button>

                                    
                                </form>
                            </div>
                        </div>
                    </div> 
                </div>*/