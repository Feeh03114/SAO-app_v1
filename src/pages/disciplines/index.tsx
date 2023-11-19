import Header from "@/components/Header";
import Table from "@/components/Table";
import { Pagination } from "@/components/Table/Pagination";
import { ModalDelete } from "@/components/elementTag/modalDelete";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const rowsNumber = 6;

interface disciplines {
    id: string;
    name: string;
}

export default function Subjects(): JSX.Element {
    const newUserDisposer = useDisclosure();
    const router = useRouter();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(rowsNumber);
    const [isLoading, setIsLoading] = useState(false);
    const [idDelete, setIdDelete] = useState<string>("");
    const deleteDisposer = useDisclosure();

    const [params, setParams] = useState({
        page: currentPage,
        pageSize: rowsNumber,
        sortOrder: 'ASC',
        sortField: 'id',
        status: 2,
      });

    const loadData = async () => {
        setIsLoading(true);
        try {
            const { data:RespAPI } = await api.get("api/disciplines", {
                params: params
            });
            console.log(RespAPI);
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

    function deleteItem(id: string) {
        setIdDelete(id);
        deleteDisposer.open();
    }

    const onDelete = async (id: string) => {
        try {
            const resp = await api.delete(`api/disciplines/${id}`);
            toast.success(resp.data.message);
            deleteDisposer.close();
            await loadData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <ModalDelete isOpen={deleteDisposer.isOpen} onClose={deleteDisposer.close} onDelete={() => onDelete(idDelete)}></ModalDelete> 
            <Header 
                title="Disciplinas"
                subtitle="Consulte as disciplinas da plataforma"
                textLeft="Filtros"
                textRight="Adicionar disciplina"
                onClickLeft={()=> console.log('filter')}
                onClickRight={()=> router.push('/disciplines/add')}
                typeButtonLeft="filter"
                typeButtonRight="add"
            />
            <Table.Root tableHeight={String(rowsNumber)}>
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={false}>TÍTULO</Table.CellHeader>
                </Table.Header>

                {data.map((item: disciplines, index: number) => (
                    <Table.Row 
                        key={index}
                        onView={()=> router.push(`/disciplines/edit/${item.id}`)}
                        onDelete={() => deleteItem(item.id)}
                    >
                        <Table.CellBody><p className="font-medium dark:text-white">{item.name}</p></Table.CellBody>
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
