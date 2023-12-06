import Header from "@/components/Header";
import FormProfile from "@/components/pages/profile/formProfile";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

export interface Profile {
    id: string;
    name: string;
    typeUser: number;
    permissions: Permission[];
}

export default function RolesEdit(): JSX.Element {
    const router = useRouter();
    const { id } = router.query;
    const permiteEdit = useDisclosure();
    const [profile, setProfile] = useState<Profile>({} as Profile);
    const [isLoading, setIsLoading] = useState(false);

    const loadingProfile = async () => {
        try {
            const resp = await api.get(`/api/profiles/${id}`);
            setProfile(resp.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadingProfile();
    }, []);

    function handleEdit() {
        if(!permiteEdit.isOpen)
            permiteEdit.open();
        else{
            const form = document.getElementById('formProfile');
            form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }

    const onSave = async (data:any) => {
        setIsLoading(true);
        try {
            const resp = await api.put(`/api/profiles/${id}`, data);
            console.log(resp);
            toast.success('Perfil atualizado com sucesso!');
            router.back();
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    return <>
        <Header 
            title="Editar Perfil"
            subtitle="Confira os dados do perfil"
            textLeft={permiteEdit.isOpen ? "Cancelar" : "Voltar"}
            textRight={permiteEdit.isOpen ? "Salvar informações" : "Editar informações"}
            onClickLeft={() => permiteEdit.isOpen? permiteEdit.close(): router.back()}
            onClickRight={handleEdit}
            typeButtonRight={permiteEdit.isOpen ? "confirm" : "edit"}
            disabledLeft={isLoading}
            disabledRight={isLoading}
        />
        <FormProfile
            isPermissionWrite={permiteEdit.isOpen}	
            edit={profile}
            onSave={onSave}
        />
    </>
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();