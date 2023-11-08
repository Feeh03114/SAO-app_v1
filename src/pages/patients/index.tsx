import Header from "@/components/Header";
import Table from "@/components/Table";
import { Pagination } from "@/components/Table/Pagination";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TOTAL_ELEMENTS = 25;
const rowsNumber = 6;

interface Patients {
    prontuario: string;
    nome: string;
    email: string;
}

export default function Patients(): JSX.Element {
    const newUserDisposer = useDisclosure();
    const router = useRouter();
    const [data, setData] = useState<Patients[]>([]);
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
    //         const { data:RespAPI } = await api.get("api/patient", {
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

    const mock: Patients[] = [];
    
    for (let index = 1; index <= TOTAL_ELEMENTS; index++) {
        const status = index % 2 === 0 ? true : false;
        const randomNumber = Math.floor(Math.random() * 10000000);
        const randomPrice = Math.floor(Math.random() * 100);
        mock.push({
            prontuario: String(randomNumber),
            nome: "Nome " + index.toString(),
            email: "exemple" + index.toString() + "@email.com",
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
                title="Pacientes (Mockado)"
                subtitle="Consulte os pacientes da plataforma"
                textLeft="Filtros"
                textRight="Adicionar paciente"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newUserDisposer.open}
                typeButtonLeft="filter"
                typeButtonRight="add"
            />
            <Table.Root tableHeight={String(rowsNumber)}>
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={false}>PRONTUÁRIO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                </Table.Header>

                {data.map((item: Patients, index: number) => (
                    <Table.Row 
                        key={index}
                        onView={()=> router.push(`/patients/edit/${item.prontuario}`)}
                        onDelete={()=> console.log('delete')} 
                    >
                        <Table.CellBody><p className="font-medium dark:text-white"></p>{item.prontuario}</Table.CellBody>
                        <Table.CellBody><p className="font-medium dark:text-white">{item.nome}</p></Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.email}</p></Table.CellBody>
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
