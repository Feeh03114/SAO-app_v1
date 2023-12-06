import Header from "@/components/Header";
import FormPatient from "@/components/pages/patient/formPatient";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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

        const form = document.getElementById('form');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
    
    const loadData = async () => {
        try {
            const { data: RespAPI } = await api.get(`api/patients/${id}`);
            console.log(RespAPI);
            const patient: Patients = {...RespAPI.people} as Patients;
            patient.medicalRecord = RespAPI.medicalRecord||"";
            patient.guardian = RespAPI.guardian||[];

            setData(patient);
        } catch (error) {
          console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);


    return (
        <>
            <Header 
                title={"Visualização do Paciente"}
                subtitle={"Acompanhe o paciente na plataforma"}
                textLeft="Voltar"
                textRight={newDisposer.isOpen ? "Salvar" : "Editar"}
                onClickLeft={()=> router.back()}
                onClickRight={handleEdit}
                typeButtonRight={newDisposer.isOpen ? "add" : "edit"}
            />

            <FormPatient edit={data} onSave={(e)=>console.log(e)} isPermissionWrite={newDisposer.isOpen}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();