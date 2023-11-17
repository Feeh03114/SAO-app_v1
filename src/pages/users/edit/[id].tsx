import Header from "@/components/Header";
import FormUser from "@/components/pages/users/formUser";
import { TypeUser } from "@/enum/typeUser.enum";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export interface User {
    id: string;
    ru: string;
    name: string;
    email: string;
    cro: string;
    typeUser:TypeUser;
    profilesIds: string[];
    permissions: Permission[];
}

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

export default function UsersEdit(): JSX.Element {
    const [user, setData] = useState<User>({} as User);
    const [profiles, setProfiles] = useState<string[]>([]);
    const newUserDisposer = useDisclosure();
    const permiteEdit = useDisclosure();
    const router = useRouter();
    const id = router.query.id;
    const [isLoading, setIsLoading] = useState(false);
    
    const loadData = async () => {
        try {
            const { data: RespAPI } = await api.get(`api/users/${id}`);
            console.log(RespAPI);
            setData(RespAPI);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    function handleEdit() {
        if(!permiteEdit.isOpen)
            permiteEdit.open();
        else{
            const form = document.getElementById('formUser');
            form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }

    const onSave = async (data:any) => {
        console.log(data);
        setIsLoading(true);
        try {
            // const resp = await api.put(`/api/users/${id}`, data);
            // console.log(resp);
            // toast.success('Usuário atualizado com sucesso!');
            // router.back();
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
                title={user.name}
                subtitle={"RU: " + user.ru}
                textLeft="Voltar"
                textRight="Editar"
                onClickLeft={()=> console.log('Voltar')}
                onClickRight={newUserDisposer.open}
                typeButtonRight="edit"
            />

            <FormUser 
                isPermissionWrite={permiteEdit.isOpen}	
                edit={user}
                onSave={onSave}
                profiles={profiles}
            />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();