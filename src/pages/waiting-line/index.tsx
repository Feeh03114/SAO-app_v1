import Header from "@/components/Header/multipleButtons";
import Table from "@/components/Table";
import { Pagination } from "@/components/Table/Pagination";
import { ModalDelete } from "@/components/elementTag/modalDelete";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TOTAL_ELEMENTS = 3;
const rowsNumber = 6;

export interface WaitingLine {
    id: string;
    medicalRecord: string;
    nome: string;
    cameFrom: string;
    forwardedTo: string;
    date: string;
    status: string;
    approvalStatus: boolean;
    approver: string;
    birthDate: string;
    email: string;
    cellPhone: string;
    complaint: string;
    report: string;
}

export default function WaitingLineIndex(): JSX.Element {
    const [data, setData] = useState<WaitingLine[]>([]);
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

    const mock: WaitingLine[] = [];
    
    for (let index = 1; index <= TOTAL_ELEMENTS; index++) {
        const status = index % 2 === 0 ? true : false;
        const randomNumber = Math.floor(Math.random() * 10000000);
        mock.push({
            id: String(index),
            medicalRecord: String(randomNumber),
            nome: "Nome " + index.toString(),
            cameFrom: "Triagem",
            forwardedTo: "Odonto 1",
            date: "2021-09-01",
            status: "Em tratamento",
            approvalStatus: status,
            approver: "Professor",
            birthDate: "2021-09-01",
            email: "email" + index.toString() + "@gmail.com",
            cellPhone: "123456789",
            complaint: "Queixa teste",
            report: "Relatório teste"
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
            <Header.Root 
                title="Fila de espera (Mockado)"
                subtitle="Consulte os pagamentos de serviços"
            >
                <Header.Button 
                    text={"Filtros"} 
                    onClick={()=> console.log('filter')}
                    typeButton="filter"
                />
            </Header.Root>
            
            <Table.Root>
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={true}>PRONTUÁRIO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>VEIO DE</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>ENCAMINHADO PARA</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>DATA DE ENCAMINHAMENTO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>STATUS</Table.CellHeader>
                </Table.Header>

                <Table.Body tableHeight={String(6)} rowNumber={data.length}>
                    {data.map((item: WaitingLine, index: number) => (
                        <Table.Row
                            key={index}
                            onView={()=> router.push(`/waiting-line/edit/${item.id}`)}
                            onDelete={() => deleteItem(item.id)}
                        >
                            <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.medicalRecord}</p></Table.CellBody>
                            <Table.CellBody><p className="font-medium dark:text-white">{item.nome}</p></Table.CellBody>
                            <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.cameFrom}</p></Table.CellBody>
                            <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.forwardedTo}</p></Table.CellBody>
                            <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.date}</p></Table.CellBody>
                            <Table.CellBody hiddenInMobile={true}><div className={`w-3 h-3 ml-4 rounded-full ${item.approvalStatus ? 'bg-green-300' : 'bg-yellow-300'}`}></div></Table.CellBody>
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
