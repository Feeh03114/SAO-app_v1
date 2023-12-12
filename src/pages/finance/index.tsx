import Header from "@/components/Header";
import Table from "@/components/Table";
import { Pagination } from "@/components/Table/Pagination";
import { ModalDelete } from "@/components/elementTag/modalDelete";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TOTAL_ELEMENTS = 300;
const rowsNumber = 6;

interface Finance {
    id: string;
    prontuario: string;
    nome: string;
    servico: string;
    preco: string;
    status: boolean;
}

export default function Finance(): JSX.Element {
    const [data, setData] = useState<Finance[]>([]);
    // const [data, setData] = useState([]);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(rowsNumber);
    const deleteDisposer = useDisclosure();
    const [idDelete, setIdDelete] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const [params, setParams] = useState({
        page: 1,
        pageSize: rowsNumber,
        sortOrder: 'ASC',
        sortField: 'date',
        status: 0,
      });

    // const loadData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const { data:RespAPI } = await api.get("api/finance", {
    //             params: params
    //         });
    //         console.log(RespAPI);
    //         setTotalElements(RespAPI.totalElement);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     setIsLoading(false);
    // };
    
    // useEffect(() => {
    //     setParams({
    //         ...params,
    //         page: currentPage,
    //     });
    // }, [currentPage]);

    // useEffect(() => {
    //     loadData();
    // }, [params]);

    const mock: Finance[] = [];
    
    for (let index = 1; index <= TOTAL_ELEMENTS; index++) {
        const status = index % 2 === 0 ? true : false;
        const randomNumber = Math.floor(Math.random() * 10000000);
        const randomPrice = Math.floor(Math.random() * 100);
        mock.push({
            id: String(index),
            prontuario: String(randomNumber),
            nome: "Nome " + index.toString(),
            servico: "Consulta",
            preco: randomPrice + ",00",
            status: status
        });
    }
    
    const start = currentPage * rowsNumber - rowsNumber;
    const newMock = mock.slice(start, start + rowsNumber);
    
    const loadDataMock = async () => {
        setData(newMock);
        setCurrentPage(currentPage);
        setTotalElements(TOTAL_ELEMENTS);
    }

    useEffect(() => {
        loadDataMock();
        // loadData();
    }, [currentPage]);

    function deleteItem(id: string) {
        setIdDelete(id);
        deleteDisposer.open();
    }

    const onDelete = async (id: string) => {
        // try {
        //     const resp = await api.delete(`api/finance/${id}`);
        //     toast.success(resp.data.message);
        //     deleteDisposer.close();
        //     loadData();
        // } catch (error) {
        //     console.log(error);
        // }
        deleteDisposer.close();
    };

    return (
        <>
            <ModalDelete isOpen={deleteDisposer.isOpen} onClose={deleteDisposer.close} onDelete={() => onDelete(idDelete)}></ModalDelete> 
            <Header 
                title="Financeiro (Mockado)"
                subtitle="Consulte os pagamentos de serviços"
                textLeft="Filtros"
                onClickLeft={()=> console.log('filter')}
                typeButtonLeft="filter"
            />
            <Table.Root style="px-8">
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={true}>PRONTUÁRIO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>SERVIÇO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>PREÇO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>STATUS</Table.CellHeader>
                </Table.Header>

                <Table.Body tableHeight={String(rowsNumber)} rowNumber={data.length}>
                    {data.map((item: Finance, index: number) => (
                        <Table.Row 
                            key={index}
                            onView={()=> router.push(`/finance/edit/${item.prontuario}`)}
                            onDelete={() => deleteItem(item.id)}
                        >
                            <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.prontuario}</p></Table.CellBody>
                            <Table.CellBody><p className="font-medium dark:text-white">{item.nome}</p></Table.CellBody>
                            <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.servico}</p></Table.CellBody>
                            <Table.CellBody hiddenInMobile={true}>R$ {item.preco}</Table.CellBody>
                            <Table.CellBody><div className={`w-3 h-3 ml-4 rounded-full ${item.status ? 'bg-green-300' : 'bg-yellow-300'}`}></div></Table.CellBody>
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

function loadData() {
    throw new Error("Function not implemented.");
}
