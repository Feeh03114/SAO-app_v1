import Header from "@/components/Header/multipleButtons";
import TermsPrivacyForm from "@/components/pages/terms-privacy";
import api from "@/service/api";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import { TermPrivacy } from "..";

export default function TermsPrivacyAdd() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit() {
        const form = document.getElementById('formTermPrivacy');
        form?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }

    const onSave = async (data:TermPrivacy) => {
        setIsLoading(true);
        try {
            const resp = await api.post(`/api/profiles`, data);
            console.log(resp.data);
            toast.success('Termo cadastrado com sucesso!');
            router.back();
        } catch (error) {
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }
    return(
        <>
               <Header.Root 
                title={"Criar termo de confiabilidade"}
                subtitle={"Adicione um termo de confiabilidade na plataforma"}
            >
                <Header.Button 
                    text="Voltar"
                    disabled={isLoading}
                    onClick={()=> router.back()}
                />
                <Header.Button 
                    text="Salvar informações"
                    typeButton="confirm"
                    textStyle="text-white"
                    style="mr-0 bg-teal-400 dark:bg-teal-500"
                    disabled={isLoading}
                    onClick={handleSubmit}
                />
            </Header.Root>
            <TermsPrivacyForm onSave={onSave}/>
        </>
    )
}