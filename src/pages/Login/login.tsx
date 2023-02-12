/* eslint-disable react/jsx-no-undef */
import logo from '../../assets/img/logo.svg';
import { Input } from '../../components/elementTag/input';
import { useLogin } from './useLogin';
export function Login(): JSX.Element{
    const { register, handleSubmit, ValidCredentials, errors } = useLogin();

    return(
    <div className="flex min-h-full flex-row items-center justify-center py-40 px-4 sm:px-6 lg:px-8 font-poppins ">
        <div className="w-full max-w-md space-y-8">
            <div>
                <img className="mx-auto h-12 w-auto" src={logo} alt="UNISO"/>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Bem-vindo ao SAO</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Acesse a sua conta
                </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(ValidCredentials)}>
                <input type="hidden" name="remember" value="true"/>
                <div>
                    <label htmlFor="ru" className=''>Registro Universitario</label>
                    <Input 
                        id="ru"
                        type="text"
                        className="
                            relative block w-full appearance-none rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Registro Universitario"
                        {...register("ru")}
                        error={errors.ru}
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <Input 
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className="relative block w-full appearance-none rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder-gray-500  focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Senha"
                        {...register("password")}
                        password={true}
                        error={errors.password}
                    />
                </div>
                
            
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Input id="remember_me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" {...register("remember_me")} error={errors.remember_me}/>
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Lembrar Senha</label>
                    </div>
            
                    <div className="text-sm">
                        <button type="button" className="font-medium text-indigo-400 hover:text-indigo-600" onClick={()=>console.log('Esqueci a senha')}>Esqueceu a senha?</button>
                    </div>
                </div>
            
                <div>
                    <button type="submit" 
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-indigo-50 group-hover:text-indigo-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Acessar
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}
