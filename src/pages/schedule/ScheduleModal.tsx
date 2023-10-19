import { Dialog, Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { Input } from '../../components/elementTag/input';


type ScheduleModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cancelButtonRef: React.MutableRefObject<HTMLButtonElement | null>;
};

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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="flex flex-row flex-wrap justify-start items-center grid grid-cols-1 gap-4">
                            <div className="flex flex-row flex-wrap justify-start items-center grow">
                                <div className="mx-auto flex flex-row h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-200 sm:mx-0 sm:h-10 sm:w-10">
                                    <AiOutlinePlus className="text-xl text-teal-500"/>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                        Cadastrar Consulta
                                    </Dialog.Title>
                                </div>
                            </div>
                           
                            <form className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="inline-flex items-center justify-start pl-4 w-full">
                                        <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Prontuário do Paciente</p>
                                    </div>
                                    <Input 
                                        id="prontuario"
                                        type="text"
                                        required
                                        className="w-full appearance-none rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Insira seu prontuário"
                                    />
                                </div>
                                <div>
                                    <div className="inline-flex items-center justify-start pl-4 w-full">
                                        <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Nome do Paciente</p>
                                    </div>
                                    <Input 
                                        id="nome"
                                        type="text"
                                        required
                                        className="w-full appearance-none rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Insira seu nome do paciente"
                                    />
                                </div>

                                <div>
                                    <div className="inline-flex items-center justify-start pl-4 w-full">
                                        <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Data</p>
                                    </div>
                                    <Input 
                                        id="data"
                                        type="date"
                                        required
                                        className="w-full appearance-none rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="dd/mm/aaaa"
                                    />
                                </div>
                                <div>
                                    <div className="inline-flex items-center justify-start pl-4 w-full">
                                        <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Horário</p>
                                    </div>
                                    <Input 
                                        id="horario"
                                        type="time"
                                        required
                                        className="w-full appearance-none rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="00h00"
                                    />
                                </div>

                                <div className="col-span-2">
                                    <div className="inline-flex items-center justify-start pl-4 w-full">
                                        <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Serviço Odontológico</p>
                                    </div>
                                    <Listbox value={selected} onChange={setSelected}>
                                        <div className="relative mt-1">
                                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{selected.name}</span>
                                           
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <IoIosArrowDown/>
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {mock.map((service, serviceIdx) => (
                                                    <Listbox.Option
                                                        key={serviceIdx}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
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
                                    <div className="inline-flex items-center justify-start pl-4 w-full">
                                        <p className="text-sm font-medium leading-tight text-gray-700 dark:text-gray-300">Queixa</p>
                                    </div>
                                    <Input 
                                        id="queixa"
                                        type="area"
                                        required
                                        className="w-full h-20 rounded-lg px-4 py-2 shadow border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-teal-400 focus:outline-none focus:ring-teal-400 sm:text-sm"
                                        placeholder="Descrever o que aconteceu com o paciente"
                                    />
                                </div>
                            </form>    
                        </div>
                    </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setOpen(false)}
                    >
                      Cadastrar
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    )
}
