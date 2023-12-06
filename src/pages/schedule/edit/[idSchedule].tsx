
import Header from "@/components/Header/multipleButtons";
import FormPatientRecord from "@/components/pages/schedule/formPatientRecord";
import { useDisclosure } from "@/hook/useDisclosure";
import router from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const mock = { 
    id: 1, 
    name: "Nome Exemplo",
    email: "exemple@email.com",
    phone: "(11) 99999-9999",
    date: "2021-10-10",
    time: "10:00",
    discipline: "Geral",
    service: "Limpeza",
    price: "R$ 100,00",
    complaintText: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    descriptionConsult: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    status: "Finalizado",
    forwarding: "Selecione o encaminhamento",
    consultationReport: "Dentes amarelados e sensíveis"
}

export interface PatientRecord {
    id: string;
    name: string;
    discipline: string;
    email: string;
    phoneNumber: string;
    date: string;
    time: string;
    service: string;
    price: string;
}

export interface Treatment {
    patient_id: "string",
    complaint_text: "string",
    treatment_id: "string",
    service_id: "string",
    dateScheduled: "2023-12-05T18:56:15.633Z"
}

export default function DentalChart(): JSX.Element {
    const { id } = router.query;
    const permiteEdit = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [patientRecord, setPatientRecord] = useState<PatientRecord>({} as PatientRecord);

    function handleEdit() {
        console.log("Teste");
        if(!permiteEdit.isOpen)
            permiteEdit.open();
        else{
            const form = document.getElementById('formPatientRecord');
            form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }
    
    const onSave = async (data:Treatment) => {
        setIsLoading(true);
        try {
            // const resp = await api.put(`/api/patientRecords/${id}`, data);
            // console.log(resp);
            console.log(data);
            toast.success('Ficha do paciente atualizada com sucesso!');
            router.back();
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    return (
        <>
             <Header.Root 
                title={mock.name}
                subtitle={"Prontuário: " + mock.id}
            >
                <Header.Button 
                    text="Voltar"
                    style="hidden md:block"
                    disabled={isLoading}
                    onClick={() => router.back()}
                />
                <Header.Button 
                    text="Voltar"
                    typeButton="return"
                    style="md:hidden"
                    disabled={isLoading}
                    onClick={() => router.back()}
                />
                 <Header.Button 
                    text="Histórico"
                    typeButton="clock"
                    style="bg-teal-400 dark:bg-teal-500"
                    textStyle="text-white"
                    disabled={isLoading}
                    onClick={() => console.log('Historico')}
                />
                 <Header.Button 
                    text="Finalizar Consulta"
                    typeButton="edit"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    textStyle="text-white"
                    disabled={isLoading}
                    onClick={handleEdit}
                />
            </Header.Root>
            <FormPatientRecord
                isPermissionWrite={permiteEdit.isOpen}	
                edit={patientRecord}
                onSave={onSave}
            />  
        </>
    )
}