import Header from "@/components/Header/multipleButtons";
import Card from "@/components/elementTag/cardText";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { WaitingLine } from "..";

export default function WaitingLineEdit(): JSX.Element {
    const { reset, control, register, setValue, watch, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const id = router.query.id;
    const [data, setData] = useState<WaitingLine>({
            id: "1234",
            medicalRecord: "Relatório teste",
            nome: "Nome Teste",
            cameFrom: "Triagem",
            forwardedTo: "Odonto 1",
            date: "2021-09-01",
            status: "Em tratamento",
            approvalStatus: false,
            approver: "Professor",
            birthDate: "2021-09-01",
            email: "teste@email.com",
            cellPhone: "123456789",
            complaint: "Queixa teste",
            report: "Relatório teste"
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

    // const onSave = async (data:WaitingLine) => {
        // console.log(data);
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
    // }

    return (
        <>
            <Header.Root 
                title={data.nome}
                subtitle={"Prontuário: " + data.id}
            >
                <Header.Button 
                    text="Voltar"
                    style="hidden md:block"
                    disabled={isLoading}
                    onClick={() => router.back()}
                />
                <Header.Button 
                    text="Voltar"
                    typeButton="return"
                    style="md:hidden"
                    disabled={isLoading}
                    onClick={() => router.back()}
                />
                <Header.Button 
                    text="Reprovar encaminhamento"
                    typeButton="delete"
                    style="bg-red-400 dark:bg-red-500"
                    textStyle="text-white"
                    onClick={()=> console.log('Reprovado')}
                />
                 <Header.Button 
                    text="Aprovar encaminhamento"
                    typeButton="confirm"
                    style="bg-teal-400 dark:bg-teal-500"
                    textStyle="text-white"
                    onClick={()=> console.log('Aprovado')}
                />
            </Header.Root>
            <div className="w-screen">
                <Card.Root>
                    <Card.Text label="Aprovador" text={data.approver} width="w-full md:w-1/2"></Card.Text>
                    <Card.Text label="Data de aprovação" text={data.date} width="w-full md:w-1/2"></Card.Text>

                    <Card.Text label="Data de Nascimento" text={data.birthDate} width="w-full  md:w-1/3"></Card.Text>
                    <Card.Text label="E-mail" text={data.email} width="w-full md:w-1/3"></Card.Text>
                    <Card.Text label="Telefone" text={data.cellPhone} width="w-full md:w-1/3"></Card.Text>

                    <Card.Line/>
                    <Card.TextArea label="Queixa" text={data.report} width="w-full"></Card.TextArea>
                    <Card.Line/>

                    <div className="w-full px-3 flex items-center justify-centers flex-col flex-wrap">
                        <div className="w-full pl-4 inline-flex items-center justify-between">
                            <p className="text-xs md:text-sm font-Inter font-medium leading-tight text-gray-700 dark:text-gray-300 truncate">Relatório da Consulta ou Triagem</p>
                            <div className="flex flex-row justify-between items-center">
                                <Card.Text text={data.cameFrom} width="w-full md:mb-2 px-2"></Card.Text>
                                <Card.Text text={data.status} width="w-full md:mb-2 px-2"></Card.Text>
                                <Card.Text text={data.forwardedTo} width="w-full md:mb-2 px-2 pr-0"></Card.Text>
                            </div>
                        </div>
                        <div className="w-full h-40 px-4 flex items-start shadow-sm border rounded-lg border-gray-300 dark:border-gray-500 bg-white dark:bg-slate-700">
                            <p className="mt-4 text-xs md:text-sm font-Inter font-normal leading-tight dark:text-white break-all">{data.medicalRecord}</p>
                        </div>
                    </div>
                </Card.Root>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();