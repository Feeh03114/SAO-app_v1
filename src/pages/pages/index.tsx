import Header from "@/components/Header";
import Table from "@/components/Table";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Pages(): JSX.Element {
    const { push, pathname } = useRouter();
    return <>
        <Header 
            title="Páginas"
            subtitle="Consulte as páginas cadastradas no sistema."
            isFilterVisibled
            textLeft="Filtros"
            textRight="Adicionar Consulta"
            onClickLeft={()=> console.log('filter')}
            onClickRight={()=> push('/pages/add')}
        />
        <Table 
            endPoint="api/page"
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
    </>;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();
