import Header from "@/components/Header/multipleButtons";
import FormDiscipline from "@/components/pages/discipline/formDiscipline";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Discipline } from "..";

export default function DisciplineEdit(): JSX.Element {
    const router = useRouter();
    const { id } = router.query;
    const permiteEdit = useDisclosure();
    const [discipline, setDiscpline] = useState<Discipline>({} as Discipline);
    const [isLoading, setIsLoading] = useState(false);

    const loadingDiscipline = async () => {
        try {
            const resp = await api.get(`/api/disciplines/${id}`);
            setDiscpline(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadingDiscipline();
    }, []);

    function handleEdit() {
        if(!permiteEdit.isOpen)
            permiteEdit.open();
        else{
            const form = document.getElementById('formDiscipline');
            form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }

    const onSave = async (data:Discipline) => {
        setIsLoading(true);
        try {
            const resp = await api.put(`/api/disciplines/${id}`, data);
            toast.success('Disciplina atualizada com sucesso!');
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
                title={"Editar Disciplina"}
                subtitle={"Confira os dados da disciplina"}
            >
                <Header.Button 
                    text="Voltar"
                    disabled={isLoading}
                    onClick={() => router.back()}
                />
                 <Header.Button 
                    text="Editar informações"
                    typeButton="edit"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    textStyle="text-white"
                    disabled={isLoading}
                    onClick={() => handleEdit}
                />
            </Header.Root>
            <FormDiscipline 
            isPermissionWrite={permiteEdit.isOpen}	
            edit={discipline}
            onSave={onSave}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();