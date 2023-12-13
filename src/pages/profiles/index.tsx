import Header from "@/components/Header/multipleButtons";
import { Pagination } from "@/components/Table/Pagination";
import Table from "@/components/Table/index";
import Card from "@/components/elementTag/cardText";
import { ModalDelete } from "@/components/elementTag/modalDelete";
import { useDisclosure } from "@/hook/useDisclosure";
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
    const [idDelete, setIdDelete] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const deleteDisposer = useDisclosure();
    const [totalElements, setTotalElements] = useState(rowsNumber);
    const [isLoading, setIsLoading] = useState(false);

    const [params, setParams] = useState({
        page: 1,
        pageSize: rowsNumber,
        sortOrder: 'ASC',
        sortField: 'date',
        status: 0,
    });

    const loadData = async () => {
        setIsLoading(true);
        try {
            const { data:RespAPI } = await api.get("api/profiles", {
                params: params
            });
            setData(RespAPI.data);
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
        setParams({
            ...params,
            page: currentPage,
        });
    }, [currentPage]);

    useEffect(() => {
        loadData();
    }, [params]);

    const onDelete = async (id: string) => {
        try {
            const resp = await api.delete(`api/profiles/${id}`);
            toast.success(resp.data.message);
            deleteDisposer.close();
            await loadData();
        } catch (error) {
            console.log(error);
        }
    };

    function deleteItem(id: string) {
        setIdDelete(id);
        deleteDisposer.open();
    }

    return (
        <>
            <ModalDelete isOpen={deleteDisposer.isOpen} onClose={deleteDisposer.close} onDelete={() => onDelete(idDelete)}></ModalDelete> 
              <Header.Root 
                title={"Perfis"}
                subtitle={"Consulte os perfis da plataforma"}
            >
                <Header.Button 
                    text="Filtros"
                    disabled={isLoading}
                    typeButton="filter"
                    onClick={()=> console.log('filter')}
                />
                <Header.Button 
                    text="Adicionar perfil"
                    typeButton="add"
                    textStyle="text-white"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    disabled={isLoading}
                    onClick={()=> router.push('/profiles/add')}
                />
            </Header.Root>
            <Table.Root style="px-8">
                <Table.Header>
                    <Table.CellHeader style={"w-40 md:w-60"}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>PÁGINAS</Table.CellHeader>
                </Table.Header> 

                <Table.Body tableHeight={String(rowsNumber)} rowNumber={data.length}>
                    {data.map((item: Profile, index: number) => (
                        <Table.Row 
                            key={index}
                            onView={()=> router.push(`/profiles/edit/${item.id}`)}
                            onDelete={() => deleteItem(item.id)}
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
                </Table.Body>
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
