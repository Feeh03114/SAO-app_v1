
import Header from "@/components/Header";
import FormDiscipline from "@/components/pages/discipline/formDiscipline";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { Discipline } from "..";


export default function DisciplineAdd(): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    function handleEdit() {
        const form = document.getElementById('formDiscipline');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }

    const onSave = async (data:Discipline) => {
        setIsLoading(true);
        console.log("Data: ");
        console.log(data);
        try {
            const resp = await api.post(`/api/disciplines`, data);
            console.log("Resp: ");
            console.log(resp.data);
            toast.success('Disciplina criada com sucesso!');
            router.back();
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            <Header 
                title="Nova Disciplina"
                subtitle="Confira os dados da disciplina"
                textLeft="Voltar"
                textRight="Salvar informações"
                onClickLeft={()=> router.back()}
                onClickRight={handleEdit}
                typeButtonRight="confirm"
                disabledLeft={isLoading}
                disabledRight={isLoading}
            />
            <FormDiscipline onSave={onSave}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();