import Header from "@/components/Header";
import Table from "@/components/Table";
import Card from "@/components/elementTag/cardText";
import { Input } from "@/components/elementTag/input";
import Select from "@/components/elementTag/select";
import Modal from "@/components/modal";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";
import * as yup from 'yup';

interface Finance {
    prontuario: string;
    data: string;
    email: string;
    telefone: string;
    hora: string;
    disciplina: string;
    nome: string;
    servico: string;
    preco: string;
    status: boolean;
}

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

export default function FinanceEdit(): JSX.Element {
    const { reset, control, register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFullModal)
    });
    const newDisposer = useDisclosure();
    const router = useRouter();
    const id = router.query.id;
    const [data, setData] = useState<Finance>({
        prontuario: "123456789",
        data: "01/01/2021",
        email: "exemple@email.com",
        telefone: "123456789",
        hora: "10:00",
        disciplina: "Disciplina teste",
        nome: "Nome teste",
        servico: "Consulta",
        preco: "10,00",
        status: true
    });
    
    // const loadData = async () => {
    //     try {
    //         const { data: RespAPI } = await api.get(`api/finance/${id}`);
    //         console.log(RespAPI);
    //         setData(RespAPI);
    //     } catch (error) {
    //       console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     loadData();
    // }, []);
    
    return (
        <>
            <Header 
                title={data.nome}
                subtitle={"Prontuário: " + data.prontuario}
                isFilterVisibled
                textLeft="Voltar"
                onClickLeft={()=> console.log('filter')}
            />

            <Modal.Root
                isOpen={newDisposer.isOpen}
                onClose={newDisposer.close}
                width="md:max-w-5xl"
            >
                <Modal.Header title="Dados de pagamento" icon={HiOutlinePlus} />
                <Modal.Body>
                    <div className="w-1/2 mt-4">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Quem é o pagante</label>
                        <div id="pagante" className="mt-2 col-span-2">
                            <Controller
                                name='typePaying'
                                control={control}
                                defaultValue={'paciente'}
                                render={({ field }) => (
                                    <>
                                        <label className="ml-4">
                                            <input 
                                                id="paciente"
                                                type="radio" 
                                                name="type"
                                                className="text-teal-400 mr-2"
                                                checked={field.value === 'paciente'}
                                                onChange={(e) => field.onChange(e.target.checked && 'paciente')}
                                            />
                                            O paciente
                                        </label>
                                        <label className="ml-4">
                                            <input 
                                                id="guardiao"
                                                type="radio" 
                                                value="guardiao"
                                                name="type"
                                                className="text-teal-400 mr-2"
                                                checked={field.value === 'guardiao'}
                                                onChange={(e) => field.onChange(e.target.checked && 'guardiao')}
                                            />
                                           O guardião
                                        </label>
                                        <label className="ml-4">
                                            <input 
                                                id="outro"
                                                type="radio" 
                                                value="outro"
                                                name="type"
                                                className="text-teal-400 mr-2"
                                                checked={field.value === 'outro'}
                                                onChange={(e) => field.onChange(e.target.checked && 'outro')}
                                            />
                                           Outro
                                        </label>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <div className="w-1/2 px-2">
                        <Select label={"Nome do guardião"} placeHolder={"Selecione um guardião"} data={mock} control={control}></Select>
                    </div>

                    <div className="w-2/4 px-2">
                        <Input 
                            id="nomePagante"
                            type="text"
                            label="Nome completo do pagante"
                            placeholder="Insira o nome completo"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="cpf"
                            type="text"
                            label="CPF"
                            placeholder="Insira o CPF"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="rg"
                            type="text"
                            label="RG"
                            placeholder="Insira o RG"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>

                    <div className="w-1/4 px-2">
                        <Input 
                            id="dataNascimento"
                            type="text"
                            label="Data de nascimento"
                            placeholder="dd/mm/aaaa"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="celular"
                            type="text"
                            label="Celular"
                            placeholder="Insira o celular"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="Telefone"
                            type="text"
                            label="Telefone"
                            placeholder="Insira o telefone"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="email"
                            type="text"
                            label="E-mail"
                            placeholder="Insira o e-mail"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>

                    <div className="w-1/4 px-2">
                        <Input 
                            id="cep"
                            type="text"
                            label="CEP"
                            placeholder="Insira o CEP"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-2/4 px-2">
                        <Input 
                            id="logradouro"
                            type="text"
                            label="Logradouro"
                            placeholder="Insira o logradouro"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="numero"
                            type="text"
                            label="Número"
                            placeholder="Insira o número"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>

                    <div className="w-1/4 px-2">
                        <Input 
                            id="bairro"
                            type="text"
                            label="Bairro"
                            placeholder="Insira o bairro"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="uf"
                            type="text"
                            label="UF"
                            placeholder="Insira o uf"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-2/4 px-2">
                        <Input 
                            id="complemento"
                            type="text"
                            label="Complemento"
                            placeholder="Insira o complemento"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>

                    <div className="w-2/6 px-2">
                        <Select label={"Forma de pagamento"} placeHolder={"Selecione um forma de pagamento"} data={mock} control={control}></Select>
                    </div>
                    <div className="w-1/6 px-2">
                        <Select label={"Parcela"} placeHolder={"0x"} data={mock} control={control}></Select>
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="bandeiraCartao"
                            type="text"
                            label="Bandeira do cartão"
                            placeholder="Insira a bandeira do cartão"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-1/4 px-2">
                        <Input 
                            id="valor"
                            type="text"
                            label="Valor"
                            placeholder="R$ 0,00"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>

                </Modal.Body>
                <Modal.Footer/>
            </Modal.Root>

            <div className="w-screen">
                <Card.Root>
                    <Card.Text label="Data agenda" text={data.data} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="E-mail" text={data.email} width="w-1/2"></Card.Text>
                    <Card.Text label="Telefone" text={data.telefone} width="w-1/2  md:w-1/4"></Card.Text>

                    <Card.Text label="Horário" text={data.hora} width="w-1/2  md:w-1/4"></Card.Text>
                    <Card.Text label="Disciplina" text={data.disciplina} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="Serviço" text={data.servico} width="w-1/2  md:w-1/4"></Card.Text>
                    <Card.Text label="Preço" text={data.preco} width="w-1/2  md:w-1/4"></Card.Text>
                    
                    <div className="w-full flex justify-end">
                        <Card.Button text="Adicionar Pagamento" onClickButton={newDisposer.open}></Card.Button>
                    </div>

                    <Table.Root tableHeight={String(6)} style="mx-3">
                        <Table.Header>
                            <Table.CellHeader>NOME</Table.CellHeader>
                            <Table.CellHeader hiddenInDesktop={true}>STATUS</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>FORMA DE PAGAMENTO</Table.CellHeader>
                        </Table.Header>
                    </Table.Root> 
                </Card.Root>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();