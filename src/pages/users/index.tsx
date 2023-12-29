import Header from "@/components/Header/multipleButtons";
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
import { FiXCircle } from "react-icons/fi";
import { MdCheckCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";

const TOTAL_ELEMENTS = 25;
const rowsNumber = 6;

export default function Users(): JSX.Element { 
    const newUserDisposer = useDisclosure();
    const [data, setData] = useState([]);
    const router = useRouter();
    const [totalElements, setTotalElements] = useState(TOTAL_ELEMENTS);
    const [isLoading, setIsLoading] = useState(false);
    const [idDelete, setIdDelete] = useState<string>("");
    const deleteDisposer = useDisclosure();

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
            const { data:RespAPI } = await api.get("api/users", {
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
    }, [params]);

/*     useEffect(() => {
        loadData();
    }, [params]); */

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

    const onChangeStatusUser = async (id: string) => {
        try {
            await  api.put(`api/users/change-status/${id}`);
            toast.success('Status alterado com sucesso!');
            await loadData();
        } catch (error:Error|any) {
            if(error?.response?.data?.message)
                toast.error(error.response.data.message);
            else
                toast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col flex-wrap">
            <ModalUser isOpen={newUserDisposer.isOpen} onClose={newUserDisposer.close} loadData={() => loadData()}/>
            <ModalDelete isOpen={deleteDisposer.isOpen} onClose={deleteDisposer.close} onDelete={() => onDelete(idDelete)}></ModalDelete> 
             <Header.Root 
                title={"Usuários"}
                subtitle={"Consulte os usuários da plataforma"}
            >
                <Header.Button 
                    text="Filtros"
                    typeButton="filter"
                    disabled={isLoading}
                    onClick={()=> console.log('filter')}
                />
                <Header.Button 
                    text="Adicionar usuário"
                    typeButton="add"
                    textStyle="text-white"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    disabled={isLoading}
                    onClick={newUserDisposer.open}
                />
            </Header.Root>
            <Table.Root style="px-8">
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>REGISTRO UNIVERSITÁRIO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true} style="text-end">STATUS</Table.CellHeader>
                </Table.Header>

                <Table.Body tableHeight={String(rowsNumber)} rowNumber={data.length}>
                    {data.map((item: { id:string, name: string, email: string, ru: string, active:boolean }, index: number) => (
                        <Table.Row 
                            key={index}                        
                            onView={()=> router.push(`/users/edit/${item.id}`)}
                            onDelete={() => deleteItem(item.id)}
                        >
                            <Table.CellBody><p className="font-medium dark:text-white">{item.name}</p></Table.CellBody>
                            <Table.CellBody hiddenInMobile={true}>{item.email}</Table.CellBody>
                            <Table.CellBody hiddenInMobile={true}>{item.ru}</Table.CellBody>
                            <Table.CellBody hiddenInMobile={true} style="text-end pr-6">
                                <button className="h-full px-3 py-2 border dark:border-slate-500 rounded-md cursor-pointer aria-hidden:hidden"
                                    onClick={() => onChangeStatusUser(item.id)}   
                                >
                                    <MdCheckCircleOutline 
                                        className="w-5 h-5 text-teal-500 aria-hidden:hidden"
                                        aria-hidden={!item.active}
                                    />
                                    <FiXCircle 
                                        className="w-5 h-5 text-red-500 aria-hidden:hidden"
                                        aria-hidden={item.active}
                                    />
                                </button>
                            </Table.CellBody>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root> 

            <Pagination
                pageSize={rowsNumber}
                totalElements={totalElements}
                currentPage={params.page}
                setCurrentPage={(page: number) => setParams({...params, page: page})}
            />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();