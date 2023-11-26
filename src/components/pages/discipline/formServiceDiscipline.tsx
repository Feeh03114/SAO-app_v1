import Table from "@/components/Table";
import { Input } from "@/components/elementTag/input";
import Modal from "@/components/modal";
import { useDisclosure } from "@/hook/useDisclosure";
import { Availabilities } from "@/pages/disciplines/add";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useFieldArray, useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import * as yup from 'yup';
import FormAvaliableTimes, { validationAvailabilities } from "./formAvailabilities";

function convertNumberToDay(day: number) {
    switch (day) {
        case 1:
            return 'Segunda-feira';
        case 2:
            return 'Terça-feira';
        case 3:
            return 'Quarta-feira';
        case 4:
            return 'Quinta-feira';
        case 5:
            return 'Sexta-feira';
        case 6:
            return 'Sábado';
        case 7:
            return 'Domingo';
        default:
            return '';
    }
}

export const validationService = yup.object().shape({
    id: yup.string().optional(),
    name: yup.string().required('Campo obrigatório'),
    description: yup.string().required('Campo obrigatório'),
    price: yup.number().required('Campo obrigatório'),
    duration_medio: yup.number().required('Campo obrigatório'),
    active_duration_medio: yup.boolean().optional(),
    active_duration_auto: yup.boolean().optional(),
    ext: yup.boolean().optional(),
    availabilities: yup.array().of(validationAvailabilities),
});

interface ModalServiceDisciplineProps{
    isOpen: boolean;
    onClose: () => void;
    onSave:(data:any)=>void;
}

export default function FormServiceDiscipline({isOpen, onClose, onSave} : ModalServiceDisciplineProps): JSX.Element {
    const { control: control2, register: register2, reset, watch: watch2, handleSubmit: handleSubmit2, formState: { errors: errors2 }  } = useForm({
        resolver: yupResolver(validationService)
    });
    const { fields, append, remove } = useFieldArray({
        control: control2, 
        name: "availabilities",
    });
    const watchAvailabilities = watch2('availabilities')
    const newAvaliableTimeDisposer = useDisclosure();

    const updateHandleSubmit = async (data: any) => {
        const newData = { ...data };
        newData.price = Number(parseFloat(newData.price).toFixed(2));

        const durationMedio = newData.duration_medio;
        const hours = parseInt(durationMedio.split(':')[0]);
        const minutes = parseInt(durationMedio.split(':')[1]);
        const totalMinutes = hours * 60 + minutes;
        newData.duration_medio = Number(totalMinutes);

        newData.availabilities = fields;

        reset({
            name: '',
            description: '',
            price: 0,
            duration_medio: 0,
            ext: false,
            active_duration_auto: false,
        });

        fields.forEach(() => {
            remove();
        });

        onClose();
        onSave(newData);
    };

    function updateAvailabilities(data: Availabilities) {
        append(data);
    }

    return (
        <Modal.Root
            isOpen={isOpen}
            onClose={onClose}
            width="md:max-w-lg"
        >
            <FormAvaliableTimes isOpen={newAvaliableTimeDisposer.isOpen} onClose={newAvaliableTimeDisposer.close} onSave={updateAvailabilities}/>
            <Modal.Header title="Cadastrar Serviço" icon={HiOutlinePlus} />
            <Modal.Body>
                <form id='formService' className="w-full space-y-4 flex flex-wrap" onSubmit={handleSubmit2(updateHandleSubmit)}>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Nome do Serviço</label>
                        <Input 
                            id="name"
                            type="text"
                            className="w-full"
                            placeholder="Insira o nome do serviço"
                            {...register2("name")}
                            error={errors2.name}
                        />
                    </div>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Descrição</label>
                        <textarea 
                            id="description"
                            className="w-full h-24 px-4 py-2 text-sm font-medium leading-tight truncate dark:text-white placeholder-gray-500 dark:placeholder-white shadow-sm border rounded-lg border-gray-300 dark:border-gray-500  dark:bg-gray-700 focus:border-teal-400 focus:outline-none focus:ring-teal-400 resize-none"
                            placeholder=""
                            {...register2("description")}
                        />
                        <p className="text-red-500 text-sm">{errors2?.description?.message?.toString()}</p>
                    </div>
                    <div className="flex flex-wrap md:flex-nowrap md:space-x-6">
                        <div className="w-full md:w-1/2">
                            <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Valor</label>
                            <Input 
                                id="price"
                                type="text"
                                className="w-full"
                                placeholder="Insira o valor do serviço"
                                {...register2("price")}
                                error={errors2.price}
                            />
                        </div>
                        <div className="w-full md:w-1/2 mt-4 md:mt-0">
                            <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Tempo médio de atendimento</label>
                            <Input 
                                id="durationMedio"
                                type="time"
                                className="w-full"
                                placeholder="Insira o valor do serviço"
                                {...register2("duration_medio")}
                                error={errors2.duration_medio}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-row">
                        <input
                            type="checkbox"
                            id="ext"
                            {...register2("ext")}
                        />
                        <label className="pl-2 text-sm font-medium leading-tight text-gray-700 dark:text-white">Serviço Externo</label>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-row">
                        <input
                            type="checkbox"
                            id="active_duration_auto"
                            {...register2("active_duration_auto")}
                        />
                        <label className="pl-2 text-sm font-medium leading-tight text-gray-700 dark:text-white">Ativar duração automatica?</label>
                    </div>

                    <div className="w-full py-6 flex flex-row flex-wrap shadow-sm border-t border-gray-300 dark:border-gray-500">
                    <div className="w-full flex justify-between">
                        <div className='text-start'>
                            <p className="text-sm md:text-2xl font-bold leading-loose text-gray-900 dark:text-white">Horário do Serviço</p>
                            <p className="text-xs leading-none text-gray-400">Confira os horários de serviço</p>
                        </div>
                        <button className="h-10 flex items-center justify-center px-3 bg-teal-500 border rounded-md border-teal-500 cursor-pointer"
                            type="button"
                            onClick={() => newAvaliableTimeDisposer.open()}
                        >
                            <p className="md:block text-sm font-medium leading-tight text-white">Adicionar horário</p>
                        </button>
                    </div>
                
                    <Table.Root tableHeight={String(4)} style="mt-8">
                        <Table.Header>
                            <Table.CellHeader>DIA DA SEMANA</Table.CellHeader>
                            <Table.CellHeader>HORÁRIO</Table.CellHeader>
                        </Table.Header>
                        {fields.map((item, index) => (
                            <Table.Row
                                key={item.id}
                                onDelete={() => remove(index)}
                            >
                                <Table.CellBody>
                                    <p className="text-ellipsis overflow-hidden">
                                        {watchAvailabilities && convertNumberToDay(Number(watchAvailabilities[index]?.day))}
                                    </p>
                                </Table.CellBody>
                                <Table.CellBody>
                                    <p className="text-ellipsis overflow-hidden">
                                        {watchAvailabilities && watchAvailabilities[index]?.start} - {watchAvailabilities && watchAvailabilities[index]?.end}
                                    </p>
                                </Table.CellBody>
                            </Table.Row>
                        ))}
                    </Table.Root> 
                </div>
                </form>
            </Modal.Body>
            <Modal.Footer
                onClose={onClose}
                form="formService"
            />
        </Modal.Root>
    )     
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();