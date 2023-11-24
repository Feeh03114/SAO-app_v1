import { Input } from '@/components/elementTag/input';
import api from '@/service/api';
import { Dialog, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import * as yup from 'yup';

type ScheduleModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cancelButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const validationFullModal = yup.object().shape({
    prontuario: yup.string().required('O prontuario é obrigatório'),
    idPatient: yup.string().required('O id do paciente é obrigatório'),
    nome: yup.string().required('O nome é obrigatório'),
    data: yup.date().min(new Date(Date.now() - 86400000), 'A data deve ser igual ou posterior ao dia atual').required('A data é obrigatória'),
    horario: yup.string().required('O horário é obrigatório'),
    typeConsult: yup.string().required('O tipo da consulta é obrigatório'),
    tratamento: yup.string().test('isNumber', 'O serviço é obrigatório', function(value:any) {
        const {typeConsult} = this.parent;
        if(typeConsult === 'retorno') return value !== undefined;
        return true;
    }),
    queixa: yup.string().test('isString', 'A queixa é obrigatória', function(value:any) {
        const {typeConsult} = this.parent;
        if(typeConsult === 'novaConsulta') return value !== undefined;
        return true;
    }),

});

const mock = [
    { id: 1, name: 'Exemplo 1' },
    { id: 2, name: 'Exemplo 2' },
    { id: 3, name: 'Exemplo 3' },
    { id: 4, name: 'Exemplo 4' },
    { id: 5, name: 'Exemplo 5' },
    { id: 6, name: 'Exemplo 6' },
    { id: 7, name: 'Exemplo 7' },
]

export default function ScheduleModal({ open=false, setOpen, cancelButtonRef }: ScheduleModalProps):JSX.Element  {
    const { reset, control, register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFullModal)
    });

    const addPost = (data: any) => {console.log(data);}

    useEffect(() => {
        if(!open) reset({
            idPatient: '',
            prontuario: '',
            nome: '',
            data: new Date(),
            horario: '',
            typeConsult: 'retorno',
            tratamento: '',
            queixa: '',
        });
    }, [open]);

    const getPatient = async () => {
        try {
            const resp = await api.get('api/patients/userSchedule',{
                params: {
                    cpf: watch('prontuario'),
                    name: watch('nome'),
                }
            });
            if(!watch('pronuario'))
                setValue('prontuario', resp.data.people.cpf);
            if(!watch('nome'))
                setValue('nome', resp.data.people.name);

            setValue('idPatient', resp.data.id);
        } catch (error) {
            console.log(error);
        }
    }
      
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
  
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow transition-all sm:my-8 sm:w-full max-w-lg">
                    <div className="bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="flex flex-row flex-wrap justify-center items-center">
                            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(addPost)}>
                                <div className="flex flex-row justify-start items-center col-span-2">
                                    <div className="flex items-center justify-center rounded-full bg-teal-200 dark:bg-teal-400 h-10 w-10">
                                        <AiOutlinePlus className="text-xl text-teal-500 dark:text-teal-700"/>
                                    </div>
                                    <div className="ml-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                                            Cadastrar Consulta
                                        </Dialog.Title>
                                    </div>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Prontuário do Paciente</label>
                                    <Input 
                                        id="prontuario"
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                                        placeholder="Insira seu prontuário"
                                        {...register("prontuario")}
                                        error={errors.prontuario}
                                        onBlur={(e:any)=>e.target.value && getPatient()}
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Nome do Paciente</label>
                                    <Input 
                                        id="nome"
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Insira seu nome do paciente"
                                        required
                                        {...register("nome")}
                                        error={errors.nome}
                                        onBlur={(e:any)=>e.target.value && getPatient()}
                                    />
                                </div>
                                <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Tipo de consulta</label>
                                <div id="tipoDeConsulta" className="col-span-2">
                                    <Controller
                                        name='typeConsult'
                                        control={control}
                                        defaultValue={'retorno'}
                                        render={({ field }) => (
                                            <>
                                               <label className='mx-5'>
                                                    <input 
                                                        id="retorno"
                                                        type="radio" 
                                                        name="type"
                                                        className="text-teal-400 mr-2"
                                                        checked={field.value === 'retorno'}
                                                        onChange={(e) => field.onChange(e.target.checked ? 'retorno' : 'novaConsulta')}
                                                    />
                                                    Retorno
                                                </label>
                                                <label>
                                                    <input 
                                                        id="novaConsulta"
                                                        type="radio" 
                                                        value="novaConsulta"
                                                        name="type"
                                                        className="text-teal-400 mr-2"
                                                        checked={field.value === 'novaConsulta'}
                                                        onChange={(e) => field.onChange(e.target.value? 'novaConsulta' : 'retorno')}
                                                    />
                                                    Nova consulta
                                                </label>
                                            </>
                                        )}
                                    />
                                </div>
                                <div className="col-span-2 aria-hidden:hidden"
                                    aria-hidden={watch('typeConsult') !== 'retorno'}
                                >
                                    <Controller
                                        name='tratamento'
                                        control={control}
                                        render={({ field }) => (
                                            <>
                                                <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Tratamento Odontológico</label>
                                                <select 
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                    className="w-full cursor-text rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                                    placeholder="Selecione o serviço odontológico"
                                                >
                                                    <option value="" disabled selected>Selecione o tratamento</option>
                                                    {mock.map((item) => (
                                                        <option key={item.id} value={item.id}>{item.name}</option>
                                                    ))}
                                                </select>
                                            </>
                                        )}
                                    />
                                </div>

                                <div className="col-span-2 aria-hidden:hidden"
                                    aria-hidden={watch('typeConsult') === 'retorno'}
                                >
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Queixa</label>
                                    <textarea 
                                        id="queixa"
                                        className="w-full h-20 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Descrever o que aconteceu com o paciente"
                                        {...register("queixa")}
                                    />
                                </div>
                                <div>
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Data</label>
                                    <Input 
                                        id="data"
                                        type="date"
                                        className="w-full cursor-text rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="dd/mm/aaaa"
                                        required
                                        {...register("data")}
                                        error={errors.data}
                                        disabled={watch('typeConsult') === 'retorno'}
                                    />
                                </div>
                                <div>
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Horário</label>
                                    <Input 
                                        id="horario"
                                        type="time"
                                        className="w-full cursor-text rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="00h00"
                                        required
                                        {...register("horario")}
                                        error={errors.horario}
                                        disabled={watch('typeConsult') === 'retorno'}
                                    />
                                </div>
                                <div className="px-4 py-3 flex justify-end sm:px-6 col-span-2 dark:bg-gray-800">
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setOpen(false)}
                                        ref={cancelButtonRef}>
                                            Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-4 rounded-md bg-teal-500 dark:bg-teal-700 px-3 py-2 text-sm font-semibold text-white shadow sm:ml-3 ring-1 ring-inset sm:w-auto">
                                            Cadastrar
                                    </button>
                                </div>
                            </form>    
                        </div>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
}
