import Header from "@/components/Header";
import Table from "@/components/Table/oldIndex";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Roles(): JSX.Element {
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
                onClickRight={()=> push('/roles/add')}
            />
            <Table 
                endPoint="api/role"
                colunm={
                    [
                        {
                            property: 'role',
                            label: 'Perfil',
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
