
import Header from "@/components/Header/multipleButtons";
import FormPatientRecord from "@/components/pages/schedule/formPatientRecord";
import { StatusType } from "@/enum/status_type.enum";
import { useDisclosure } from "@/hook/useDisclosure";
import api from "@/service/api";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export interface PatientRecord {
    id: string;
    medicaRecord: string;
    name: string;
    discipline: string;
    email: string;
    phoneNumber: string;
    date: string;
    time: string;
    service: string;
    price: string;
    complaint_text: string;
    occurrenceConsultation: string;
    status: string;
    serviceForwardedId: string;
}

export default function DentalChart(): JSX.Element {
    const router = useRouter();
    const {id} = router.query;
    const permiteEdit = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [patientRecord, setPatientRecord] = useState<PatientRecord>({} as PatientRecord);
    const [initConsult, setInitConsult] = useState<Date|null>(null);

    const loadingConsult = async () => {
        try {
            const resp = await api.get(`api/treatment/consult/${id}`);
            const patient = {} as PatientRecord;
            patient.id = resp.data.id;
            patient.medicaRecord = resp.data.treatment.patient.medicalRecord;
            patient.name = resp.data.treatment.patient.people.name;
            patient.discipline = 'Clínica Geral'//resp.data.service.discipline;
            patient.email = resp.data.treatment.patient.people.email;
            patient.phoneNumber = resp.data.treatment.patient.people.phoneNumber;
            patient.date = dayjs(resp.data.treatment.dateScheduled).format('DD/MM/YYYY');
            patient.time = dayjs(resp.data.treatment.dateScheduled).format('HH:mm');
            patient.service = resp.data.service.name;
            patient.price = resp.data.service.price;
            patient.complaint_text = resp.data.complaint_text;
            patient.occurrenceConsultation = resp.data.occurrenceConsultation;
            patient.status = resp.data.status;
            patient.serviceForwardedId = resp.data.serviceForwardedId;
            setPatientRecord(patient);
        } catch (error:any) {
            if(error?.response?.data?.messagem)
                toast.error(error.response.data.messagem);
            else
                toast.error('Erro ao carregar a ficha do paciente!');	
        }
    }

    useEffect(() => {
        if(id) loadingConsult();
    }, [id]);

    function handleEdit() {
        if(!permiteEdit.isOpen){
            permiteEdit.open();
            setInitConsult(new Date());
        }else{
            const form = document.getElementById('formPatientRecord');
            form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    }
    
    const onSave = async (data:any) => {
        setIsLoading(true);
        try {
            const body = {
                status: StatusType.concluded,
                dateConsultationStarted: initConsult,
                dateConsultationFinished: new Date(),
                occurrenceConsultation: data.occurrenceConsultation,
                serviceForwardedId: data?.serviceForwardedId,
            }
            // const resp = await api.put(`/api/patientRecords/${id}`, data);
            // console.log(resp);
            
            console.log(body);
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
                title={patientRecord.name}
                subtitle={"Prontuário: " + patientRecord.medicaRecord}
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
                    style="bg-teal-400 dark:bg-teal-500 hidden"
                    textStyle="text-white"
                    disabled={isLoading}
                    onClick={() => console.log('Historico')}
                />
                 <Header.Button 
                    text={permiteEdit.isOpen? "Finalizar Consulta": "Iniciar Consulta"}
                    typeButton="edit"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    textStyle="text-white"
                    disabled={isLoading || patientRecord.status !== StatusType.on_hold}
                    hidden={patientRecord.status !== StatusType.on_hold}
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