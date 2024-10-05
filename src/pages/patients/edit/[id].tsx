import Header from "@/components/Header/multipleButtons";
import FormPatient from "@/components/pages/patient/formPatient";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IPeople {
    name: string;
    lastName: string
    cpf: string
    rg: string
    birthDate: string
    gender: string
    ethnicity: string
    email: string
    profession: string
    phoneNumber: string
    nationality: string
    naturalness: string
    address: IAddress[],
}

interface IAddress{
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

interface Patients extends IPeople {
    medicalRecord: string;
    guardian: IPeople[],
}

export default function PatientsEdit(): JSX.Element {
    const newDisposer = useDisclosure();
    const router = useRouter();
    const id = router.query.id;
    const [data, setData] = useState<Patients>();

    function handleEdit() {
        if(!newDisposer.isOpen) return newDisposer.open();

        const form = document.getElementById('formPatient');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
    
    const loadData = async () => {
        try {
            const { data: RespAPI } = await api.get(`api/patients/${id}`);
            const patient: Patients = {...RespAPI.people} as Patients;
            patient.medicalRecord = RespAPI.medicalRecord||"";
            patient.guardian = RespAPI.guardian||[];

            setData(patient);
        } catch (error:any) {
            if(error?.response)
                toast.error(error.response.data.message);
            else 
                toast.error('Erro ao atualizar paciente');
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const onSubmit = async (data: any) => {
        try {
            await api.put(`api/patients/${id}`, data);
            toast.success('Paciente atualizado com sucesso');
            newDisposer.close();
        } catch (error: any) {
            console.log(error?.response.data);
            if(error?.response)
                toast.error(error.response.data.message);
            else 
                toast.error('Erro ao atualizar paciente');
        }
    }

    return (
        <>
            <Header.Root 
                title={"Visualização do Paciente"}
                subtitle={"Acompanhe o paciente na plataforma"}
            >
                <Header.Button 
                    text="Voltar"
                    onClick={() => router.back()}
                />
                <Header.Button 
                    text={newDisposer.isOpen ? "Salvar" : "Editar"}
                    typeButton={newDisposer.isOpen ? "add" : "edit"}
                    textStyle="text-white"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    onClick={handleEdit}
                />
            </Header.Root>

            <FormPatient edit={data} onSave={onSubmit} isPermissionWrite={newDisposer.isOpen}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();