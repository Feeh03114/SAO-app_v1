import Header from "@/components/Header";
import Table from "@/components/Table";
import Card from "@/components/elementTag/cardText";
import Modal from "@/components/modal";
import FormPaymentData from "@/components/pages/finance/formPaymentData";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlinePlus } from "react-icons/hi";

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
    const { reset, control, register, setValue, watch, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
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

    const onSave = async (data:Finance) => {
        console.log(data);
        // setIsLoading(true);
        // try {
        //     const resp = await api.post(`/api/patients`, data);
        //     console.log(resp.data);
        //     toast.success('Paciente criado com sucesso!');
        //     //router.back();
        // } catch (error:any) {
        //     console.log(error.response.data);
        //     if(error?.response?.data?.message){
        //         toast.error(error.response.data.message);
        //     }
        // }
        // finally{
        //     setIsLoading(false);
        // }
    }

    return (
        <>
            <Header 
                title={data.nome}
                subtitle={"Prontuário: " + data.prontuario}
                textLeft="Voltar"
                onClickLeft={()=> router.back()}
            />

            <Modal.Root
                isOpen={newDisposer.isOpen}
                onClose={newDisposer.close}
                width="md:max-w-5xl"
            >
                <Modal.Header title="Dados de pagamento" icon={HiOutlinePlus} />
                <Modal.Body>
                    <FormPaymentData onSave={onSave}/>
                </Modal.Body>
                <Modal.Footer onClose={newDisposer.close} form={"formFinance"}/>
            </Modal.Root>

            <div className="w-screen">
                <Card.Root>
                    <Card.Text label="Data agenda" text={data.data} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="E-mail" text={data.email} width="w-1/2"></Card.Text>
                    <Card.Text label="Telefone" text={data.telefone} width="w-1/2  md:w-1/4"></Card.Text>

                    <Card.Text label="Horário" text={data.hora} width="w-1/2  md:w-1/4"></Card.Text>
                    <Card.Text label="Disciplina" text={data.disciplina} width="w-full md:w-1/4"></Card.Text>
                    <Card.Text label="Serviço" text={data.servico} width="w-1/2 md:w-1/4"></Card.Text>
                    <Card.Text label="Preço" text={data.preco} width="w-1/2  md:w-1/4"></Card.Text>
                    
                    <div className="w-full flex justify-end">
                        <Card.Button text="Adicionar Pagamento" onClickButton={newDisposer.open}></Card.Button>
                    </div>

                    <Table.Row style="mx-2">
                        <Table.Header>
                            <Table.CellHeader>NOME</Table.CellHeader>
                            <Table.CellHeader hiddenInDesktop={true}>STATUS</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                            <Table.CellHeader hiddenInMobile={true}>FORMA DE PAGAMENTO</Table.CellHeader>
                        </Table.Header>
                        <Table.Body tableHeight={String(6)} rowNumber={0}>
                        </Table.Body>
                    </Table.Row> 
                </Card.Root>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();