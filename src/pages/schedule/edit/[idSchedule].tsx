
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
    complaintText: string;
    descriptionConsult: string;
}

export default function DentalChart(): JSX.Element {
    const { id } = router.query;
    const permiteEdit = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [patientRecord, setPatientRecord] = useState<PatientRecord>({} as PatientRecord);

    
    const onSave = async (data:any) => {
        setIsLoading(true);
        try {
            // const resp = await api.put(`/api/patientRecords/${id}`, data);
            // console.log(resp);
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
                    disabled={isLoading}
                    onClick={()=> console.log('Voltar')}
                />
                 <Header.Button 
                    text="Histórico"
                    typeButton="clock"
                    style="bg-teal-400 dark:bg-teal-500"
                    textStyle="text-white"
                    disabled={isLoading}
                    onClick={()=> console.log('Historico')}
                />
                 <Header.Button 
                    text="Finalizar Consulta"
                    typeButton="edit"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    textStyle="text-white"
                    disabled={isLoading}
                    onClick={()=> console.log('Finalizar consulta')}
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