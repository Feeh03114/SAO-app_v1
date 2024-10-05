import Header from "@/components/Header/multipleButtons";
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
        try {
            const resp = await api.post(`/api/disciplines`, data);
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
             <Header.Root 
                title={"Nova Disciplina"}
                subtitle={"Confira os dados da disciplina"}
            >
                <Header.Button 
                    text="Voltar"
                    disabled={isLoading}
                    onClick={() => router.back()}
                />
                 <Header.Button 
                    text="Salvar informações"
                    typeButton="confirm"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    disabled={isLoading}
                    onClick={handleEdit}
                />
            </Header.Root>
            <FormDiscipline onSave={onSave}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();