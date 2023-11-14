import Header from "@/components/Header";
import Table from "@/components/Table";
import { Pagination } from "@/components/Table/Pagination";
import { ModalDelete } from "@/components/elementTag/modalDelete";
import { ModalUser } from "@/components/pages/users/modalUser";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const TOTAL_ELEMENTS = 25;
const rowsNumber = 6;

export default function Users(): JSX.Element {
    // interface User {
    //     name: string;
    //     email: string;
    //     ru: string;
    // }
    
    const newUserDisposer = useDisclosure();
    // const [data, setData] = useState<User[]>([]);
    const [data, setData] = useState([]);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(TOTAL_ELEMENTS);
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
            const { data:RespAPI } = await api.get("api/users", {
                params: params
            });
            console.log(RespAPI.data);
            verifyActive(RespAPI.data);
            setCurrentPage(RespAPI.page);
            setTotalElements(RespAPI.totalElement);
            console.log(RespAPI.data);
        } catch (error) {
          console.log(error);
        }
        setIsLoading(false);
    };

    function verifyActive(data: any) {
        data.map((item: any) => {
            item.active && setData(data);
        });
    }
    
    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadData();
        // loadDataMock();
    }, [currentPage]);

    const onDelete = async (id: string) => {
        try {
            const resp = await api.delete(`api/users/${id}`);
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
        <div className="flex flex-col flex-wrap">
            <ModalUser
                isOpen={newUserDisposer.isOpen}
                onClose={newUserDisposer.close}
            />
            <ModalDelete isOpen={deleteDisposer.isOpen} onClose={deleteDisposer.close} onDelete={() => onDelete(idDelete)}></ModalDelete> 
            <Header 
                title="Usuários"
                subtitle="Consulte os usuários da plataforma"
                textLeft="Filtros"
                textRight="Adicionar Usuário"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newUserDisposer.open}
                typeButtonLeft="filter"
                typeButtonRight="add"
            />
            <Table.Root tableHeight={String(rowsNumber)}>
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>REGISTRO UNIVERSITÁRIO</Table.CellHeader>
                </Table.Header>

                {data.map((item: { id:string, name: string, email: string, ru: string }, index: number) => (
                    <Table.Row 
                        key={index}                        
                        onView={()=> router.push(`/users/edit/${item.id}`)}
                        onDelete={() => deleteItem(item.id)}
                    >
                        <Table.CellBody><p className="font-medium dark:text-white">{item.name}</p></Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}>{item.email}</Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}>{item.ru}</Table.CellBody>
                    </Table.Row>
                ))}
            </Table.Root> 

            <Pagination
                pageSize={rowsNumber}
                totalElements={totalElements}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();