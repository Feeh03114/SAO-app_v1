
import Header from "@/components/Header";
import FormDiscipline from "@/components/pages/discipline/formDiscipline";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
  
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

    function handleEdit() {
        const form = document.getElementById('formDiscipline');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }

    const onSave = async (data:Discipline) => {
        setIsLoading(true);
        try {
            const resp = await api.post(`/api/disciplines`, data);
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