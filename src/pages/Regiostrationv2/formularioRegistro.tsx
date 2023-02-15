import logo from '../../assets/img/logo.svg';

export function FormularioRegistro() {
    return (
    <div className="mt-2 mb-0">
        <img className='mx-auto h-15 w-auto' src= {logo} alt="Logo Uniso"/>
      <div className="mt-0">
        <img src="../" alt="" />
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-3">
            <div className="border-t border-gray-200" />
          </div>
        </div>
  
        <div className="mt-20 sm:mt-0 m-20">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Informações pessoais</h3>
                <p className="mt-1 text-sm text-gray-600">Essas informações serão usadas para contato.</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form action="#" method="POST">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                          Primeiro nome
                        </label>
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                          Sobrenome
                        </label>
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                          CPF
                        </label>
                        <input
                          type="text"
                          name="cpf"
                          id="cpf"
                          autoComplete="cpf"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                          Genero
                        </label>
                        <select
                          id="genero"
                          name="genero"
                          autoComplete="Genero"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="null" selected>Escolha o seu genero</option>
                          <option value="M">Masculino</option>
                          <option value="F">Feminino</option>
                          <option value="O">Outros</option>
                        </select>
                      </div>

                      
                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                          Etnia
                        </label>
                        <select
                          id="genero"
                          name="genero"
                          autoComplete="Genero"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option value="null" selected>Escolha a sua etinia</option>
                          <option value="B">Branco</option>
                          <option value="N">Negro</option>
                          <option value="I">Indigena</option>
                          <option value="P">Pardo</option>
                          <option value="M">Mulato</option>
                          <option value="O">Outros</option>
                        </select>
                      </div>
  
                      {/* <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                          Country
                        </label>
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div> */}
  
                      <div className="col-span-6">
                        <label htmlFor="email-adress" className="block text-sm font-medium text-gray-700">
                          E-mail
                        </label>
                        <input
                          type="text"
                          name="email"
                          id="email"
                          autoComplete="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
  
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
      </div>)
  }
  