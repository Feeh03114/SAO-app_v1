import Header from "@/components/Header";
import Table from "@/components/Table";
import ModalFormDynamic from "@/components/modalFormDynamic";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";

export default function Users(): JSX.Element {
    const newUserDisposer = useDisclosure();
    return (
        <>
            <ModalFormDynamic
                nameForm={"modalRegisterUser"} 
                isOpen={newUserDisposer.isOpen} 
                onClose={newUserDisposer.close} 
                fieldRegister={[
                    {
                        title: 'Cadastrar Usuário',
                        description: 'Preencha os campos abaixo para cadastrar um novo usuário',
                        fields: [
                            {
                                key: 'name',
                                label: 'Nome',
                                type: 'text',
                                placeholder: 'Digite seu nome',
                            },
                            {
                                key: 'ru',
                                label: 'Registro Úniversitário',
                                type: 'text',
                                placeholder: 'Digite seu RU',
                            },
                            {
                                key: 'email',
                                label: 'E-mail',
                                type: 'email',
                                placeholder: 'Digite seu e-mail',
                            },
                            {
                                key: 'cro',
                                label: 'CRO',
                                type: 'text',
                                placeholder: 'Digite seu CRO',
                            },
                        ]
                    }
                ]}
            />
            <Header 
                title="Usuários"
                subtitle="Consulte os usuários da plataforma"
                isFilterVisibled
                textLeft="Filtros"
                textRight="Adicionar Usuário"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newUserDisposer.open}
            />
            <Table 
                endPoint="api/users"
                colunm={
                    [
                        {
                            property: 'name',
                            label: 'Nome',
                        },
                        {
                            property: 'email',
                            label: 'E-mail',
                        },
                        {
                            property: 'ru',
                            label: 'Resgistro Úniversitário',
                        },
                        {
                            property: 'cro',
                            label: 'CRO',
                        },
                        {
                            property: 'active',
                            label: 'Status',
                            type: 'status',
                        },
                        {
                            property: 'actions',
                            label: 'Ações',
                            type: 'actions',
                            optionsActions: ['view'],
                        }
                    ]
                }
            />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();
