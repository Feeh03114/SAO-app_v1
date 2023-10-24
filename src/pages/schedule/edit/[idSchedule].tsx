
import { Field, HeaderSchedule } from "@/components/pages/schedule/edit/components";
import { BsPerson } from "react-icons/bs";

const mock = { 
    id: 1, 
    name: "Nome Exemplo",
    email: "exemple@email.com",
    phone: "(11) 99999-9999",
    date: "2021-10-10",
    time: "10:00",
    discipline: "Geral",
    service: "Limpeza",
    price: "R$ 100,00",
    complaintText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    descriptionConsult: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "Finalizado",
    forwarding: "Selecione o encaminhamento",
    consultationReport: "Dentes amarelados e sensíveis"
}

const statusMock = [
    { id: 1, name: 'Exemplo 1' },
    { id: 2, name: 'Exemplo 2' },
    { id: 3, name: 'Exemplo 3' },
    { id: 4, name: 'Exemplo 4' },
    { id: 5, name: 'Exemplo 5' },
    { id: 6, name: 'Exemplo 6' },
    { id: 7, name: 'Exemplo 7' },
]

export default function DentalChart(): JSX.Element {
    return (
        <>
            <HeaderSchedule 
                title={mock.name}
                subtitle={"Prontuário: " + mock.id}
                isFilterVisibled
                textLeft="Voltar"
                textMiddle="Histórico"
                textRight="Finalizar Consulta"
                onClickLeft={()=> console.log('Voltar')}
                onClickMiddle={()=> console.log('Historico')}
                onClickRight={()=> console.log('Finalizar consulta')}
            />
            <div className="bg-white dark:bg-gray-800 mx-5 h-[calc(100vh-12.75rem)] overflow-auto flex flex-row flex-wrap justify-start items-center md:border md:rounded-lg md:p-6 md:mx-12">
                <div className="w-full md:w-1/4 mt-4 flex flex-row justify-start items-center">
                    <div className="flex mx-2 items-center justify-center rounded-full bg-teal-200 dark:bg-teal-400 w-16 md:w-20 h-14">
                        <BsPerson className="w-8 h-8"/>
                    </div>
                    <Field size="!w-full ml-2" label="Disciplina" data={mock.discipline} />
                </div>

                <Field size="md:w-1/4" label="E-mail" data={mock.email} />
                <Field size="md:w-1/4" label="Telefone" data={mock.phone} />
                <Field size="md:w-1/4" label="Data de agenda" data={mock.date} />
                <Field size="md:w-1/4" label="Horário" data={mock.time} />
                <Field size="md:w-1/4" label="Serviço" data={mock.service} />
                <Field size="md:w-1/4" label="Preço" data={mock.price} />

                <div className="w-full mt-4">
                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Queixa</label>
                    <div className="mx-2 text-sm p-4 leading-6 rounded-lg dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-500 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400">
                        {mock.complaintText}
                    </div>
                </div>

                <div className="w-full mt-4">
                    <div className="w-full flex flex-col md:flex-row md:items-center justify-between">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Relatório da consulta</label>
                        <div className="flex flex-row items-center">
                            <select 
                                className="mx-2 w-1/3 md:w-1/4 text-sm p-1 pl-2 leading-6 rounded-lg dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-500 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400"
                                placeholder="Selecione o serviço odontológico"
                            >
                                <option value="" disabled selected>Selecione o status</option>
                                {statusMock.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <select 
                                className="mx-2 w-2/3 md:w-1/4 text-sm p-1 pl-2 leading-6 rounded-lg dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-500 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400"
                                placeholder="Selecione o serviço odontológico"
                            >
                                <option value="" disabled selected>Selecione o encaminhamento</option>
                                {statusMock.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="mx-2 mt-2 text-sm p-4 leading-6 rounded-lg dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-500 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 h-52">{mock.consultationReport}</div>
                </div>

                <div className="w-full mt-4">
                    <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Nome do Paciente</label>
                    <div className="mx-2 text-sm p-4 leading-6 rounded-lg dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-500 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 flex justify-center items-center h-52">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20" fill="none">
                            <path d="M6.66671 3.33333H5.00004C4.07957 3.33333 3.33337 4.07953 3.33337 5V15C3.33337 15.9205 4.07957 16.6667 5.00004 16.6667H15C15.9205 16.6667 16.6667 15.9205 16.6667 15V5C16.6667 4.07953 15.9205 3.33333 15 3.33333H13.3334M10 2.5V9.16667M10 9.16667L12.5 6.66667M10 9.16667L7.50004 6.66667M3.33337 10.8333H5.4882C5.70921 10.8333 5.92117 10.9211 6.07745 11.0774L8.0893 13.0893C8.24558 13.2455 8.45754 13.3333 8.67855 13.3333H11.3215C11.5425 13.3333 11.7545 13.2455 11.9108 13.0893L13.9226 11.0774C14.0789 10.9211 14.2909 10.8333 14.5119 10.8333H16.6667" stroke="#D1D5DB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>    
        </>
    )
}