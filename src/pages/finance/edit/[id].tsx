import Header from "@/components/Header";
import Table from "@/components/Table";
import Card from "@/components/elementTag/cardText";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

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

export default function FinanceEdit(): JSX.Element {
    const newUserDisposer = useDisclosure();
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
                textRight="Adicionar Pagamento"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newUserDisposer.open}
            />

            <div className="w-screen">
                <Card.Root>
                    <Card.Text label="Data agenda" text={data.data} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="E-mail" text={data.email} width="w-full md:w-2/4"></Card.Text>
                    <Card.Text label="Telefone" text={data.telefone} width="w-full md:w-1/4"></Card.Text>

                    <Card.Text label="Horário" text={data.hora} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="Disciplina" text={data.disciplina} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="Serviço" text={data.servico} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="Preço" text={data.preco} width="w-full md:w-1/4"></Card.Text>
                    
                    <Table.Root tableHeight={String(6)} style="mx-3">
                        <Table.Header>
                            <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
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