import Header from "@/components/Header";
import { Pagination } from "@/components/Table/Pagination";
import Table from "@/components/Table/index";
import Card from "@/components/elementTag/cardText";
import Modal from "@/components/modal";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Input } from "rsuite";

const rowsNumber = 5;

interface Profile {
    id: string;
    name: string;
    permissions: [
        {
            page: {
                    namePage: string;
            }
        }
    ]
}

export default function Profiles(): JSX.Element {
    const newDisposer = useDisclosure();
    const [data, setData] = useState<Profile[]>([]);
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

    const loadData = async () => {
        setIsLoading(true);
        try {
            const { data:RespAPI } = await api.get("api/profiles", {
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
            <Modal.Root
                isOpen={newDisposer.isOpen}
                onClose={newDisposer.close}
                width="md:max-w-lg"
            >
                <Modal.Header title="Novo Usuário" icon={BsFillPersonPlusFill} />
                <Modal.Body>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Teste</label>
                        <Input 
                            id="prontuario"
                            type="text"
                            className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                            placeholder="Insira seu prontuário"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer/>
            </Modal.Root>
            <Header 
                title="Perfis"
                subtitle="Consulte os perfis da plataforma"
                textLeft="Filtros"
                textRight="Adicionar Perfil"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newDisposer.open}
                typeButtonLeft="filter"
                typeButtonRight="add"
            />
            <Table.Root tableHeight={String(rowsNumber)}>
                {data.map((item: Profile, index: number) => (
                    <Table.Row key={index} style={"w-1/6"}>
                        <Table.CellBody style={"w-1/6"}><p className="font-medium dark:text-white">{item.name}</p></Table.CellBody>
                        <Table.CellBody style={"w-4/6"}>
                            <div className="py-1 flex flex-row flex-wrap">
                                {item.permissions.map((item: any, index: number) => (
                                    <Card.TextSelected key={index} text={item.page.namePage}></Card.TextSelected>
                                ))}
                            </div>
                        </Table.CellBody>
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
