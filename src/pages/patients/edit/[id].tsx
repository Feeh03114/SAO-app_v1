import Header from "@/components/Header";
import Table from "@/components/Table";
import Card from "@/components/elementTag/cardText";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

interface Patients {
    nome: string;
    sobrenome: string;
    cpf: string;
    rg: string;
    dataDeNascimento: string;
    genero: string;
    etnia: string;
    email: string;
    telefone: string;
    profissao: string;
    nacionalidade: string;
    naturalidade: string;
    enderecos: string[],
    guardioes: string[],
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

export default function PatientsEdit(): JSX.Element {
    const { reset, control, register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationFullModal)
    });
    const [enderecos, setEnderecos] = useState<string[]>([]);
    const [guardioes, setGuardioes] = useState<string[]>([]);
    const newDisposer = useDisclosure();
    const router = useRouter();
    const id = router.query.id;
    const [data, setData] = useState<Patients>({
        nome: "John",
        sobrenome: "Doe",
        cpf: "123.456.789-00",
        rg: "12.345.678-9",
        dataDeNascimento: "01/01/1990",
        genero: "Masculino",
        etnia: "Branco",
        email: "johndoe@example.com",
        telefone: "(11) 99999-9999",
        profissao: "Desenvolvedor",
        nacionalidade: "Brasileiro",
        naturalidade: "São Paulo",
        enderecos: ["Casa da mãe", "Casa do pai"],
        guardioes: ["Mãe", "Pai"],
    });
    
    // const loadData = async () => {
    //     try {
    //         const { data: RespAPI } = await api.get(`api/patients/${id}`);
    //         console.log(RespAPI);
    //         setData(RespAPI);
    //     } catch (error) {
    //       console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     loadData();
    // }, []);

    // const loadEnderecos = async () => {
    //     const enderecosNames = await Promise.all(data.enderecos.map(async (id) => {
    //         try {
    //             const { data: RespAPI } = await api.get(`api/enderecos/${id}`);
    //             return RespAPI.name;
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }));
    //     setEnderecos(enderecosNames);
    // };

    // useEffect(() => {
    //     loadEnderecos();
    // }, [data.enderecos]);

    const loadGuardioes = async () => {
        const guardioesNames = await Promise.all(data.guardioes.map(async (id) => {
            try {
                const { data: RespAPI } = await api.get(`api/guardioes/${id}`);
                return RespAPI.name;
            } catch (error) {
                console.log(error);
            }
        }));
        setGuardioes(guardioesNames);
    };

    useEffect(() => {
        loadGuardioes();
    }, [data.enderecos]);
    
    
    return (
        <>
            <Header 
                title={"Visualização do Paciente"}
                subtitle={"Acompanhe o paciente na plataforma"}
                textLeft="Arquivos"
                textRight="Editar"
                onClickLeft={()=> console.log('Arquivos')}
                onClickRight={()=> console.log('Editar')}
                typeButtonLeft="files"
                typeButtonRight="edit"
            />

            <div className="w-screen">
                <Card.Root>
                    <Card.Text label="Nome" text={data.nome} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="Sobrenome" text={data.sobrenome} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="CPF" text={data.cpf} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="RG" text={data.rg} width="w-1/2 md:w-1/4"></Card.Text>

                    <Card.Text label="Data de nascimento" text={data.dataDeNascimento} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="Gênero" text={data.genero} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="Etnia" text={data.etnia} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="E-mail" text={data.email} width="w-1/2 md:w-1/4"></Card.Text>

                    <Card.Text label="Telefone" text={data.telefone} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="Profissão" text={data.profissao} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="Nacionalidade" text={data.nacionalidade} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="Naturalidade" text={data.naturalidade} width="w-1/2 md:w-1/4"></Card.Text>

                    <Card.CardSelected label="Endereços" width="w-full">
                        {data.enderecos.map((endereco, index) => (
                            <Card.TextSelected key={index} text={endereco}></Card.TextSelected>
                        ))}
                    </Card.CardSelected>
                    <Card.CardSelected label="Guardiões" width="w-full">
                        {data.guardioes.map((guardiao, index) => (
                            <Card.TextSelected key={index} text={guardiao}></Card.TextSelected>
                        ))}
                    </Card.CardSelected>

                    <label className="pl-8 text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-white">Status</label>
                    <Table.Root tableHeight={String(6)} style="mx-3">
                        <Table.Header>
                            <Table.CellHeader>TRATAMENTO</Table.CellHeader>
                            <Table.CellHeader>ULTIMA DISCIPLINA</Table.CellHeader>
                            <Table.CellHeader>STATUS</Table.CellHeader>
                        </Table.Header>
                    </Table.Root> 
                </Card.Root>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();