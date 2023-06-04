import Header from "@/components/Header";
import Table from "@/components/Table";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Users(): JSX.Element {
    const {push} = useRouter();
    return (
        <>
            <Header 
                title="Usuários"
                subtitle="Consulte os usuários da plataforma"
                isFilterVisibled
                textLeft="Filtros"
                textRight="Adicionar Consulta"
                onClickLeft={()=> console.log('filter')}
                onClickRight={()=> push('/users/add')}
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
