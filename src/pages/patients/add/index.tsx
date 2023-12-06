
import Header from "@/components/Header";
import FormPatient from "@/components/pages/patient/formPatient";
import api from "@/service/api";
import { withSSRAuth } from "@/util/withSSRAuth";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
  
export interface Patient {
    guardian: string[];
    medicaRecord: string;
    stats: string;
    people: People;
    educationLevel: string;
}

export interface People {
    birthDate: string;
    name: string;
    lastName: string;
    cpf: string;
    rg: string;
    genre: string;
    ethnicity: string;
    email: string;
    phoneNumber: string;
    profession: string;
    nationality: string;
    naturalness: string;
    adress: string[];
}

export default function PatientAdd(): JSX.Element {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    function handleEdit() {
        const form = document.getElementById('formPatient');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }

    const onSave = async (data:Patient) => {
        console.log(data);
        setIsLoading(true);
        try {
            const resp = await api.post(`/api/patients`, data);
            console.log(resp.data);
            toast.success('Paciente criado com sucesso!');
            router.back();
        } catch (error:any) {
            console.log(error.response.data);
            if(error?.response?.data?.message){
                toast.error(error.response.data.message);
            }
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <>
            <Header 
                title="Cadastrar Paciente"
                subtitle="Confira os dados do paciente"
                textLeft="Voltar"
                textRight="Salvar informações"
                onClickLeft={()=> router.back()}
                onClickRight={handleEdit}
                typeButtonRight="confirm"
                disabledLeft={isLoading}
                disabledRight={isLoading}
            />
            <FormPatient onSave={onSave}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth();