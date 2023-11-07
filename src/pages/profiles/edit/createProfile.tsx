import Header from "@/components/Header";
import Table from "@/components/Table";
import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { Controller, useForm } from "react-hook-form";
import * as yup from 'yup';

const mock = [
    { id: 1, name: 'Exemplo 1' },
    { id: 2, name: 'Exemplo 2' },
    { id: 3, name: 'Exemplo 3' },
    { id: 4, name: 'Exemplo 4' },
    { id: 5, name: 'Exemplo 5' },
    { id: 6, name: 'Exemplo 6' },
    { id: 7, name: 'Exemplo 7' },
]

const validationFullModal = yup.object().shape({
    // prontuario: yup.string().required('O prontuario é obrigatório'),
    // nome: yup.string().required('O nome é obrigatório'),
    // data: yup.date().min(new Date(Date.now() - 86400000), 'A data deve ser igual ou posterior ao dia atual').required('A data é obrigatória'),
    // horario: yup.string().required('O horário é obrigatório'),
    // typeConsult: yup.string().required('O tipo da consulta é obrigatório'),
    // servico: yup.number().test('isNumber', 'O serviço é obrigatório', function(value) {
    //     const {typeConsult} = this.parent;
    //     if(typeConsult === 'novaConsulta') return value !== undefined;
    //     return true;
    // }),
    // queixa: yup.string().test('isString', 'A queixa é obrigatória', function(value) {
    //     const {typeConsult} = this.parent;
    //     if(typeConsult === 'novaConsulta') return value !== undefined;
    //     return true;
    // }),

});

export default function CreateProfile(): JSX.Element {
    const { reset, control, register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFullModal)
    });
    const newDisposer = useDisclosure();
    
    return (
        <>
            <Header 
                title="Novo Perfil"
                subtitle="Confira os dados do perfil"
                textLeft="Voltar"
                textRight="Salvar informações"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newDisposer.open}
                typeButtonRight="edit"
            />
            
            <div className="w-screen px-8">
                <div className="w-full p-6 flex flex-row flex-wrap shadow-sm border rounded-lg border-gray-300 dark:border-gray-500">
                    <div className="w-full md:w-1/2 px-2">
                        <Input 
                            id="nomePerfil"
                            type="text"
                            label="Nome"
                            placeholder="Novo Perfil"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-full md:w-1/4 px-2">
                        <Select placeHolder={"Tipo do usuário"} data={mock} control={control}></Select>
                    </div>
                    <div className="w-full md:w-1/4 px-2 mt-4 md:mt-0">
                        <label className="pl-4 text-sm font-medium leading-tight truncate text-gray-700 dark:text-white">Tipo de usuário</label>
                        <div id="pagante" className="mt-2 col-span-2">
                            <Controller
                                name='typeUser'
                                control={control}
                                render={({ field }) => (
                                    <label className="ml-4 truncate">
                                        <input 
                                            id="typeUser"
                                            type="radio" 
                                            name="type"
                                            className="text-teal-400 mr-2"
                                            checked={field.value === 'typeUser'}
                                            onChange={(e) => field.onChange(e.target.checked && 'typeUser')}
                                        />
                                        Padrão
                                    </label>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-screen mt-8 px-8">
                <div className="w-full py-6 flex flex-row flex-wrap shadow-sm border-t border-gray-300 dark:border-gray-500">
                    <div className='text-start'>
                        <p className="text-sm md:text-2xl font-bold leading-loose text-gray-900 dark:text-white">Página do Perfil</p>
                        <p className="text-xs leading-none text-gray-400">Confira as páginas do perfil</p>
                    </div>
                    <Table.Root tableHeight={String(6)} style="mt-8">
                        <Table.Header>
                            <Table.CellHeader>PÁGINA</Table.CellHeader>
                            <Table.CellHeader>VIZUALIZAÇÃO</Table.CellHeader>
                            <Table.CellHeader>CRIAÇÃO</Table.CellHeader>
                            <Table.CellHeader>EDIÇÃO</Table.CellHeader>
                            <Table.CellHeader>DELETAR</Table.CellHeader>
                            <Table.CellHeader>PERSONALIZAVEIS</Table.CellHeader>
                        </Table.Header>
                        <Table.Row>
                            <Table.CellBody>Agendamento</Table.CellBody>
                            <Table.CellBody>
                                {/* <button className="h-full mr-4 px-3 py-2 border dark:border-gray-500 rounded-md cursor-pointer"
                                    onClick={}>
                                    <AiOutlineEye className="w-5 h-5 text-teal-500"/>
                                </button> */}
                            </Table.CellBody>
                        </Table.Row>
                    </Table.Root> 
                </div>
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();