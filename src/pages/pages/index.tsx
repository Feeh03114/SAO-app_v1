import Header from "@/components/Header/multipleButtons";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Pages(): JSX.Element {
    const { push, pathname } = useRouter();
    return <>
        <Header.Root 
            title={"Páginas"}
            subtitle={"Consulte as páginas cadastradas no sistema"}
        >
            <Header.Button 
                text="Filtros"
                typeButton="filter"
                onClick={()=> console.log('filter')}
            />
            <Header.Button 
                text="Adicionar consulta"
                typeButton="add"
                style="mr-0 bg-teal-400 dark:bg-teal-500"
                onClick={()=> push('/pages/add')}
            />
        </Header.Root>
        {/* <Table 
            endPoint="api/page"
            colunm={
                [
                    {
                        property: 'namePage',
                        label: 'Nome',
                    },
                    {
                        property: 'icon',
                        label: 'Icone',
                    },
                    {
                        property: 'url',
                        label: 'Rota',
                    },
                    {
                        property: 'actions',
                        label: 'Ações',
                        type: 'actions',
                        optionsActions: ['view'],
                    }
                ]
            }
        /> */}
    </>;
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();
