import { Dialog, Listbox, Transition } from '@headlessui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import * as yup from 'yup';

type ScheduleModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cancelButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

const validationModal = yup.object().shape({
    prontuario: yup.string().required('O prontuario é obrigatório'),
    nome: yup.string().required('O nome é obrigatório'),
    data: yup.string().required('A data é obrigatório'),
    horario: yup.string().required('O horário é obrigatório'),
    queixa: yup.string().required('A queixa é obrigatório'),
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

export default function ScheduleModal({ open, setOpen, cancelButtonRef }: ScheduleModalProps) {
    const [selected, setSelected] = useState({ id: 0, name: 'Selecione o serviço odontológico' })
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(validationModal)
    });

    const addPost = (data: any) => {console.log(data);}   
      
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
                                    <input 
                                        id="prontuario"
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Insira seu prontuário"
                                        required
                                        {...register("prontuario")}
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Nome do Paciente</label>
                                    <input 
                                        id="nome"
                                        type="text"
                                        className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Insira seu nome do paciente"
                                        required
                                        {...register("nome")}
                                    />
                                </div>

                                <div>
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Data</label>
                                    <input 
                                        id="data"
                                        type="date"
                                        className="w-full cursor-text rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="dd/mm/aaaa"
                                        required
                                        {...register("data")}
                                    />
                                </div>
                                <div>
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Horário</label>
                                    <input 
                                        id="horario"
                                        type="time"
                                        className="w-full cursor-text rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="00h00"
                                        required
                                        {...register("horario")}
                                    />
                                </div>

                                <div className="col-span-2">
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Serviço Odontológico</label>
                                    <Listbox value={selected} onChange={setSelected}>
                                        <div className="relative mt-1 cursor-pointer dark:text-white">
                                            <Listbox.Button className="relative w-full rounded-lg border border-gray-300 bg-white dark:bg-gray-700 py-2 pl-3 pr-10 text-left shadow focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                <span className="block truncate">{selected.name}</span>
                                            
                                                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <IoIosArrowDown/>
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md dark:border dark:border-white bg-white dark:bg-gray-700 py-1 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                    {mock.map((service, serviceIdx) => (
                                                        <Listbox.Option
                                                            key={serviceIdx}
                                                            className={({ active }) =>
                                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                                                active ? 'bg-teal-200 text-teal-900' : 'text-gray-900 dark:text-white'
                                                                }`
                                                            }
                                                            value={service}
                                                            >
                                                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                {service.name}
                                                            </span>
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                </div>

                                <div className="col-span-2">
                                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Queixa</label>
                                    <textarea 
                                        id="queixa"
                                        className="w-full h-20 rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Descrever o que aconteceu com o paciente"
                                        required
                                        {...register("queixa")}
                                    />
                                </div>

                                <div className="px-4 py-3 flex justify-end sm:px-6 col-span-2 bg-gray-50 dark:bg-gray-800">
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
