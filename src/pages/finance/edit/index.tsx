import Header from "@/components/Header";
import Table from "@/components/Table/oldIndex";
import Modal from "@/components/modal";
import { useDisclosure } from "@/hook/useDisclosure";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Input } from "rsuite";

export default function Finance(): JSX.Element {
    const newUserDisposer = useDisclosure();
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
            <Table 
                endPoint="api/users"
                colunm={
                    [
                        {
                            property: 'name',
                            label: 'Nome',
                        },
                        {
                            property: 'email',
                            label: 'E-mail',
                        },
                        {
                            property: 'ru',
                            label: 'Resgistro Úniversitário',
                        },
                        {
                            property: 'cro',
                            label: 'CRO',
                        },
                        {
                            property: 'active',
                            label: 'Status',
                            type: 'status',
                        },
                        {
                            property: 'actions',
                            label: 'Ações',
                            type: 'actions',
                            optionsActions: ['view'],
                        }
                    ]
                }
            />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();
