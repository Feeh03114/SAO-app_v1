
import Header from "@/components/Header";
import FormDiscipline from "@/components/pages/discipline/formDiscipline";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

interface Permission {
    profile_id: string;
    page_id: string;
    isRead: boolean;
    isCreate: boolean;
    isEdit: boolean;
    isDelete: boolean;
    filter: boolean;
    page: Page;
  }
  
  interface Page {
    id: string;
    namePage: string;
    url: string;
    icon: string;
    ordem: number;
  }
  
export interface Discipline {
    name: string;
    service: Service[];
}

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration_medio: number;
    active_duration_medio: boolean;
    ext: boolean;
    availabilities: Availabilities[];
}

export interface Availabilities {
    id: string;
    day: number;
    start: string;
    end: string;
}

export default function DisciplineAdd(): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, setFields] = useState<Discipline>({} as Discipline);

    const sendForm = async () => {
        const form = document.getElementById('formDiscipline');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));

        setIsLoading(true);
        try {
            const resp = await api.post(`/api/disciplines`, fields);
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

    const onSave = async (data:Discipline) => {
        console.log("Enviado");
        setFields(data);
    }

    return (
        <>
            <Header 
                title="Nova Disciplina"
                subtitle="Confira os dados da disciplina"
                textLeft="Voltar"
                textRight="Salvar informações"
                onClickLeft={()=> router.back()}
                onClickRight={sendForm}
                typeButtonRight="confirm"
                disabledLeft={isLoading}
                disabledRight={isLoading}
            />
            <FormDiscipline onSave={onSave}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();