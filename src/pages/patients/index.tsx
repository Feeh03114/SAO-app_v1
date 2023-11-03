import Header from "@/components/Header";
import Table from "@/components/Table";
import { Pagination } from "@/components/Table/Pagination";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const rowsNumber = 6;

export default function Patients(): JSX.Element {
    const newUserDisposer = useDisclosure();
    const [data, setData] = useState([]);
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

    const loadData = async () => {
        setIsLoading(true);
        try {
            const { data:RespAPI } = await api.get("api/patient", {
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

    return (
        <>
            <Header 
                title="Pacientes"
                subtitle="Consulte os pacientes da plataforma"
                isFilterVisibled
                textLeft="Filtros"
                textRight="Adicionar paciente"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newUserDisposer.open}
            />
            <Table.Root tableHeight={String(rowsNumber)}>
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={false}>PRONTUÁRIO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>E-MAIL</Table.CellHeader>
                </Table.Header>

                {data.map((item: { name: string, email: string, ru: string }, index: number) => (
                    <Table.Row key={index}>
                        <Table.CellBody><p className="font-medium dark:text-white"></p></Table.CellBody>
                        <Table.CellBody><p className="font-medium dark:text-white">{item.name}</p></Table.CellBody>
                        <Table.CellBody><p className="font-medium dark:text-white">{item.email}</p></Table.CellBody>
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
