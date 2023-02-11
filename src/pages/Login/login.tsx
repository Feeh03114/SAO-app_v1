import { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import logo from '../../assets/img/logo.svg';

export function Login(): JSX.Element{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {setAuth, auth} = useContext (AuthContext)
    console.log('auth', auth)

    return(
    <div className="flex min-h-full flex-row items-center justify-center py-40 px-4 sm:px-6 lg:px-8 font-poppins ">
        <head>SAO | Login</head>
        <div className="w-full max-w-md space-y-8">
            <div>
            <img className="mx-auto h-12 w-auto" src={logo} alt="UNISO"/>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Bem-vindo ao SAO</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Acesse a sua conta
            </p>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true"/>
                <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                        <label htmlFor="ru" className=''>Registro Universitario</label>
                        <input 
                            id="ru"
                            name="ru"
                            type="text"
                            required
                            className="
                                relative block w-full appearance-none rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Registro Universitario"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input 
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="relative block w-full appearance-none rounded-lg border border-blue-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Senha"
                        />
                    </div>
                </div>
            
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Lembrar Senha</label>
                    </div>
            
                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-400 hover:text-indigo-600">Esqueceu a senha</a>
                    </div>
                </div>
            
                <div>
                    <button type="submit" 
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-indigo-50 group-hover:text-indigo-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
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
