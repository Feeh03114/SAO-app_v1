
import Header from "@/components/Header";
import FormProfile from "@/components/pages/profile/formProfile";
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
  
  export interface Profile {
    id: string;
    name: string;
    typeUser: number;
    permissions: Permission[];
  }

export default function ProfileAdd(): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    function handleEdit() {
        const form = document.getElementById('formProfile');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }

    const onSave = async (data:Profile) => {
        setIsLoading(true);
        try {
            const resp = await api.post(`/api/profiles`, data);
            console.log(resp.data);
            toast.success('Perfil criado com sucesso!');
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
                title="Criar Perfil"
                subtitle="Confira os dados do perfil"
                textLeft="Voltar"
                textRight="Salvar informações"
                onClickLeft={()=> router.back()}
                onClickRight={handleEdit}
                typeButtonRight="confirm"
                disabledLeft={isLoading}
                disabledRight={isLoading}
            />
            <FormProfile onSave={onSave} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();