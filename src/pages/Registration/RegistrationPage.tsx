import { Helmet } from 'react-helmet';
import { Input } from '../../components/elementTag/input';
import { useRegistration } from './useRegistration';


  export const SignupForm = () => {

    const {register,handleSubmit,errors,watch,SendPacient,handleNextStep,handleBckStep,currentStep } = useRegistration();

    return (
    <div className='flex justify-center bg-cyan-200 w-screen h-screen font-poppins' >
      <Helmet>
        <title> SAO | Faça o seu Cadastro</title>
      </Helmet>
      <div className='flex items-center justify-center bg-white w-1/2 h-1/6 rounded-md shadow-2xl py-96 px-32 sm:px-6 lg:px-8 mt-20'>         
        <div className='w-full space-y-8'>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Faça o seu cadastro
          </h2>
          <p className="text-center text-base text-black">
            Preencha os formularios com os seus dados
          </p>
          <form onSubmit={handleSubmit(SendPacient)}>
              <div className="flex justify-between items-center mt-10 mb-10">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-4 h-4 rounded-full border border-blue-300 ${
                      step <= currentStep ? 'bg-indigo-500' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            {/* PRIMEIRA PAGINA COMEÇA AQUI */}
            {currentStep === 1 && (
              <div>
                  <div className="mb-5">
                  <label
                    className="flex text-center text-gray-700 font-medium mb-2 "
                    htmlFor="dateOfBirth"
                  >
                    Data de nascimento
                  </label>
                  <Input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="date"
                    id="dateOfBirth"
                    required
                    {...register('dateOfBirth')}
                    error={errors.dateOfBirth}
                  />
                  </div>
                  <div className="mb-5">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
                      type="button"
                      onClick={handleNextStep}
                    >
                      Próximo
                    </button>
                  </div>
              </div>
            )}

            
            {/* Segunda pagina começa aqui */}
            {currentStep === 2 && (
              <>
                <div className='grid grid-cols-2 grid-rows-3 gap-6 w-full'>
                  <div className='mb-2'>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="firstname"
                    >
                      Nome
                    </label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="firstName"
                      {...register('firstNameme')}
                      error={errors.firstname}
                      required />
                  </div>
                  
                  <div className="mb-2">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="secondName"
                    >
                      Sobrenome
                    </label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="secondName"
                      {...register('secondName')}
                      required />
                  </div>
                  <div className='col-span-2 grid grid-cols-4 gap-6'>
                    <div className="mb-2 col-span-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="cpf"
                      >
                        CPF
                      </label>
                      <Input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        id="cpf"
                        {...register('cpf')}
                        error={errors.cpf}
                        required />
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="gender"
                      >
                        Genero
                      </label>
                      <select id="gender"{...register('gender')}>
                        <option value="null" selected>Qual seu Genero?</option>
                        <option value="M" >Masculino</option>
                        <option value="F"  >Feminino</option>
                        <option value="WI"  >Prefiro não responder</option>
                      </select>
                      {!!errors.gender && (
                        <p className="text-red-500 text-sm">{errors.gender?.message?.toString()}</p>
                      )}
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="ethnicity"
                      >
                        Etnia
                      </label>
                      <select id="ethnicity" {...register('ethnicity')}>
                        <option value="null" selected>Qual sua etnia?</option>
                        <option value="Branco">Branco</option>
                        <option value="Negro" >Negro</option>
                        <option value="Indigena">Indigena</option>
                        <option value="Pardo">Pardo</option>
                        <option value="Mulato">Mulato</option>
                      </select>
                      {!!errors.ethnicity && (
                        <p className="text-red-500 text-sm">{errors.ethnicity?.message?.toString()}</p>
                      )}
                    </div>
                  </div>

                  <div className='mb-2 col-span-2 grid gap-6'>
                    <div className=''>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="email"
                    >
                      E-mail
                    </label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="email"
                      {...register('email')}
                      required />
                    </div>
                  </div>


                </div>
                <div className="mb-5">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
                      type="button"
                      onClick={handleNextStep}
                    >
                      Próximo
                    </button>
                    <div className="mb-5">
                      <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline float-left"
                        type="button"
                        onClick={handleBckStep}
                      >
                        Voltar
                      </button>
                    </div>
                </div>
              </>
            )}




            {/* TERCEIRA pagina começa aqui */}
            {currentStep === 3 && (
            <>
                <div className='grid grid-cols-2 grid-rows-3 gap-6 w-full'>
                  <div className='mb-2'>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="phone"
                    >
                      Telefone
                    </label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="phone"
                      {...register('phone')}
                      error={errors.phone}
                      required />
                  </div>
                  
                  <div className="mb-2">
                    <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="gender"
                        >
                          Profissao
                        </label>
                        <select id="occupation"{...register('occupation')}>
                          <option value="null" selected>Qual sua Profissão?</option>
                          <option value="M" >Masculino</option>
                          <option value="F"  >Feminino</option>
                          <option value="WI"  >Prefiro não responder</option>
                        </select>
                        {!!errors.occupation && (
                          <p className="text-red-500 text-sm">{errors.occupation?.message?.toString()}</p>
                    )}
                  </div>
                  <div className='col-span-2 grid grid-cols-2 gap-6'>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="nationality"
                      >
                        Nacionalidade
                      </label>
                      <select id="nationality"{...register('gender')}>
                        <option value="null" selected>Qual seu Genero?</option>
                        <option value="M" >Masculino</option>
                        <option value="F"  >Feminino</option>
                        <option value="WI"  >Prefiro não responder</option>
                      </select>
                      {!!errors.nationality && (
                        <p className="text-red-500 text-sm">{errors.nationality?.message?.toString()}</p>
                      )}
                    </div>

                    <div className="mb-2">
                      <label
                        className="block text-gray-700 font-medium mb-2"
                        htmlFor="naturalness"
                      >
                        Naturalidade
                      </label>
                      <select id="naturalness" {...register('ethnicity')}>
                        <option value="null" selected>Qual sua etnia?</option>
                        <option value="Branco">Branco</option>
                        <option value="Negro" >Negro</option>
                        <option value="Indigena">Indigena</option>
                        <option value="Pardo">Pardo</option>
                        <option value="Mulato">Mulato</option>
                      </select>
                      {!!errors.naturalness && (
                        <p className="text-red-500 text-sm">{errors.naturalness?.message?.toString()}</p>
                      )}
                    </div>
                  </div>
                </div>

                
                <div className="mb-5">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
                      type="button"
                      onClick={handleNextStep}
                    >
                      Próximo
                    </button>
                    <div className="mb-5">
                      <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline float-left"
                        type="button"
                        onClick={handleBckStep}
                      >
                        Voltar
                      </button>
                    </div>
                </div>
                </>
            )}



        {/* QUARTA PAGINA COMEÇA AQUI */}
        {currentStep === 4 && (
            <>
                <div className='grid grid-cols-3 gap-6 w-full'>
                  <div className='mb-2'>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="cep"
                    >
                      CEP
                    </label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="cpf"
                      {...register('cep')}
                      error={errors.cep}
                      required />
                  </div>
                  
                  <div className="mb-2">
                    <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="neighborhood"
                        >
                          Bairro/Vila
                        </label>
                        <Input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          id="neighborhood"
                          {...register('neighborhood')}
                          error={errors.neighborhood}
                          required />
                        {!!errors.neighborhood && (
                          <p className="text-red-500 text-sm">{errors.neighborhood?.message?.toString()}</p>
                    )}
                  </div>

                  <div className="mb-2">
                    <label
                          className="block text-gray-700 font-medium mb-2"
                          htmlFor="uf"
                        >
                          UF
                        </label>
                        <select id="uf"{...register('uf')}>
                          <option value="null" selected>Qual seu UF?</option>
                        </select>
                        {!!errors.uf && (
                          <p className="text-red-500 text-sm">{errors.uf?.message?.toString()}</p>
                    )}
                  </div>

                                      
                </div>

                <div className='grid grid-cols-2 gap-6'>
                  <div className='mb-2'>
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="address"
                    >
                      Endereço
                    </label>
                    <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="address"
                      {...register('address')}
                      error={errors.address}
                      required />
                  </div>

                  <div className='mb-5'>
                    <label className='block text-gray-700 font-medium mb-2' htmlFor="number">
                      Numero
                    </label>
                    <Input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type='text'
                    id='number'
                    {...register('number')}
                      error={errors.number}
                      required/>
                  </div>        
                </div>


                <div className='grid grid-cols-1'>
                  <label>
                    Complemento
                  </label>
                  <Input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      id="complement"
                      {...register('complement')}
                      error={errors.complement}
                      required />
                </div>

                
                <div className="mb-5">
                    <button
                      className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right"
                      type="button"
                      onClick={handleNextStep}
                    >
                      Próximo
                    </button>
                    <div className="mb-5">
                      <button
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline float-left"
                        type="button"
                        onClick={handleBckStep}
                      >
                        Voltar
                      </button>
                    </div>
                </div>
                </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}