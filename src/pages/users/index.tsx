import Header from "@/components/Header";
import Table from "@/components/Table";
import { TableFooter } from "@/components/Table/TableFooter";
import Modal from "@/components/modal";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Input } from "rsuite";

const TOTAL_ELEMENTS = 25;
const rowsNumber = 6;

export default function Users(): JSX.Element {
    // interface User {
    //     name: string;
    //     email: string;
    //     ru: string;
    // }
    
    const newUserDisposer = useDisclosure();
    const { push, pathname } = useRouter();
    // const [data, setData] = useState<User[]>([]);
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalElements, setTotalElements] = useState(TOTAL_ELEMENTS);
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
            const { data:RespAPI } = await api.get("api/users", {
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

    // const mock: User[] = [];

    // for (let index = 1; index <= TOTAL_ELEMENTS; index++) {
    //     mock.push({
    //         name: "Teste " + index.toString(),
    //         email: "exemple@email.com",
    //         ru: "123456789"
    //     });
    // }

    // const start = currentPage * rowsNumber - rowsNumber;
    // const newMock = mock.slice(start, start + rowsNumber);

    // const loadDataMock = async () => {
    //     setData(newMock);
    //     setCurrentPage(currentPage);
    //     setTotalElements(TOTAL_ELEMENTS);
    // }

    useEffect(() => {
        loadData();
        // loadDataMock();
    }, [currentPage]);

    return (
        <>
            <Modal.Root
                isOpen={newUserDisposer.isOpen}
                onClose={newUserDisposer.close}
            >
                <Modal.Header title="Novo Usuário" icon={BsFillPersonPlusFill} />
                <Modal.Body>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Prontuário do Paciente</label>
                        <Input 
                            id="prontuario"
                            type="text"
                            className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                            placeholder="Insira seu prontuário"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Nome</label>
                        <Input 
                            id="prontuario"
                            type="text"
                            className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                            placeholder="Insira o nome"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Registro Universitário</label>
                        <Input 
                            id="prontuario"
                            type="text"
                            className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                            placeholder="Insira o RU"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">E-mail</label>
                        <Input 
                            id="prontuario"
                            type="text"
                            className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                            placeholder="Insira o e-mail"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">CRO</label>
                        <Input 
                            id="prontuario"
                            type="text"
                            className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                            placeholder="Insira o CRO"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                    <div className="w-full">
                        <label className="pl-4 text-sm font-medium leading-tight text-gray-700 dark:text-white">Perfis</label>
                        <Input 
                            id="prontuario"
                            type="text"
                            className="w-full rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white shadow border border-gray-300 text-gray-900 placeholder-gray-500 dark:placeholder-white focus:border-teal-400 focus:outline-none focus:ring-teal-400 md:text-sm"
                            // {...register("prontuario")}
                            // error={errors.prontuario}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer/>
            </Modal.Root>
            <Header 
                title="Usuários"
                subtitle="Consulte os usuários da plataforma"
                isFilterVisibled
                textLeft="Filtros"
                textRight="Adicionar Usuário"
                onClickLeft={()=> console.log('filter')}
                onClickRight={newUserDisposer.open}
            />
            <Table.Root>
                <Table.Header>
                    <Table.CellHeader hiddenInMobile={false}>NOME</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>E-MAIL</Table.CellHeader>
                    <Table.CellHeader hiddenInMobile={true}>REGISTRO UNIVERSITÁRIO</Table.CellHeader>
                </Table.Header>

                {data.map((item: { name: string, email: string, ru: string }, index: number) => (
                    <Table.Row key={index}>
                        <Table.CellBody><p className="font-medium dark:text-white">{item.name}</p></Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}>{item.email}</Table.CellBody>
                        <Table.CellBody hiddenInMobile={true}>{item.ru}</Table.CellBody>
                    </Table.Row>
                ))}
            </Table.Root> 

            <TableFooter
                pageSize={rowsNumber}
                totalElements={totalElements}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();