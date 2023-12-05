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

export interface Patient {
    id: string;
    guardian: Guardian[];
    stats: string;
    people: People;
}

export interface Guardian {
    birthDate: string;
    name: string;
    lastName: string;
    cpf: string;
    rg: string;
    gender: string;
    ethnicity: string;
    email: string;
    phoneNumber: string;
    profession: string;
    nationality: string;
    naturalness: string;
    address: Address[];
}

export interface People {
    birthDate: string,
    name: string,
    lastName: string,
    cpf: string,
    rg: string,
    gender: string,
    ethnicity: string,
    email: string,
    phoneNumber: string,
    profession: string,
    nationality: string,
    naturalness: string,
    address: Address[],
    educationLevel: string,
}

export interface Address {
    id: string;
    name: string;
    cep: string;
    streetAddress: string;
    number: string;
    complement: string;
    district: string;
    city: string;
    state: string;
}

export default function Patients(): JSX.Element {
    const router = useRouter();
    const [data, setData] = useState<Patient[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(rowsNumber);
    const [isLoading, setIsLoading] = useState(false);
    const deleteDisposer = useDisclosure();
    const [idDelete, setIdDelete] = useState<string>("");

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
            const { data:RespAPI } = await api.get("api/patients", {
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

    function deleteItem(id: string) {
        setIdDelete(id);
        deleteDisposer.open();
    }

    const onDelete = async (id: string) => {
        try {
            const resp = await api.delete(`api/patients/${id}`);
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
                title="Pacientes"
                subtitle="Consulte os pacientes da plataforma"
                textLeft="Filtros"
                textRight="Adicionar paciente"
                onClickLeft={()=> console.log('filter')}
                onClickRight={()=> router.push('/patients/add')}
                typeButtonLeft="filter"
                typeButtonRight="add"
            />
            <Table.Root tableHeight={String(rowsNumber)}>
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={true}>PRONTUÁRIO</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                </Table.Header>

                {data.map((item: Patient, index: number) => (
                    <Table.Row 
                        key={index}
                        onView={()=> router.push(`/patients/edit/${item.people.name}`)}
                        onDelete={() => deleteItem(item.id)}
                    >
                        <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white"></p>{item.people.name}</Table.CellBody>
                        <Table.CellBody hiddenInMobile={false}><p className="font-medium dark:text-white">{item.people.name}</p></Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}><p className="font-medium dark:text-white">{item.people.email}</p></Table.CellBody>
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
