import Table from "@/components/Table";
import { Input } from "@/components/elementTag/input";
import { useDisclosure } from "@/hook/useDisclosure";
import { Discipline } from "@/pages/disciplines";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from 'yup';
import FormServiceDiscipline, { validationService } from "./formServiceDiscipline";

const validationDiscipline = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    services: yup.array().of(validationService).min(1, 'Precisa ter pelo menos um serviço'),
});

interface FormProfileProps {
    edit?: Discipline;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}

export default function FormDiscipline({edit, isPermissionWrite=true, onSave}:FormProfileProps): JSX.Element {
    const { control, reset, register, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationDiscipline)
    });
  
    const { fields, append, remove } = useFieldArray({
        control: control, 
        name: "services",
    });
    const watchService= watch('services')
    const newServiceDisposer = useDisclosure();

    const loadingPages = async () =>{
        try {
            if(edit){
                reset({
                    ...edit,
                })
            }
            else
                reset({
                    name: '',
                    services: [],
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadingPages();
    }, [edit]);

    useEffect(() => {
        if(errors?.services)
        {
            if(errors.services?.message) toast.error(errors.services.message.toString());
            else if (Array.isArray(errors.services)) 
                for (const item of errors.services) {
                    for (const key in Object.keys(item)) {
                        toast.error(item[key].message);
                    }
                }
        }
    }, [errors]);

    const onSaveDiscipline = async (data:any) => onSave(data);

    const updateService = (data: any) => append(data);

    function convertMinutesToHours(minutes: number) {
        if (minutes > 60 ) {
            const hours = Math.floor(minutes / 60);
            const minutesRest = minutes % 60;
            return `${hours}:${minutesRest} h`;
        }
        return `${minutes} min`;
    }

    function tableHeight() {
        if (watchService === undefined) return String(4);
        return (watchService?.length + 1) <= 4 ? String(4) : (watchService?.length + 1).toString()
    }
    
    return (
        <>
            <FormServiceDiscipline isOpen={newServiceDisposer.isOpen} onClose={newServiceDisposer.close} onSave={updateService}/>
            <form id='formDiscipline' onSubmit={handleSubmit(onSaveDiscipline)}>
                <div className="w-screen px-8">
                    <div className="w-full p-6 flex flex-row flex-wrap shadow-sm border rounded-lg border-gray-300 dark:border-gray-500 dark:bg-slate-800">
                        <div className="w-full px-2">
                            <Input
                                required
                                id="name"
                                type="text"
                                label="Nome"
                                placeholder="Nome da Disciplina"
                                className="read-only:bg-gray-200 read-only:cursor-default"
                                {...register("name")}
                                error={errors.name}
                                readOnly={!isPermissionWrite}
                            />
                        </div>
                    </div>
                </div>

                <div className="w-screen mt-8 px-8">
                    <div className="w-full py-6 flex flex-row flex-wrap shadow-sm border-t border-gray-300 dark:border-gray-500">
                        <div className="w-full flex justify-between">
                            <div className='text-start'>
                                <p className="text-sm md:text-2xl font-bold leading-loose text-gray-900 dark:text-white">Serviços da Disciplina</p>
                                <p className="text-xs leading-none text-gray-400">Confira os serviços da disciplina</p>
                            </div>
                            <button className="h-10 flex items-center justify-center px-3 bg-teal-500 border rounded-md border-teal-500 cursor-pointer"
                                type="button"
                                onClick={() => newServiceDisposer.open()}
                            >
                                <p className="md:block text-sm font-medium leading-tight text-white">Adicionar horário</p>
                            </button>
                        </div>
                    
                        <Table.Root style="mt-8">
                            <Table.Header>
                                <Table.CellHeader>NOME DO SERVIÇO</Table.CellHeader>
                                <Table.CellHeader hiddenInMobile={true}>DESCRIÇÃO DO SERVIÇO</Table.CellHeader>
                                <Table.CellHeader>TEMPO DO SERVIÇO</Table.CellHeader>
                                <Table.CellHeader hiddenInMobile={true}>PREÇO</Table.CellHeader>
                                <Table.CellHeader hiddenInMobile={true}>EXTERNO</Table.CellHeader>
                            </Table.Header>

                            <Table.Body tableHeight={tableHeight()} rowNumber={fields.length}>
                                {fields.map((item:any, index) => (
                                    <Table.Row
                                        key={item.id}
                                        onDelete={()=> remove(index)}
                                    >
                                        <Table.CellBody><p className="text-ellipsis overflow-hidden">{item?.name}</p></Table.CellBody>
                                        <Table.CellBody hiddenInMobile={true}><p className="text-ellipsis overflow-hidden truncate">{item?.description}</p></Table.CellBody>
                                        <Table.CellBody>{convertMinutesToHours(item?.duration_medio || 0)}</Table.CellBody>
                                        <Table.CellBody hiddenInMobile={true}>
                                            {   
                                                "R$ " +
                                                item?.price.toLocaleString('pt-BR', {
                                                    style: 'currency',
                                                    currency: 'BRL',
                                                })
                                            }
                                        </Table.CellBody>
                                        <Table.CellBody hiddenInMobile={true}>{item?.ext ? "Sim" : "Não"}</Table.CellBody>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root> 
                    </div>
                </div>
            </form>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();