import Header from "@/components/Header";
import Table from "@/components/Table";
import { Pagination } from "@/components/Table/Pagination";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const TOTAL_ELEMENTS = 25;
const rowsNumber = 6;

interface Finance {
    prontuario: string;
    nome: string;
    servico: string;
    preco: string;
    status: boolean;
}

export default function Finance(): JSX.Element {
    const [data, setData] = useState<Finance[]>([]);
    // const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(rowsNumber);
    const [isLoading, setIsLoading] = useState(false);

    const [params, setParams] = useState({
        page: currentPage,
        pageSize: rowsNumber,
        sortOrder: 'ASC',
        sortField: 'id',
        status: 2,
      });

    // const loadData = async () => {
    //     setIsLoading(true);
    //     try {
    //         const { data:RespAPI } = await api.get("api/finance", {
    //             params: params
    //         });
    //         console.log(RespAPI);
    //         setData(RespAPI.data);
    //         setCurrentPage(RespAPI.page);
    //         setTotalElements(RespAPI.totalElement);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //     setIsLoading(false);
    // };
    
    // useEffect(() => {
    //     loadData();
    // }, []);

    const mock: Finance[] = [];
    
    for (let index = 1; index <= TOTAL_ELEMENTS; index++) {
        const status = index % 2 === 0 ? true : false;
        const randomNumber = Math.floor(Math.random() * 10000000);
        const randomPrice = Math.floor(Math.random() * 100);
        mock.push({
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

    return (
        <>
            <Header 
                title="Financeiro (Mockado)"
                subtitle="Consulte os pagamentos de serviços"
                isFilterVisibled
                textLeft="Filtros"
                onClickLeft={()=> console.log('filter')}
            />
            <Table.Root tableHeight={String(rowsNumber)}>
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={true}>PRONTUÁRIO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>SERVIÇO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>PREÇO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>STATUS</Table.CellHeader>
                </Table.Header>

                {data.map((item: Finance, index: number) => (
                    <Table.Row key={index}>
                        <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.prontuario}</p></Table.CellBody>
                        <Table.CellBody><p className="font-medium dark:text-white">{item.nome}</p></Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.servico}</p></Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}>R$ {item.preco}</Table.CellBody>
                        <Table.CellBody><div className={`w-3 h-3 ml-4 rounded-full ${item.status ? 'bg-green-300' : 'bg-yellow-300'}`}></div></Table.CellBody>
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