import Header from "@/components/Header";
import { Pagination } from "@/components/Table/Pagination";
import Table from "@/components/Table/index";
import Card from "@/components/elementTag/cardText";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const rowsNumber = 5;

interface Profile {
    id: string;
    name: string;
    permissions: [
        {
            isRead: boolean;
            page: {
                    namePage: string;
            }
        }
    ]
}

export default function Profiles(): JSX.Element {
    const router = useRouter();
    const [data, setData] = useState<Profile[]>([]);
    // const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(rowsNumber);
    const [isLoading, setIsLoading] = useState(false);

    const [params, setParams] = useState({
        page: currentPage,
        pageSize: rowsNumber,
        sortOrder: 'ASC',
        sortField: 'id',
        status: 0,
    });

    const loadData = async () => {
        setIsLoading(true);
        try {
            const { data:RespAPI } = await api.get("api/profiles", {
                params: params
            });
            setData(RespAPI.data);
            setCurrentPage(RespAPI.page);
            setTotalElements(RespAPI.totalElement);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
    };
    
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
    }, [currentPage]);

    const onDelete = async (id: string) => {
        try {
            const resp = await api.delete(`api/profiles/${id}`);
            toast.success(resp.data.message);
            await loadData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Header 
                title="Perfis"
                subtitle="Consulte os perfis da plataforma"
                textLeft="Filtros"
                textRight="Adicionar Perfil"
                onClickLeft={()=> console.log('filter')}
                onClickRight={()=> router.push('/profiles/add')}
                typeButtonLeft="filter"
                typeButtonRight="add"
            />
            <Table.Root tableHeight={String(rowsNumber)}>
                <Table.Header>
                    <Table.CellHeader style={"w-40 md:w-60"}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>PÁGINAS</Table.CellHeader>
                </Table.Header> 

                {data.map((item: Profile, index: number) => (
                    <Table.Row 
                        key={index}
                        onView={()=> router.push(`/profiles/edit/${item.id}`)}
                        onDelete={()=> onDelete(item.id)}
                    >
                        <Table.CellBody><p className="font-medium dark:text-white">{item.name}</p></Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}>
                            <div className="py-1 flex flex-row flex-wrap">
                                {item.permissions.map((item: any, index: number) => (
                                    item.isRead && <Card.TextSelected key={index} text={item.page.namePage}></Card.TextSelected>
                                ))}
                            </div>
                        </Table.CellBody>
                    </Table.Row>
                ))}
            </Table.Root> 

            <Pagination
                pageSize={rowsNumber}
                totalElements={totalElements}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();
