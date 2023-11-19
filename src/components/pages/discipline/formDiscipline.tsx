import Table from "@/components/Table";
import { Input } from "@/components/elementTag/input";
import { useDisclosure } from "@/hook/useDisclosure";
import { Service } from "@/pages/disciplines/add";
import { Profile } from "@/pages/profiles/edit/[id]";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from 'yup';
import FormServiceDiscipline from "./formServiceDiscipline";

const validationDiscipline = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
});

interface FormProfileProps {
    edit?: Profile;
    isPermissionWrite?: boolean;
    onSave:(data:any)=>void;
}
/* {
    resolver: yupResolver(validationDiscipline)
} */
export default function FormDiscipline({ isPermissionWrite=true, onSave }:FormProfileProps): JSX.Element {
    const { control, register, watch, handleSubmit, formState: { errors: errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
        control: control, 
        name: "service",
    });
    const watchService= watch('service')
    const newServiceDisposer = useDisclosure();

    const onSaveDiscipline = async (data:any) => {
        //data.service = fields;
        onSave(data);
    }

    function updateService(data: Service) {
        append(data);
    }

    function convertMinutesToHours(minutes: number) {
        const hours = Math.floor(minutes / 60);
        const minutesRest = minutes % 60;
        return `${hours}:${minutesRest}`;
    }
    
    return (
        <>
            <FormServiceDiscipline isOpen={newServiceDisposer.isOpen} onClose={newServiceDisposer.close} onSave={updateService}/>
            <form id='formDiscipline' onSubmit={handleSubmit(onSaveDiscipline)}>
                
                <div className="w-screen px-8">
                    <div className="w-full p-6 flex flex-row flex-wrap shadow-sm border rounded-lg border-gray-300 dark:border-gray-500">
                        <div className="w-full px-2">
                            <Input 
                                id="nomeDisciplina"
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
                                <p className="sm-mobile:hidden md:block text-sm font-medium leading-tight text-white">Adicionar horário</p>
                            </button>
                        </div>
                    
                        <Table.Root tableHeight={(watchService?.length + 1) <= 4 ? String(4) : (watchService?.length + 1).toString()}style="mt-8">
                            <Table.Header>
                                <Table.CellHeader>NOME DO SERVIÇO</Table.CellHeader>
                                <Table.CellHeader>DESCRIÇÃO DO SERVIÇO</Table.CellHeader>
                                <Table.CellHeader>TEMPO DO SERVIÇO</Table.CellHeader>
                                <Table.CellHeader>PREÇO</Table.CellHeader>
                                <Table.CellHeader>EXTERNO</Table.CellHeader>
                            </Table.Header>
                            {fields.map((item, index) => (
                                <Table.Row
                                    key={item.id}
                                    onDelete={()=> remove(index)}
                                >
                                    <Table.CellBody><p className="text-ellipsis overflow-hidden">{watchService && watchService[index]?.name}</p></Table.CellBody>
                                    <Table.CellBody><p className="text-ellipsis overflow-hidden">{watchService && watchService[index]?.description}</p></Table.CellBody>
                                    <Table.CellBody>{watchService && convertMinutesToHours(watchService[index]?.duration_medio)} h</Table.CellBody>
                                    <Table.CellBody>R$ {watchService && watchService[index]?.price}</Table.CellBody>
                                    <Table.CellBody>{watchService && watchService[index]?.ext ? "Sim" : "Não"}</Table.CellBody>
                                </Table.Row>
                            ))}
                            
                        </Table.Root> 
                    </div>
                </div>
            </form>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();